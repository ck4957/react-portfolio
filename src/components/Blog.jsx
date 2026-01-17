import React, { useState, useEffect } from 'react';
import { Link } from '../router';
// import './App.scss';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // For now, we'll simulate fetching blog posts or use a static list
    // You can later move this to a JSON file like learnings.json
    const blogPosts = [
      {
        id: "responsive-utility",
        title: "Responsive utility canvas",
        date: "Jan 2026",
        summary: "Documenting how to keep micro-layout cards balanced using clamp() for spacing and typography so the preview always feels intentional at each breakpoint.",
        tags: ["CSS Layout", "clamp()", "Utility"],
        content: "Full content would go here..." 
      },
      {
        id: "accessible-pill",
        title: "Accessible toggle pill",
        date: "Dec 2025",
        summary: "Saving a tiny accessible switch pattern that looks like a pill but retains proper focus, aria, and motion cues for screen reader users.",
        tags: ["Accessibility", "Components"],
        content: "Full content would go here..."
      }
    ];
    setPosts(blogPosts);
  }, []);

  return (
    <section id="blog">
        <div className="learnings-section" style={{paddingTop: '50px'}}>
            <div className="learning-heading">
            <h1 className="section-title" style={{color: 'black'}}>Blog & Learnings</h1>
            <p className="learning-intro">Captured experiments, reminders, and small static HTML outputs.</p>
            </div>
            <div className="learning-grid-wrapper">
            {posts.map((post) => (
                <article className="learning-entry" key={post.id}>
                <div className="learning-entry-header">
                    <h3>{post.title}</h3>
                    <span className="learning-date">{post.date}</span>
                </div>
                <p className="learning-summary">{post.summary}</p>
                <div className="learning-tags">
                    {post.tags.map(tag => (
                    <span className="learning-tag" key={tag}>{tag}</span>
                    ))}
                </div>
                </article>
            ))}
            </div>
             <div style={{textAlign: 'center', marginTop: '30px', paddingBottom: '30px'}}>
                <Link href="/" className="learning-pill" style={{textDecoration: 'none'}}>
                     Back to Home
                </Link>
             </div>
        </div>
    </section>
  );
};

export default Blog;
