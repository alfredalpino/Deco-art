"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean;
}

export default function AddToCartButton({ productId, disabled }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to add to cart");
        return;
      }

      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddToCart}
        disabled={disabled || loading}
        className="btn-modern w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : disabled ? (
          "Out of Stock"
        ) : (
          "Add to Cart"
        )}
      </button>
      {message && (
        <div className={`p-4 rounded border ${
          message.includes("Added") 
            ? "bg-gray-50 border-gray-200 text-gray-900" 
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          <p className="text-sm">{message}</p>
        </div>
      )}
    </div>
  );
}
