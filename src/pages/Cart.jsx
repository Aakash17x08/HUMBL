import React from 'react';

const Cart = () => {
  return (
    <div className="bg-brand-pink min-h-screen flex flex-col justify-center items-center px-8 text-center animate-fade-in pt-32 pb-12">
      <div className="max-w-7xl w-full">
        <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter text-brand-green mb-6 uppercase">
          Your <span className="text-white">Cart</span>.
        </h1>
        <p className="text-xl text-brand-green font-medium max-w-2xl mx-auto leading-relaxed italic opacity-85">
          Your selected items appear here. Ready for something delicious?
        </p>
        
        <div className="mt-12 p-12 bg-brand-white/20 backdrop-blur-md rounded-[2.5rem] border-2 border-brand-green/20 text-brand-green italic text-2xl font-bold">
          Your cart is currently empty.
        </div>
      </div>
    </div>
  );
};

export default Cart;
