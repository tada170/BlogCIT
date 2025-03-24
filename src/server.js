const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Chyba při získávání příspěvků');
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send('Chyba při vytváření příspěvku');
  }
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
