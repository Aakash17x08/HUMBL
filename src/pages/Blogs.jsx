import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const Blogs = () => {
  return (
    <section id="blogs" className="bg-brand-pink min-h-screen py-24 px-8 sm:px-16 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-[3.5rem] sm:text-[4rem] font-black italic tracking-tighter text-brand-green leading-none mb-2 capitalize">
            Blog & Articles.
          </h1>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="overflow-hidden rounded-[2.5rem] mb-6 shadow-lg border-2 border-brand-green/10 bg-brand-beige">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Info */}
              <div className="px-2">
                <p className="text-brand-green/60 font-bold uppercase tracking-wider text-xs mb-3 italic">
                  {post.date}
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-green leading-tight italic tracking-tight group-hover:text-brand-dark transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
