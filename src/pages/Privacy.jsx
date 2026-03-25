import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-brand-pink pt-32 pb-20 px-4 sm:px-8 text-brand-green font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-bold mb-10 text-brand-green hover:text-white transition-colors bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
          <ArrowLeft size={18} /> Back Home
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-brand-green">
            Privacy <span className="text-white">Policy</span>
          </h1>
          <p className="text-brand-green/80 text-lg font-medium">Last updated: March 2026</p>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 space-y-10">
          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Your Data, Your Privacy
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">At Go-Humbl, we collect minimal data to provide you with the best healthy meal delivery experience. We only collect information that is absolutely necessary for order fulfillment, customer support, and personalization.</p>
          </section>

          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              What We Collect
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">We specifically collect your name, email, delivery address, phone number, and dietary preferences to ensure each meal reaches the right person safely and with the right ingredients.</p>
          </section>

          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Third-Party Sharing
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">We do not sell your personal data. We only share specific details with our trusted delivery partners to fulfill your orders. Your payment information is processed through secure, industry-standard encrypted gateways.</p>
          </section>

          <section>
            <h3 className="text-2xl font-black mb-3 text-brand-green flex items-center gap-3">
              <span className="bg-brand-pink text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              Cookies
            </h3>
            <p className="text-brand-green/80 text-lg leading-relaxed pl-11">We use simple cookies to remember your login status and save your cart preferences for a seamless experience. You have full control and can disable them in your browser settings at any time.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
