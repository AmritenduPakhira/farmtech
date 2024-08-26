import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogPostForm = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
  });

  const navigate = useNavigate();

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
      const response = await axios.post('https://farmtech-nine.vercel.app/api/posts', blogData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Blog posted successfully');
        navigate('/blogging')
      } else {
        console.error('Failed to post blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <section className="p-6 w-screen items-center justify-center bg-gray-100 text-gray-900" style={{ height: '80vh' }}>
      <form onSubmit={handleSubmit} noValidate className="container mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">Write Your Blog Post</h2>
          <p className="text-sm text-gray-600">Share your thoughts and experiences with the world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter a catchy title"
              className="w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-opacity-75 focus:ring-yellow-600 focus:border-yellow-600"
              name="title"
              value={blogData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
            <input
              id="author"
              type="text"
              placeholder="Your name or pen name"
              className="w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-opacity-75 focus:ring-yellow-600 focus:border-yellow-600"
              name="author"
              value={blogData.author}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Link</label>
          <input
            id="image"
            type="text"
            placeholder="Enter an image URL"
            className="w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-opacity-75 focus:ring-yellow-600 focus:border-yellow-600"
            name="image"
            value={blogData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            placeholder="Start typing your blog post here..."
            className="w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-opacity-75 focus:ring-yellow-600 focus:border-yellow-600 h-48 resize-none"
            name="content"
            value={blogData.content}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="inline-block bg-blue-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 transition duration-300">Publish</button>
        </div>
      </form>
    </section>
  );
};

export default BlogPostForm;
