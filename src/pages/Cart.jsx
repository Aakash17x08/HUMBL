import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  const totalAmount = cart.reduce((total, item) => {
    // Assuming price is a string like "₹349", parse it to number
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''), 10);
    return total + priceNum * item.quantity;
  }, 0);
  return (
    <div className="bg-brand-pink min-h-screen flex flex-col justify-center items-center px-8 text-center animate-fade-in pt-32 pb-12">
      <div className="max-w-7xl w-full">
        <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter text-brand-green mb-6 uppercase">
          Your <span className="text-white">Cart</span>
        </h1>
        <p className="text-xl text-brand-green font-medium max-w-2xl mx-auto leading-relaxed italic opacity-85">
          Your selected items appear here. Ready for something delicious?
        </p>
        
        {cart.length === 0 ? (
          <div className="mt-12 p-12 bg-white/20 backdrop-blur-md rounded-[2.5rem] border-2 border-brand-green/20 text-brand-green italic text-2xl font-bold">
            Your cart is currently empty.
          </div>
        ) : (
          <div className="mt-12 space-y-6 text-left">
            <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border-2 border-brand-green/20 shadow-xl">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-brand-green/10 last:border-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-md" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-black italic text-brand-green mb-2">{item.name}</h3>
                    <p className="text-brand-green/70 font-bold mb-4">{item.price}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center gap-3 bg-brand-green/5 rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-brand-green hover:text-brand-pink transition-colors">
                          <Minus size={18} />
                        </button>
                        <span className="font-bold text-brand-green text-lg w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-brand-green hover:text-brand-pink transition-colors">
                          <Plus size={18} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-brand-pink hover:bg-brand-pink/10 rounded-full transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border-2 border-brand-green/20 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
              <div className="text-brand-green text-center sm:text-left">
                <p className="text-lg font-bold opacity-80 mb-1">Total Amount</p>
                <p className="text-4xl font-black italic tracking-tighter">₹{totalAmount}</p>
              </div>
              <button className="w-full sm:w-auto px-12 py-4 bg-brand-green text-white font-black italic rounded-xl text-lg hover:bg-brand-pink transition-colors shadow-lg shadow-brand-green/30">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
