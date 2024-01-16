const mongoose = require('mongoose');

const deleteSchema = new mongoose.Schema({
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
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const DeletedBlog = mongoose.model('DeletedBlog', deleteSchema);

module.exports = DeletedBlog;
