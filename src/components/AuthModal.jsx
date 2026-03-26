import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const CustomSelect = ({ value, onChange, options, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = options.find(opt => opt.value === value)?.label || '';

  return (
    <div className="relative w-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border-2 border-brand-green/30 rounded-full px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium cursor-pointer flex justify-between items-center text-sm"
      >
        <span className="truncate pr-4">{currentLabel}</span>
        <ChevronDown size={18} className={`flex-shrink-0 transition-transform duration-200 text-brand-green ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-brand-green/20 rounded-3xl shadow-2xl z-50 p-2 overflow-hidden animate-fade-in flex flex-col gap-1 pointer-events-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 rounded-2xl cursor-pointer text-sm font-medium transition-colors ${
                  value === option.value 
                    ? 'text-brand-dark bg-brand-green/10 font-bold' 
                    : 'text-brand-dark hover:bg-brand-green hover:text-white'
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const activityOptions = [
  { value: 'bmr', label: 'Basal Metabolic Rate (BMR)' },
  { value: 'sedentary', label: 'Sedentary: little or no exercise' },
  { value: 'light', label: 'Light: exercise 1-3 times/week' },
  { value: 'moderate', label: 'Moderate: exercise 4-5 times/week' },
  { value: 'active', label: 'Active: exercise 3-4 times/week' },
  { value: 'very-active', label: 'Very Active: intense exercise 6-7 times/week' },
  { value: 'extra-active', label: 'Extra Active: very intense exercise daily' }
];

const goalOptions = [
  { value: 'loss', label: 'Weight Loss' },
  { value: 'maintain', label: 'Maintain Weight' },
  { value: 'bulk', label: 'Bulk / Weight Gain' }
];

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  
  const [loginData, setLoginData] = useState({ email: '', mobile: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', email: '', mobile: '', password: '', confirmPassword: '',
    age: '', gender: 'male', heightFeet: '', heightInches: '',
    weight: '', activity: 'moderate', goal: 'maintain'
  });

  if (!isOpen) return null;

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    // onClose(); // Optionally close on success
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Registration attempt:', registerData);
    // onClose(); // Optionally close on success
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-brand-pink relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 sm:p-10 shadow-2xl border-4 border-brand-green scrollbar-hide"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full bg-brand-white/40 text-brand-green hover:bg-white transition-colors z-[110]"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {mode === 'login' ? (
          <div className="animate-fade-in relative z-10">
            <h2 className="text-4xl font-black italic tracking-tighter text-brand-green mb-2 uppercase text-center">
              Welcome <span className="text-white">Back</span>
            </h2>
            <p className="text-sm text-brand-green font-medium text-center italic opacity-85 mb-6">
              Log in to continue picking up where you left off.
            </p>
            
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-brand-green font-bold mb-1.5 ml-2" htmlFor="email">Email Address</label>
                <input
                  type="email" id="email" name="email" value={loginData.email} onChange={handleLoginChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-brand-green font-bold mb-1.5 ml-2" htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel" id="mobile" name="mobile" value={loginData.mobile} onChange={handleLoginChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-brand-green font-bold mb-1.5 ml-2" htmlFor="password">Password</label>
                <input
                  type="password" id="password" name="password" value={loginData.password} onChange={handleLoginChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end -mt-2">
                <a href="#" className="text-brand-green hover:text-white text-xs font-bold transition-colors italic">Forgot password?</a>
              </div>
              <button type="submit" className="btn-primary w-full mt-2 py-3 rounded-full text-lg">Sign In</button>
            </form>
            <div className="mt-6 text-center text-brand-green/80 font-medium text-sm">
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} className="text-brand-green font-bold hover:underline">Sign up</button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in relative z-10">
            <h2 className="text-4xl font-black italic tracking-tighter text-brand-green mb-2 uppercase text-center">
              Create <span className="text-white">Account</span>
            </h2>
            <p className="text-sm text-brand-green font-medium text-center italic opacity-85 mb-6">
              Join us and get ready for something delicious.
            </p>
            
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="name">Full Name</label>
                <input
                  type="text" id="name" name="name" value={registerData.name} onChange={handleRegisterChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="email">Email</label>
                <input
                  type="email" id="email" name="email" value={registerData.email} onChange={handleRegisterChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel" id="mobile" name="mobile" value={registerData.mobile} onChange={handleRegisterChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="password">Password</label>
                  <input
                    type="password" id="password" name="password" value={registerData.password} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="confirmPassword">Confirm</label>
                  <input
                    type="password" id="confirmPassword" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="age">Age</label>
                  <input
                    type="number" id="age" name="age" min="15" max="80" value={registerData.age} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm">Gender</label>
                  <div className="flex items-center gap-4 px-2 py-2">
                    <label className="flex items-center gap-1.5 text-brand-green font-medium cursor-pointer text-sm">
                      <input type="radio" name="gender" value="male" checked={registerData.gender === 'male'} onChange={handleRegisterChange} className="accent-brand-green w-4 h-4 cursor-pointer" />
                      Male
                    </label>
                    <label className="flex items-center gap-1.5 text-brand-green font-medium cursor-pointer text-sm">
                      <input type="radio" name="gender" value="female" checked={registerData.gender === 'female'} onChange={handleRegisterChange} className="accent-brand-green w-4 h-4 cursor-pointer" />
                      Female
                    </label>
                  </div>
                </div>
              </div>

              {/* Height Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="heightFeet">Height (ft)</label>
                  <input
                    type="number" id="heightFeet" name="heightFeet" min="3" max="8" value={registerData.heightFeet} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="heightInches">Height (in)</label>
                  <input
                    type="number" id="heightInches" name="heightInches" min="0" max="11" value={registerData.heightInches} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    placeholder="10"
                  />
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="weight">Weight (kg)</label>
                <input
                  type="number" id="weight" name="weight" min="20" max="300" value={registerData.weight} onChange={handleRegisterChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="75"
                />
              </div>

              {/* Activity Level */}
              <div className="relative z-20">
                <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="activity">Activity Level</label>
                <CustomSelect 
                  id="activity" name="activity" 
                  value={registerData.activity} 
                  onChange={handleRegisterChange} 
                  options={activityOptions}
                />
              </div>

              {/* Goal */}
              <div className="mb-4 relative z-10">
                <label className="block text-brand-green font-bold mb-1 ml-2 text-sm" htmlFor="goal">Fitness Goal</label>
                <CustomSelect 
                  id="goal" name="goal" 
                  value={registerData.goal} 
                  onChange={handleRegisterChange} 
                  options={goalOptions}
                />
              </div>

              <button type="submit" className="btn-primary w-full mt-4 py-3 rounded-full text-lg">Sign Up</button>
            </form>
            <div className="mt-5 text-center text-brand-green/80 font-medium text-sm">
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-brand-green font-bold hover:underline">Log in</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
