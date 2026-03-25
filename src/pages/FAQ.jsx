import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FAQ = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const faqs = [
    {
      q: "What is Go-Humbl?",
      a: "Go-Humbl is a fresh, vegetarian-focused food brand dedicated to providing nutrient-dense, plant-powered meals across India."
    },
    {
      q: "How do your subscriptions work?",
      a: "You can choose from our various meal plans (Açaí, Salads, Smoothies). You select your frequency, and we deliver fresh daily to your doorstep."
    },
    {
      q: "Are all your ingredients fresh?",
      a: "Absolutely! We source local, organic ingredients whenever possible and cut our vegetables fresh every single morning."
    },
    {
      q: "Where do you deliver?",
      a: "We currently deliver to most major cities. You can check availability by starting your order process and entering your pin code."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-pink pt-32 pb-20 px-4 sm:px-8 text-brand-green">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-bold mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} /> Back Home
        </Link>
        
        <h1 className="text-6xl font-black italic tracking-tighter mb-12">Frequently Asked <span className="text-white">Questions</span></h1>
        
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-brand-white/20 backdrop-blur-md p-8 rounded-[2rem] border border-brand-green/10">
              <h3 className="text-2xl font-black italic mb-4">{faq.q}</h3>
              <p className="text-lg font-medium opacity-80 leading-relaxed italic">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
