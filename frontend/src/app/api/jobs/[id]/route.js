import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Job from '@/models/JobRequest';

// Function to connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// GET: Fetch a single job by ID
export async function GET(request, { params }) {
  await connectDB();
  try {
    const job = await Job.findById(params.id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }
}

// PATCH: Update job status (e.g., Open to In Progress)
export async function PATCH(request, { params }) {
  await connectDB();
  try {
    const data = await request.json();
    const updatedJob = await Job.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// DELETE: Remove a job request from the database
export async function DELETE(request, { params }) {
  await connectDB();
  try {
    await Job.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}