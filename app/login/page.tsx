"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        type,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        if (type === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm sm:text-base text-[#2c2c2c]/70">
            Or{" "}
            <Link href="/register" className="font-medium text-[#d4af37] hover:text-[#b8941e] active:text-[#b8941e] transition-colors">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
              {error}
            </div>
          )}
          <div className="rounded-lg shadow-sm -space-y-px">
            <div>
              <label htmlFor="type" className="sr-only">
                Login Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as "user" | "admin")}
                className="appearance-none rounded-t-lg relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] focus:z-10 touch-manipulation"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {type === "admin" ? "Username" : "Email address"}
              </label>
              <input
                id="email"
                name="email"
                type={type === "admin" ? "text" : "email"}
                autoComplete={type === "admin" ? "username" : "email"}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] focus:z-10 touch-manipulation"
                placeholder={type === "admin" ? "Username" : "Email address"}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-lg relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] focus:z-10 touch-manipulation"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm sm:text-base">
              <Link href="/forgot-password" className="font-medium text-[#d4af37] hover:text-[#b8941e] active:text-[#b8941e] transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 sm:py-3.5 px-4 border border-transparent text-base sm:text-sm font-medium rounded-lg text-[#0a0a0a] bg-[#d4af37] hover:bg-[#b8941e] active:bg-[#b8941e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[52px] transition-all duration-300"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
