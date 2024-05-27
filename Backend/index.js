const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Blog = require('./models/blogpost');
const ContactUs = require('./models/contact');
const Productstore = require('./models/productstore');
const User = require('./models/user');
const Razorpay = require("razorpay");
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

const app = express();
const PORT = 4000;

const specs = swaggerOptions;

const razorpay = new Razorpay({
  key_id: "rzp_test_UPsGxPIGbJpyfG",
  key_secret: "JNIwWpMBAPyspzGBF2CokEUY",
});

mongoose.connect('mongodb://localhost:27017/croplite', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("DB connected");
})
.catch((error) => {
  console.error("Error connecting to DB:", error);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *         author:
 *           type: string
 *           description: The author of the blog post
 *         image:
 *           type: string
 *           description: The image URL of the blog post
 *         likes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *     ContactUs:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the person contacting
 *         email:
 *           type: string
 *           description: The email of the person contacting
 *         message:
 *           type: string
 *           description: The message from the person contacting
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retrieves a list of blog posts
 *     responses:
 *       200:
 *         description: A list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Server error
 */
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Blog.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Username or Email is already registered
 *       500:
 *         description: Internal server error
 */
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).send('Username or Email is already registered');
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(401).send('Invalid email');
    }

    if (password != user.password) {
      return res.status(401).send('Invalid password');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /api/getkey:
 *   get:
 *     summary: Retrieve the Razorpay key
 *     responses:
 *       200:
 *         description: Successfully retrieved the Razorpay key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 */
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: "rzp_test_UPsGxPIGbJpyfG" })
);

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Create a new Razorpay order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount for the order
 *     responses:
 *       200:
 *         description: Successfully created a new order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 order:
 *                   type: object
 */
app.post("/api/checkout", async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

/**
 * @swagger
 * /api/paymentverification:
 *   post:
 *     summary: Verify a Razorpay payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully verified the payment
 */
app.post("/api/paymentverification", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  res.redirect(
    `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Bad request
 */
app.post('/api/posts', async (req, res) => {
  const { title, content, author, image } = req.body;
  const newPost = new Blog({ title, content, author, image });
  try {
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Like a blog post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to like
 *     responses:
 *       200:
 *         description: Blog post liked successfully
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
app.post('/api/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    blogPost.likes.push({ user: 'SomeUser' });

    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error liking blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/posts/{postId}/dislike:
 *   post:
 *     summary: Dislike a blog post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to dislike
 *     responses:
 *       200:
 *         description: Blog post disliked successfully
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
app.post('/api/posts/:postId/dislike', async (req, res) => {
  const { postId } = req.params;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const userToRemove = 'SomeUser';
    const indexOfUserLike = blogPost.likes.findIndex(like => like.user === userToRemove);

    if (indexOfUserLike !== -1) {
      blogPost.likes.splice(indexOfUserLike, 1);
    }

    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error disliking blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Add a comment to a blog post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
app.post('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { content, author } = req.body;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const newComment = {
      content,
      author,
      date: new Date(),
    };

    blogPost.comments.push(newComment);

    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error adding comment to blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment from a blog post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Blog post or comment not found
 *       500:
 *         description: Internal server error
 */
app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const commentIndex = blogPost.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    blogPost.comments.splice(commentIndex, 1);

    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /submit:
 *   post:
 *     summary: Submit contact us form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Data saved successfully
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
app.get('/products', async (req, res) => {
  try {
    const products = await Productstore.find();
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
