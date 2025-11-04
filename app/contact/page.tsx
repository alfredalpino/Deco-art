"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ContactPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send message");
        return;
      }

      setSuccess(true);
      setFormData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-black mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question? We'd love to hear from you.
        </p>
      </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 p-8 md:p-12">
        {success && (
              <div className="mb-8 p-4 bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-900">Thank you for your message. We'll get back to you soon.</p>
          </div>
        )}

        {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
            <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-3">
                    Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder:text-gray-400"
                    placeholder="John Doe"
              />
            </div>

                {/* Email */}
            <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-3">
                    Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder:text-gray-400"
                    placeholder="john@example.com"
              />
            </div>
          </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Phone */}
          <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-3">
                    Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder:text-gray-400"
                    placeholder="+91 XXXX XXXXXX"
            />
          </div>

                {/* Subject */}
          <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-black mb-3">
              Subject *
            </label>
                  <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors text-black"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="order">Order Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
          </div>

              {/* Message */}
          <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-3">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors text-black placeholder:text-gray-400 resize-none"
                  placeholder="Tell us how we can help you..."
            />
          </div>

              {/* Submit Button */}
              <div>
          <button
            type="submit"
            disabled={loading}
                  className="btn-modern disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
          </button>
              </div>
        </form>
      </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
        <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-normal mb-2 text-black">Location</h3>
              <p className="text-sm text-gray-600">Jagrani, Lucknow<br />Uttar Pradesh, India</p>
        </div>

        <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-normal mb-2 text-black">Phone</h3>
              <p className="text-sm text-gray-600">+91 XXXX XXXXXX</p>
        </div>

        <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-normal mb-2 text-black">Email</h3>
              <p className="text-sm text-gray-600">info@decoartfurniture.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
