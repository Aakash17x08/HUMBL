import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { ChevronLeft, CreditCard, Banknote, AlertCircle, CheckCircle2, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const { userData, user } = useUser();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  const totalAmount = cart.reduce((total, item) => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''), 10);
    return total + priceNum * item.quantity;
  }, 0);

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    setShowUpdateMessage(true);
    setTimeout(() => setShowUpdateMessage(false), 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-brand-pink min-h-screen flex flex-col items-center justify-center p-8 text-center pt-32">
        <h2 className="text-4xl font-black italic text-brand-green mb-4">YOUR CART IS EMPTY</h2>
        <Link to="/#products" className="btn-primary px-8 py-3 rounded-full text-lg">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-pink min-h-screen pt-32 pb-20 px-4 sm:px-8 animate-fade-in font-inter">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-green font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={24} /> Back to Cart
        </button>

        <h1 className="text-5xl sm:text-6xl font-black italic tracking-tighter text-brand-green mb-10 uppercase">
          Final <span className="text-white">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Details */}
            <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 border-2 border-brand-green/20 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-brand-green/10 transition-colors" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-green text-white flex items-center justify-center">
                  <Truck size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black italic text-brand-green uppercase">Delivery Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand-green/50 uppercase tracking-widest pl-1">Customer Name</p>
                  <p className="font-black text-brand-green italic text-lg bg-white/50 px-4 py-2 rounded-xl border border-brand-green/5">{userData?.name || user?.email?.split('@')[0] || 'User'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand-green/50 uppercase tracking-widest pl-1">Contact Number</p>
                  <p className="font-black text-brand-green italic text-lg bg-white/50 px-4 py-2 rounded-xl border border-brand-green/5">{userData?.phoneNumber || 'Not provided'}</p>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <p className="text-[10px] font-bold text-brand-green/50 uppercase tracking-widest pl-1">Shipping Address</p>
                  <div className="font-bold text-brand-green italic bg-white/50 px-4 py-3 rounded-xl border border-brand-green/5 min-h-[80px]">
                    {userData?.streetaddress ? (
                      <>
                        <p>{userData.streetaddress}</p>
                        <p className="text-sm opacity-80">{userData.landmark ? `Landmark: ${userData.landmark}` : ''}</p>
                        <p className="mt-1">Pincode: {userData.postalCode}</p>
                      </>
                    ) : (
                      'Please add your address in profile details.'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 border-2 border-brand-green/20 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-green text-white flex items-center justify-center">
                  <CreditCard size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black italic text-brand-green uppercase">Payment Method</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <button
                  onClick={() => handlePaymentSelection('COD')}
                  className={`flex flex-col items-center gap-4 p-8 rounded-3xl border-3 transition-all ${paymentMethod === 'COD' ? 'bg-brand-green text-white border-brand-green scale-[1.02] shadow-lg' : 'bg-white text-brand-green border-brand-green/10 hover:border-brand-green'}`}
                >
                  <Banknote size={40} className={paymentMethod === 'COD' ? 'text-white' : 'text-brand-green'} />
                  <span className="font-black italic text-xl uppercase">Cash on Delivery</span>
                  <span className="text-[10px] font-bold opacity-60">PAY AT YOUR DOORSTEP</span>
                </button>

                <button
                  onClick={() => handlePaymentSelection('Online')}
                  className={`flex flex-col items-center gap-4 p-8 rounded-3xl border-3 transition-all ${paymentMethod === 'Online' ? 'bg-brand-green text-white border-brand-green scale-[1.02] shadow-lg' : 'bg-white text-brand-green border-brand-green/10 hover:border-brand-green'}`}
                >
                  <CreditCard size={40} className={paymentMethod === 'Online' ? 'text-white' : 'text-brand-green'} />
                  <span className="font-black italic text-xl uppercase">Online Payment</span>
                  <span className="text-[10px] font-bold opacity-60">UPI, CARDS & NET BANKING</span>
                </button>
              </div>

              {showUpdateMessage && (
                <div className="mt-8 p-4 bg-brand-pink/20 rounded-2xl border-2 border-brand-pink text-brand-green flex items-center justify-center gap-3 animate-bounce">
                  <AlertCircle size={24} />
                  <span className="font-black italic uppercase italic">Our payment gateways are currently under update. Try again later!</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-green rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-32">
              <h3 className="text-2xl font-black italic uppercase mb-8 pb-4 border-b border-white/20">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <p className="font-black text-sm italic line-clamp-1">{item.name}</p>
                      <p className="text-[10px] opacity-60">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-sm">₹{parseInt(item.price.replace(/[^\d]/g, ''), 10) * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center opacity-70">
                  <span className="font-bold">Subtotal</span>
                  <span className="font-bold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between items-center opacity-70">
                  <span className="font-bold">Delivery Fee</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-2xl pt-4">
                  <span className="font-black italic uppercase">Total</span>
                  <span className="font-black italic">₹{totalAmount}</span>
                </div>
              </div>

              <button 
                onClick={() => handlePaymentSelection(paymentMethod || 'Checkout')}
                className="w-full mt-10 py-5 bg-brand-pink text-white font-black italic rounded-2xl text-xl hover:scale-[1.05] transition-all shadow-xl shadow-black/20 uppercase tracking-tighter"
              >
                Place Your Order
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-50">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Secured by Humbl SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
