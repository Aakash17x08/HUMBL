import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
    useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-brand-pink pt-32 pb-20 px-4 sm:px-8 text-brand-green font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-bold mb-10 text-brand-green hover:text-white transition-colors bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
          <ArrowLeft size={18} /> Back Home
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-brand-green">
            Terms & <span className="text-white">Conditions</span>
          </h1>
          <p className="text-brand-green/80 text-lg font-medium">Last updated: March 2026</p>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 space-y-10">
          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Agreement to Terms
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">By using our website, you agree to follow these Terms & Conditions. Use of our services is strictly for personal and non-commercial purposes only.</p>
          </section>

          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Subscription & Billing
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">Users can subscribe to our various meal plans. Recurring fees will be applied based on the frequency selected (Daily, Weekly, or Monthly). Subscriptions can be canceled at any time from your account dashboard without hidden cancellation fees.</p>
          </section>

          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Refund Policy
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">Refunds are available only for orders that arrive in poor condition or are delayed beyond reasonable limits. Please contact our support team for any issues within 1 hour of delivery to ensure prompt resolution.</p>
          </section>
          
          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              User Conduct
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">We reserve the right to terminate your account if any fraudulent activity, abuse of our refund policy, or misuse of our system is detected.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
