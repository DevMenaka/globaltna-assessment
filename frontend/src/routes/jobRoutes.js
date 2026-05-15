const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// 1. Create New Job (POST /api/jobs)
router.post('/', async (req, res) => {
  try {
    const newJob = new JobRequest(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2.  View All Jobs Filters (GET /api/jobs)
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (status) query.status = status;

    // sort by createdAt in descending order (newest first)
    const jobs = await JobRequest.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. View Job Details (GET /api/jobs/:id)
router.get('/:id', async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Change Status (PATCH /api/jobs/:id)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedJob = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. Delete Job (DELETE /api/jobs/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;