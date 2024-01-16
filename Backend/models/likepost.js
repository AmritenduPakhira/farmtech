const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
