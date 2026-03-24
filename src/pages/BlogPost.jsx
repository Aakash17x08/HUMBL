import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-pink flex flex-col items-center justify-center pt-32 px-8 text-brand-green">
        <h2 className="text-4xl font-black italic mb-8">Post not found</h2>
        <Link to="/#blogs" className="btn-primary flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-pink pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/#blogs" 
          className="inline-flex items-center gap-2 text-brand-green font-bold text-lg hover:text-brand-dark transition-all mb-10 group"
        >
          <div className="p-2 bg-brand-green text-white rounded-full group-hover:-translate-x-1 transition-transform shadow-md">
            <ArrowLeft size={18} />
          </div>
          Back to Articles
        </Link>

        {/* Hero Image */}
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-brand-green/10 mb-12 h-[300px] sm:h-[450px]">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Header */}
        <div className="px-2">
          <p className="text-brand-green/60 font-black uppercase tracking-widest text-sm mb-4 italic">
            Published on {post.date}
          </p>
          <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-brand-green mb-10 leading-[1.1]">
            {post.title}<span className="text-white">.</span>
          </h1>

          {/* Article Body */}
          <div 
            className="max-w-none text-brand-green/80 italic font-medium leading-relaxed text-xl sm:text-2xl
                       [&>p]:mb-8 [&>h3]:text-3xl [&>h3]:sm:text-4xl [&>h3]:font-black [&>h3]:text-brand-green [&>h3]:mb-6 [&>h3]:mt-12 [&>h3]:italic [&>h3]:tracking-tight"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 p-10 bg-brand-green rounded-[2.5rem] shadow-xl text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-black italic mb-6">Hungry for some Go-Humbl?</h2>
          <p className="text-brand-beige/80 font-bold mb-8 text-lg">Taste the freshness in every bite. Order your bowl today!</p>
          <Link to="/#subscription" className="bg-brand-pink text-brand-green px-10 py-4 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all inline-block shadow-lg">
            Start Your Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
