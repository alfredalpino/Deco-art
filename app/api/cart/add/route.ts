import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const validatedData = addToCartSchema.parse(body);

    // Get or create session ID for guest users
    let sessionId = null;
    if (!session) {
      const cookieStore = await cookies();
      let guestSessionId = cookieStore.get("guest_session_id")?.value;
      if (!guestSessionId) {
        guestSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        cookieStore.set("guest_session_id", guestSessionId, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: true,
          sameSite: "lax",
        });
      }
      sessionId = guestSessionId;
    }

    // Verify product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < validatedData.quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: session
        ? { userId: (session.user as any).id }
        : { sessionId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session ? (session.user as any).id : undefined,
          sessionId: session ? undefined : sessionId,
        },
        include: { items: true },
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find((item) => item.productId === validatedData.productId);

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + validatedData.quantity },
      });
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: validatedData.productId,
          quantity: validatedData.quantity,
        },
      });
    }

    return NextResponse.json({ message: "Item added to cart successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Validation error" }, { status: 400 });
    }

    console.error("Add to cart error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
