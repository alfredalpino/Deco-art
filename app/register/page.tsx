"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login?registered=true");
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm sm:text-base text-[#2c2c2c]/70">
            Or{" "}
            <Link href="/login" className="font-medium text-[#d4af37] hover:text-[#b8941e] active:text-[#b8941e] transition-colors">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
              {error}
            </div>
          )}
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base font-medium text-[#0a0a0a] mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] touch-manipulation"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-[#0a0a0a] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] touch-manipulation"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-[#0a0a0a] mb-1.5">
                Phone (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] touch-manipulation"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-[#0a0a0a] mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] touch-manipulation"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-[#0a0a0a] mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] placeholder-[#2c2c2c]/50 text-[#0a0a0a] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] touch-manipulation"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 sm:py-3.5 px-4 border border-transparent text-base sm:text-sm font-medium rounded-lg text-[#0a0a0a] bg-[#d4af37] hover:bg-[#b8941e] active:bg-[#b8941e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[52px] transition-all duration-300"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
