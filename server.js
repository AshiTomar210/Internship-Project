const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Submission = require('./models/Submission');

const app = express();

// MongoDB optional connection
let dbConnected = false;
mongoose.connect('mongodb://localhost:27017/internshipDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  dbConnected = true;
}).catch(err => {
  console.log("⚠️ MongoDB not connected. Running in fallback mode.");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
  let submissions = [];
  if (dbConnected) {
    try {
      submissions = await Submission.find().sort({ submissionDate: -1 });
    } catch (err) {
      console.log("❌ Error fetching from DB:", err.message);
    }
  }
  res.render('index', { submissions });
});

app.get('/submit', (req, res) => {
  res.render('form', { saved: null });
});

app.post('/submit', async (req, res) => {
  const { name, email, taskLevel, taskName, description } = req.body;

  // Basic backend validation
  if (!name || !email || !taskLevel || !taskName || !description) {
    return res.render('form', { saved: false, error: 'All fields are required!' });
  }

  let saved = false;
  try {
    await Submission.create({ name, email, taskLevel, taskName, description });
    saved = true;
  } catch (err) {
    console.log("❌ Error saving to DB:", err.message);
  }

  res.render('form', { saved, error: null });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
