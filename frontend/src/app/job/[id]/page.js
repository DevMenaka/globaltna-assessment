"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function JobDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);


  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
  try {
    // Insert Correct API URL
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      // Page Refresh After Update
      window.location.reload(); 
    } else {
      alert("Failed to update status.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this request?")) return;

  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Job deleted successfully!");
      router.push("/"); // Return To Dshboard After Delete
    } else {
      alert("Failed to delete job.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  if (loading) return <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>;
  if (!job) return <div className="min-h-screen flex justify-center items-center text-white">Job not found.</div>;

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto">
      <Link href="/" className="text-gray-400 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Dashboard
      </Link>

      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <span className="text-sm text-gray-400 block mb-2">{job.category} • 📍 {job.location}</span>
            <h1 className="text-3xl font-bold text-white">{job.title}</h1>
          </div>
          
          <select 
            value={job.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-4 py-2 rounded-lg font-medium focus:outline-none appearance-none cursor-pointer ${
              job.status === 'Open' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
              job.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
              'bg-gray-500/20 text-gray-300 border border-gray-500/30'
            }`}
          >
            <option value="Open" className="bg-gray-900">Open</option>
            <option value="In Progress" className="bg-gray-900">In Progress</option>
            <option value="Closed" className="bg-gray-900">Closed</option>
          </select>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-300 mb-2">Description</h3>
          <p className="text-gray-400 whitespace-pre-wrap leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pt-6 border-t border-white/10">
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Contact Name</h4>
            <p className="text-gray-300">{job.contactName || "N/A"}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Contact Email</h4>
            <p className="text-gray-300">{job.contactEmail}</p>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-white/10">
          <button 
            onClick={handleDelete}
            className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-6 py-2 rounded-lg transition-colors border border-red-500/30 font-medium"
          >
            Delete Request
          </button>
        </div>
      </div>
    </main>
  );
}