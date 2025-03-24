const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

// Připojení k MongoDB
mongoose.connect('mongodb://localhost:27017/webnews', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Schéma pro příspěvky
const postSchema = new mongoose.Schema({
  title: String,
  categories: String,  // Přidání kategorií, podle struktury vašeho dokumentu
  content: [String],   // Obsah jako pole řetězců
  date: { type: Date, default: Date.now },
});

// Model pro kolekci 'idnes'
const Post = mongoose.model('Post', postSchema, 'idnes');

// Endpoint pro získání všech příspěvků
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();  // Dotaz na kolekci 'idnes'
    console.log('Načtené příspěvky:', posts);  // Log pro ověření, že data jsou správně načítána
    res.json(posts);  // Odeslání dat jako JSON
  } catch (error) {
    console.error('Chyba při získávání příspěvků:', error);
    res.status(500).send('Chyba při získávání příspěvků');
  }
});

// Hlavní stránka, která obsahuje index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
