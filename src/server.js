const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// Statické soubory pro frontend
app.use('/static', express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// API pro načítání příspěvků
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Chyba při získávání příspěvků');
  }
});

// Servírování HTML souboru
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
