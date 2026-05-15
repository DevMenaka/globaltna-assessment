import mongoose from 'mongoose';

const JobRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Open', 'In Progress', 'Closed'], 
    default: 'Open' 
  },
}, { timestamps: true });

// Prevent model overwrite during hot reloads in Next.js
export default mongoose.models.JobRequest || mongoose.model('JobRequest', JobRequestSchema);