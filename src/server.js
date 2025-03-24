const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/webnews', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Vytvoření schématu pro kolekci 'idnes'
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

// Použití kolekce 'idnes' ve vaší databázi
const Post = mongoose.model('Post', postSchema, 'idnes');

// API pro načítání příspěvků
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();  // Načte všechny příspěvky z kolekce 'idnes'
    res.json(posts);
  } catch (error) {
    res.status(500).send('Chyba při získávání příspěvků');
  }
});

// Servírování HTML souboru
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
