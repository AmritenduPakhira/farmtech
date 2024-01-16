const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  }
});

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [likeSchema],  // Array of like subdocuments
  comments: [commentSchema]  // Array of comment subdocuments
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
