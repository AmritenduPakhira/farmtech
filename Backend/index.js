const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const Blog = require('./models/blogpost');
const ContactUs = require('./models/contact');
const Productstore = require('./models/productstore')

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/post', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });


app.use(cors());
app.use(bodyParser.json());

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Blog.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Blog({ title, content, author });
  try {
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Add a like to the blog post
    blogPost.likes.push({ user: 'SomeUser' }); // You can replace 'SomeUser' with the actual user data

    // Save the updated blog post
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error liking blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/posts/:postId/dislike', async (req, res) => {
  const { postId } = req.params;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Remove the first occurrence of the like by the specified user
    const userToRemove = 'SomeUser'; // Replace with the actual user data
    const indexOfUserLike = blogPost.likes.findIndex(like => like.user === userToRemove);

    if (indexOfUserLike !== -1) {
      blogPost.likes.splice(indexOfUserLike, 1);
    }

    // Save the updated blog post
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error disliking blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { content, author } = req.body;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Add a new comment to the blog post
    const newComment = {
      content,
      author,
      date: new Date(),
    };

    blogPost.comments.push(newComment);

    // Save the updated blog post
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error adding comment to blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Find the index of the comment in the comments array
    const commentIndex = blogPost.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Remove the comment from the comments array
    blogPost.comments.splice(commentIndex, 1);

    // Save the updated blog post
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  const newContactUs = new ContactUs({
    name,
    email,
    message,
  });

  try {
    await newContactUs.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Productstore.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})