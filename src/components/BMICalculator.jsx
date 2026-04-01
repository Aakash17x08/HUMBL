import React, { useState, useEffect } from "react";
import { X, Activity } from "lucide-react";

const BMICalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for dynamic button positioning
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 250);
    window.addEventListener("scroll", onScroll);
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to meters
    const bmiValue = w / (h * h);
    
    let classification = "";
    let color = "";
    let message = "";

    if (bmiValue < 18.5) {
      classification = "Underweight";
      color = "text-amber-500";
      message = "You are below the healthy weight range. A balanced diet can help you reach your goals.";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      classification = "Normal";
      color = "text-brand-green";
      message = "Great job! You are in a healthy weight range. Keep up the good work with balanced meals.";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      classification = "Overweight";
      color = "text-orange-500";
      message = "You are slightly above the healthy weight range. Small dietary adjustments can have a big impact.";
    } else {
      classification = "Obese";
      color = "text-red-500";
      message = "Your BMI indicates obesity. Focusing on nutrient-dense, portion-controlled meals will be highly beneficial.";
    }

    setResult({
      value: bmiValue.toFixed(1),
      classification,
      color,
      message
    });
  };

  const closeReset = () => {
    setIsOpen(false);
    setTimeout(() => setResult(null), 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Calculate BMI"
        className={`fixed right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-brand-green text-brand-beige shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center group hover:scale-110 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 border-2 border-brand-beige/50 ${scrolled ? 'bottom-20 sm:bottom-24 lg:bottom-[104px] translate-y-0' : 'bottom-6 translate-y-0'}`}
      >
        <Activity size={24} />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-brand-dark/90 text-brand-beige text-xs font-black tracking-widest uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-brand-green/20">
          BMI Calc
        </span>
      </button>

      {/* Modal Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={closeReset}></div>

        {/* Modal Content */}
        <div 
          className={`relative w-full max-w-md bg-brand-beige border-4 border-white rounded-[2rem] shadow-2xl p-6 sm:p-8 transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"}`}
        >
          <button 
            onClick={closeReset}
            className="absolute top-5 right-5 text-brand-green/50 hover:text-brand-pink transition-colors bg-white rounded-full p-1.5 shadow-sm"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl sm:text-3xl font-black italic text-brand-green mb-6 flex items-center gap-3">
            <Activity /> BMI Calculator
          </h2>

          {!result ? (
            <form onSubmit={calculateBMI} className="space-y-5 animate-fade-in">


              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-brand-green/70 uppercase tracking-widest">Weight (kg)</label>
                  <input type="number" required min="20" max="300" step="0.1" placeholder="e.g. 70" className="w-full bg-white border-2 border-brand-green/10 rounded-xl p-3 text-brand-green font-bold focus:outline-none focus:border-brand-pink transition-colors" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-brand-green/70 uppercase tracking-widest">Height (cm)</label>
                  <input type="number" required min="100" max="250" placeholder="e.g. 175" className="w-full bg-white border-2 border-brand-green/10 rounded-xl p-3 text-brand-green font-bold focus:outline-none focus:border-brand-pink transition-colors" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-green text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-green/90 transform hover:-translate-y-1 transition-all mt-4 uppercase tracking-wide">
                Calculate BMI
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-fade-in text-center py-4">
              <div className="relative inline-block">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="CurrentColor" strokeWidth="14" fill="transparent" className="text-white drop-shadow-sm" />
                  <circle cx="80" cy="80" r="70" stroke="CurrentColor" strokeWidth="14" fill="transparent" strokeDasharray="439.82" strokeDashoffset={439.82 - (439.82 * (Math.min(result.value, 40) / 40))} className={`${result.color} transition-all duration-1000 ease-out drop-shadow-md`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black ${result.color}`}>{result.value}</span>
                  <span className="text-[10px] font-black text-brand-green/50 uppercase tracking-widest mt-1">BMI</span>
                </div>
              </div>

              <div>
                <h3 className={`text-3xl font-black italic uppercase mb-2 ${result.color}`}>{result.classification}</h3>
                <div className="bg-white rounded-2xl p-5 border-2 border-brand-green/10 shadow-sm">
                  <p className="text-brand-green/80 font-medium leading-relaxed mb-3">
                    {result.message}
                  </p>
                </div>
              </div>

              <button onClick={() => setResult(null)} className="w-full bg-brand-green/10 text-brand-green font-black py-3 rounded-xl hover:bg-brand-green hover:text-white transition-all">
                Recalculate
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BMICalculator;
