"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");

 useEffect(() => {
  const fetchJobs = async () => {
    try {
      const endpoint = category ? `/api/jobs?category=${category}` : '/api/jobs';
      const res = await fetch(endpoint);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  fetchJobs();
}, [category]);

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Service Requests</h1>
          <p className="text-gray-400">Browse open requests or post a new job.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="glass-card px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-48 appearance-none"
          >
            <option value="" className="bg-gray-900">All Categories</option>
            <option value="Plumbing" className="bg-gray-900">Plumbing</option>
            <option value="Electrical" className="bg-gray-900">Electrical</option>
            <option value="Painting" className="bg-gray-900">Painting</option>
            <option value="Joinery" className="bg-gray-900">Joinery</option>
          </select>

          <Link href="/new" className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl transition-all font-medium whitespace-nowrap">
            + New Request
          </Link>
        </div>
      </div>

      {/* Bento Grid layout for Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-12">No service requests found.</p>
        ) : (
          jobs.map((job) => (
            <Link href={`/job/${job._id}`} key={job._id}>
              <div className="glass-card p-6 h-full hover:bg-white/5 transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      job.status === 'Open' ? 'bg-blue-500/20 text-blue-300' :
                      job.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-sm text-gray-400">{job.category}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">{job.title}</h2>
                  <p className="text-gray-400 text-sm line-clamp-2">{job.description}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">📍 {job.location}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}