import React from 'react';

const Products = () => {
  return (
    <section id="products" className="bg-brand-pink min-h-screen flex flex-col justify-center items-center text-center px-8">
      <h1 className="text-6xl font-black italic tracking-tighter text-brand-green mb-4">Our Products<span className="text-white">.</span></h1>
      <p className="text-lg font-medium text-brand-green opacity-80 max-w-2xl mx-auto leading-relaxed">Check out our latest offerings.</p>
    </section>
  );
};

export default Products;
