import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Job from '@/models/JobRequest'; //Use Alias

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
};

// View job details (GET)
export async function GET(request, { params }) {
  await connectDB();
  const job = await Job.findById(params.id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

// Update job details (PATCH)
export async function PATCH(request, { params }) {
  await connectDB();
  const data = await request.json();
  const updatedJob = await Job.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedJob);
}

// Delete a job (DELETE)
export async function DELETE(request, { params }) {
  await connectDB();
  await Job.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Job deleted' });
}