const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/webnews')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB:', err);
    });

const postSchema = new mongoose.Schema({
  title: String,
  categories: String,
  content: [String],
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema, 'idnes');

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    console.log('Načtené příspěvky:', posts);
    res.json(posts);
  } catch (error) {
    console.error('Chyba při získávání příspěvků:', error);
    res.status(500).send('Chyba při získávání příspěvků');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
