import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Why to choose Go-Humbl?",
      a: "Because we provide healthy and delicious meals to our customers. We offer a variety of meal plans to suit different dietary needs and preferences. Our meals are prepared by experienced chefs and are delivered fresh to your doorstep."
    },
    {
      q: "What if I'm allergic to certain food ingredients?",
      a: "Please mention any food allergies when subscribing. We offer fully customizable meals to accommodate dietary restrictions."
    },
    {
      q: "Can I pick up my meals from your establishment?",
      a: "Currently, we only offer delivery services to ensure your meals reach you fresh and safely."
    },
    {
      q: "Can I change my delivery locations mid subscription ?",
      a: "Yes, you can easily update your delivery address from your profile settings in our app but do it before 1 day."
    },
    {
      q: "Can I pause my subscription?",
      a: "No."
    },
    {
      q: "Do you deliver on Sunday?",
      a: "Our standard delivery days are Monday through Saturday. Sunday deliveries are subject to special requests depending on the region."
    },
    {
      q: "What is calorie deficit?",
      a: "Calorie deficit is a state in which you consume fewer calories than your body burns. This can be achieved through diet, exercise, or both. It is a safe and effective way to lose weight and improve your overall health."
    },
    {
      q: "How many calories should I consume daily?",
      a: "The number of calories you should consume daily depends on your age, sex, weight, height, and activity level. You can use our calorie calculator to determine your daily calorie needs."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-pink pt-32 pb-20 px-4 sm:px-8 text-brand-green">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-bold mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} /> Back Home
        </Link>

        <h1 className="text-6xl font-black italic tracking-tighter mb-12">Frequently Asked <span className="text-white">Questions</span></h1>

        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] border-2 border-brand-green/20 overflow-hidden shadow-2xl">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border-b-2 border-brand-green/10 last:border-0 transition-colors duration-300 ${isOpen ? 'bg-brand-green/5' : ''}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-green/5 transition-colors"
                  onClick={() => toggleFAQ(idx)}
                >
                  <span className={`text-1xl sm:text-xl font-black italic pr-8 transition-colors ${isOpen ? 'text-brand-pink' : 'text-brand-green'}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 transition-colors ${isOpen ? 'text-brand-pink' : 'text-brand-green'}`}>
                    {isOpen ? <ChevronUp size={28} strokeWidth={3} /> : <ChevronDown size={28} strokeWidth={3} />}
                  </div>
                </button>

                <div
                  className={`px-6 sm:px-8 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-lg font-medium opacity-80 leading-relaxed italic text-brand-green">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

