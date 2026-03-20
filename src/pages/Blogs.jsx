import React from 'react';

const Blogs = () => {
  return (
    <section id="blogs" className="bg-brand-pink min-h-screen flex flex-col justify-center items-center text-center px-8">
      <h1 className="text-6xl font-black italic tracking-tighter text-brand-green mb-4">Blogs<span className="text-white">.</span></h1>
      <p className="text-lg font-medium text-brand-green opacity-80 max-w-2xl mx-auto leading-relaxed">Read our latest articles and updates.</p>
    </section>
  );
};

export default Blogs;
