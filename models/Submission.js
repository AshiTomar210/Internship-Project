const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  taskLevel: String,
  taskName: String,
  description: String,
  submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
