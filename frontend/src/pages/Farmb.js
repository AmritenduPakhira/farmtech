import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentModal from './CommentModal';
import { FiHeart, FiCommand, FiTrash } from 'react-icons/fi';
import {FaComment} from 'react-icons/fa'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);


const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State for modal visibility
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
    tl.from("section > div > div", { opacity: 0, y: 50, stagger: 0.2, duration: 1 });
  
    fetchBlogPosts();
  }, []);

  
  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('https://farmtechbackend-4je9drnvw-amritendupakhiras-projects.vercel.app/api/posts');
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching updated blog posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`https://farmtechbackend-4je9drnvw-amritendupakhiras-projects.vercel.app/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'SomeUser' }),
      });

      if (response.ok) {
        console.log(`Liked the blog post ${postId} successfully`);
        fetchBlogPosts();
      } else {
        console.error(`Failed to like the blog post ${postId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error liking the blog post ${postId}:`, error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await fetch(`https://farmtechbackend-4je9drnvw-amritendupakhiras-projects.vercel.app/api/posts/${postId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'SomeUser' }),
      });

      if (response.ok) {
        console.log(`Disliked the blog post ${postId} successfully`);
        fetchBlogPosts();
      } else {
        console.error(`Failed to dislike the blog post ${postId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error disliking the blog post ${postId}:`, error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`https://farmtechbackend-4je9drnvw-amritendupakhiras-projects.vercel.app/api/posts/${currentPostId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentInput, author: 'SomeUser' }),
      });

      if (response.ok) {
        console.log(`Comment added to the blog post ${currentPostId} successfully`);
        fetchBlogPosts();
        setCommentInput('');
      } else {
        console.error(`Failed to add comment to the blog post ${currentPostId}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error adding comment to the blog post ${currentPostId}:`, error);
    }
  };

  const handleCommentDelete = async (postId, commentId) => {
    try {
      const response = await fetch(`https://farmtechbackend-4je9drnvw-amritendupakhiras-projects.vercel.app/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Comment deleted successfully`);
        fetchBlogPosts();
      } else {
        console.error(`Failed to delete comment:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting comment:`, error);
    }
  };

  const openCommentModal = (postId) => {
    setCurrentPostId(postId);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-500">Latest Blog Posts</h2>
          <Link to="/postblog" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-300">Create New Blog</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={post.image} alt="Blog Post" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{new Date(post.date).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center">
                  <button className="text-gray-600 mr-4 flex items-center" onClick={() => handleLike(post._id)}>
                    <FiHeart className='text-blue-600'/>
                    {post.likes.length}
                  </button>
                  <button className="text-gray-600 mr-4" onClick={() => handleDislike(post._id)}>
                    <FiHeart className='text-red-600'/>
                  </button>
                  <button className="text-gray-600 mr-4" onClick={() => openCommentModal(post._id)}>
                    <FaComment/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal}>
  <div>
    {currentPostId && blogPosts.map(post => {
      if (post._id === currentPostId) {
        return (
          <div key={post._id}>
            {post.comments && post.comments.length > 0 && (
              <div className="mt-3 max-h-64 overflow-y-auto">
                <h5 className="text-lg font-semibold mb-2">Comments:</h5>
                {post.comments.map(comment => (
                  <div key={comment._id} className="bg-gray-100 rounded-lg p-4 mb-2">
                    <div className='flex items-center justify-between'>
                    <p className="text-gray-800">{comment.content}</p>
                    <button className="text-red-600 hover:text-red-700" onClick={() => handleCommentDelete(post._id, comment._id)}>
                      <FiTrash className="inline-block mr-1" />
                    </button>
                    </div>
                    <p className="text-sm text-gray-600">Author: {comment.author}, Date: {new Date(comment.date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-xl font-semibold mt-4 mb-2">Add a Comment</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(); }}>
              <textarea
                placeholder="Write a comment"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button type="submit" className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">Submit</button>
            </form>
          </div>
        );
      }
      return null;
    })}
  </div>
</CommentModal>



      </div>
    </section>
  );
};

export default BlogPosts;
