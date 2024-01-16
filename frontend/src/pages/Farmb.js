import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    // Refetch data from the API after liking a post
    fetch('http://localhost:5000/api/posts')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching updated blog posts:', error));
  }, [blogPosts]); // Run the effect when the blogPosts state changes

  const handleLike = async (postId) => {
    try {
      // Send POST request to localhost:5000/api/posts/like
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can send additional data in the body if needed
        body: JSON.stringify({ user: 'SomeUser' }),
      });

      if (response.ok) {
        console.log(`Liked the blog post ${postId} successfully`);
        // Optionally, you can update the UI or perform other actions upon successful liking
      } else {
        console.error(`Failed to like the blog post ${postId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error liking the blog post ${postId}:`, error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify({ user: 'SomeUser' }),
      });

      if (response.ok) {
        console.log(`Disliked the blog post ${postId} successfully`);
           } else {
        console.error(`Failed to dislike the blog post ${postId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error disliking the blog post ${postId}:`, error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
     
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentInput, author: 'SomeUser' }), 
      });

      if (response.ok) {
        console.log(`Comment added to the blog post ${postId} successfully`);
        setCommentInput(''); 
      } else {
        console.error(`Failed to add comment to the blog post ${postId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error adding comment to the blog post ${postId}:`, error);
    }
  };

  const handleCommentDelete = async (postId, commentId) => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Comment deleted successfully`);
       
      } else {
        console.error(`Failed to delete comment:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting comment:`, error);
    }
  };

  return (
    <Container className="mt-5">
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 style={{ color: '#43e97b' }}>Blog Posts</h2>
        <Link className='btn btn-success' to="/postblog">Create new Blog</Link>
      </div>

      <div className="d-flex flex-wrap justify-content-between">
        {blogPosts.map(post => (
          <Card key={post._id} className="mb-3" style={{ width: '30%', background: 'linear-gradient(to bottom, #43e97b, #38f9d7)' }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              <Card.Text>Likes: {post.likes.length}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">Author: {post.author}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Date: {new Date(post.date).toLocaleString()}</Card.Subtitle>
              <Button variant="primary" onClick={() => handleLike(post._id)} style={{ marginRight: '170px', marginBottom: '10px' }}>
                Like
              </Button>
              <Button variant="primary" onClick={() => handleDislike(post._id)} className="ml-3" style={{ marginBottom: '10px' }}>
                Dislike
              </Button>

              {/* Comment Form */}
              <Form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(post._id); }}>
                <Form.Group controlId={`commentInput-${post._id}`}>
                  <Form.Control
                    type="text"
                    placeholder="Write a comment"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                  Add Comment
                </Button>
              </Form>

              {/* Display Comments */}
              {post.comments && post.comments.length > 0 && (
                <div className="mt-3">
                  <h5>Comments:</h5>
                  {post.comments.map(comment => (
                    <div key={comment._id} className="mb-2">
                      <p>{comment.content}</p>
                      <p className="text-muted">Author: {comment.author}, Date: {new Date(comment.date).toLocaleString()}</p>
                      <Button variant="danger" onClick={() => handleCommentDelete(post._id, comment._id)}>
                        Delete Comment
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default BlogPosts;
