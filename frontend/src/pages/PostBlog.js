import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import farmPhoto3 from '../images/farmPhoto19.jpg';

const BlogPostForm = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    likes: [],
    comments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to localhost:5000/api/posts
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        console.log('Blog posted successfully');
        // Optionally, you can redirect or perform other actions upon successful submission
        // Redirect to the '/blogging' path
        window.location.href = '/blogging';
      } else {
        console.error('Failed to post blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Post a Blog</h2>
      <div className="d-flex justify-content-between">
        <div className="flex-fill mr-2" style={{ background: 'linear-gradient(to bottom, #4e54c8, #8f94fb)', padding: '20px', marginBottom: '20px' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                name="content"
                value={blogData.content}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                name="author"
                value={blogData.author}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="flex-fill ml-2" style={{ background: `url(${farmPhoto3})`, backgroundSize: 'cover', padding: '20px', marginBottom: '20px' }}>
  {/* Additional content for the second box */}
</div>


      </div>
    </div>
  );
};

export default BlogPostForm;
