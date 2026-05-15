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

// GET: Fetch all jobs or filter by category
export async function GET(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // If a category is provided, filter by it. Otherwise, fetch all.
    const filter = category ? { category } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST: Create a new service request
export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    // Create new job document in MongoDB
    const newJob = await Job.create(data);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 400 });
  }
}