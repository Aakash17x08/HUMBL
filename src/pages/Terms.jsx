import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
    useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-brand-pink pt-32 pb-20 px-4 sm:px-8 text-brand-green">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-bold mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} /> Back Home
        </Link>
        
        <h1 className="text-6xl font-black italic tracking-tighter mb-10 leading-none">Terms & <span className="text-white">Conditions</span>.</h1>
        
        <div className="prose-xl italic font-medium leading-relaxed space-y-12">
          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">Agreement to Terms</h3>
            <p>By using our website, you agree to follow these Terms & Conditions. Use of our services is strictly for personal and non-commercial purposes only.</p>
          </div>

          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">Subscription & Billing</h3>
            <p>Users can subscribe to our various meal plans. Recurring fees will be applied based on the frequency selected (Daily, Weekly, or Monthly). Subscriptions can be canceled at any time from your account dashboard.</p>
          </div>

          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">Refund Policy</h3>
            <p>Refunds are available only for orders that arrive in poor condition or are delayed beyond reasonable limits. Please contact our support team for any issues within 1 hour of delivery.</p>
          </div>
          
          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">User Conduct</h3>
            <p>We reserve the right to terminate your account if any fraudulent activity or misuse of our system is detected.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
