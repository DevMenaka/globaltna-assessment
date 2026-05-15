import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Job from '../../models/Job'; 

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
};

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const filter = category ? { category } : {};
  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(jobs);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const newJob = await Job.create(data);
  return NextResponse.json(newJob, { status: 201 });
}