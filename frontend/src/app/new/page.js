"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("Failed to create request.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-3xl mx-auto">
      <Link href="/" className="text-gray-400 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8">Post a New Request</h1>

      <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
          <input
            type="text"
            required
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
            placeholder="e.g. Need a plumber for a leaking tap"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
          <textarea
            required
            rows="4"
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
            placeholder="Describe the issue in detail..."
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 appearance-none"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Joinery">Joinery</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
              placeholder="e.g. Colombo"
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name</label>
            <input
              type="text"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email *</label>
            <input
              type="email"
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
        >
          {loading ? "Posting..." : "Post Request"}
        </button>
      </form>
    </main>
  );
}