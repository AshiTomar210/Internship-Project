
const Submission = require('../models/Submission');

exports.index = async (req, res) => {
  const all = await Submission.find().sort({ submissionDate: -1 });
  res.render('index', { submissions: all });
};

exports.getForm = (req, res) => {
  res.render('form');
};

exports.postForm = async (req, res) => {
  const { name, email, taskLevel, taskName, description } = req.body;
  const newSubmission = new Submission({ name, email, taskLevel, taskName, description });
  await newSubmission.save();
  res.redirect('/');
};
