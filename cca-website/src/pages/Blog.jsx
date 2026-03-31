import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRegClock, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('cca_blog_posts')) || [];
    setPosts(savedPosts.reverse()); // Show newest first
  }, []);

  return (
    <div className="blog-page" style={{ paddingTop: '120px', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span className="sub-head" style={{ color: 'var(--cca-red)' }}>INSIGHTS & INNOVATION</span>
          <h1 className="title-large">The CCA Engineering Blog</h1>
          <p style={{ opacity: 0.6, maxWidth: '600px', margin: '20px auto' }}>
            Exploring the intersection of software architecture, property tech, and the future of African digital ecosystems.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px', marginBottom: '100px' }}>
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                whileHover={{ y: -10 }}
                style={{ cursor: 'pointer', borderBottom: '1px solid #eee', paddingBottom: '30px' }}
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div style={{ height: '250px', background: '#f5f5f5', marginBottom: '20px', overflow: 'hidden' }}>
                   {post.image ? (
                     <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   ) : (
                     <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>No Image</div>
                   )}
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--cca-red)' }}>
                  <span>{post.category.toUpperCase()}</span>
                  <span style={{ color: '#aaa' }}>|</span>
                  <span style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '5px' }}><FaRegClock /> {post.date}</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', lineHeight: '1.3', marginBottom: '15px' }}>{post.title}</h3>
                <p style={{ opacity: 0.6, fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {post.excerpt}
                </p>
                <span style={{ fontWeight: '900', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  READ ARTICLE <FaChevronRight size={10} />
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.3 }}>
            <h2>New insights coming soon.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;