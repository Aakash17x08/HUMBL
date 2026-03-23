import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-brand-pink pt-32 pb-20 px-4 sm:px-8 text-brand-green">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-bold mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} /> Back Home
        </Link>
        
        <h1 className="text-6xl font-black italic tracking-tighter mb-10 leading-none">Privacy <span className="text-white">Policy</span>.</h1>
        
        <div className="italic font-medium leading-relaxed space-y-12">
          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">Your Data, Your Privacy</h3>
            <p>At HUMBL, we collect minimal data to provide you with the best healthy meal delivery experience. We only collect information that is absolutely necessary for order fulfillment and personalization.</p>
          </div>

          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">What We Collect</h3>
            <p>We specifically collect your name, email, delivery address, and dietary preferences to ensure each meal reaches the right person with the right ingredients.</p>
          </div>

          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">Third-Party Sharing</h3>
            <p>We do not sell your personal data. We only share it with our trusted delivery partners to fulfill your orders. Your payment information is processed through secure, encrypted gateways.</p>
          </div>

          <div className="bg-brand-white/10 p-8 rounded-[2.5rem]">
            <h3 className="text-3xl font-black mb-4">Cookies</h3>
            <p>We use simple cookies to remember your login and your cart preferences. You can disable them in your browser settings at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
