import React from 'react';
import { Check, Star, ShieldCheck, Zap } from 'lucide-react';

const plans = [
  {
    name: "Day Pass",
    price: "₹499",
    period: "per day",
    tagline: "Perfect for a healthy reset",
    features: [
      "Any 3 Large Bowls",
      "1 Cold-Pressed Smoothie",
      "Free Doorstep Delivery",
      "No Commitment"
    ],
    highlight: false,
    icon: <Zap size={32} />
  },
  {
    name: "Week Bundle",
    price: "₹2,999",
    period: "per week",
    tagline: "Sustainable energy & health",
    features: [
      "21 Specialized Meals",
      "Daily Smoothie Included",
      "Personal Diet Consultation",
      "Weight Management Track",
      "Priority Support"
    ],
    highlight: true,
    icon: <Star size={32} />
  },
  {
    name: "Monthly Pro",
    price: "₹10,999",
    period: "per month",
    tagline: "Total lifestyle transformation",
    features: [
      "Full Month Meal Prep",
      "Premium Supplement Kit",
      "Weekly Health Checkups",
      "Access to Exclusive Recipes",
      "Cancel Anytime"
    ],
    highlight: false,
    icon: <ShieldCheck size={32} />
  }
];

const Subscription = () => {
  return (
    <section id="subscription" className="bg-slate-50 min-h-screen py-24 sm:py-32 px-4 sm:px-8 md:px-12 flex flex-col items-center overflow-hidden w-full">
      <div className="max-w-7xl w-full">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter text-brand-green uppercase leading-none">
            Meal <span className="text-brand-pink underline decoration-brand-green/10 underline-offset-[12px] decoration-4">Subscriptions</span>.
          </h1>
          <p className="text-lg sm:text-xl font-bold italic text-brand-green/70 max-w-2xl mx-auto uppercase tracking-[0.2em]">
            Fuel your life with consistency
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white p-8 sm:p-10 rounded-[3rem] sm:rounded-[3.5rem] border-2 flex flex-col items-center text-center transition-all duration-500 md:hover:-translate-y-4
                ${plan.highlight 
                  ? "border-brand-green shadow-2xl lg:scale-105 z-10" 
                  : "border-brand-green/5 shadow-xl md:opacity-90"
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-6 bg-brand-green text-white px-8 py-2 rounded-full font-black italic text-sm tracking-widest uppercase shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="text-brand-green mb-6 p-4 bg-brand-green/5 rounded-3xl">
                {plan.icon}
              </div>

              <h3 className="text-4xl font-black italic text-brand-green mb-2">{plan.name}</h3>
              <p className="text-brand-green/70 font-bold text-xs uppercase tracking-widest mb-8">{plan.tagline}</p>

              <div className="mb-10 flex flex-col">
                <span className="text-5xl font-black text-brand-green tracking-tighter">{plan.price}</span>
                <span className="text-brand-green/50 font-bold italic text-sm uppercase">{plan.period}</span>
              </div>

              <ul className="space-y-5 mb-12 flex-1 w-full">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-brand-green/80 font-bold italic text-lg leading-tight">
                    <div className="shrink-0 bg-brand-green text-white p-1 rounded-full">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-3xl font-black text-xl italic transition-all shadow-xl active:scale-95
                ${plan.highlight 
                  ? "bg-brand-green text-white hover:bg-brand-dark" 
                  : "bg-white text-brand-green border-2 border-brand-green/10 hover:border-brand-green"
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
        
        {/* Footer Info */}
        <p className="mt-20 text-center text-brand-green font-bold italic opacity-60 max-w-2xl mx-auto">
          *All meal plans include fresh seasonal ingredients. Delivery times can be customized to your preference. 
          Special dietary requirements? Contact our nutritionists.
        </p>
      </div>
    </section>
  );
};

export default Subscription;
