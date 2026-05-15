const mongoose = require('mongoose');

const JobRequestSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  category: { 
    type: String 
  },
  location: { 
    type: String 
  },
  contactName: { 
    type: String 
  },
  contactEmail: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  }
}, { timestamps: true }); // This will add 'createdAt' and 'updatedAt' automatically

module.exports = mongoose.model('JobRequest', JobRequestSchema);