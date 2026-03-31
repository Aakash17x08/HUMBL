import React, { useState } from 'react';
import { X, ChevronDown, ChevronLeft } from 'lucide-react';

const SelectionButton = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full py-4 px-6 rounded-2xl text-lg font-bold transition-all border-2 mb-3 text-center
      ${selected 
        ? 'bg-brand-green text-white border-brand-green shadow-lg scale-[1.02]' 
        : 'bg-white text-brand-dark border-gray-200 hover:border-brand-green/50 hover:bg-brand-green/5'
      }`}
  >
    {label}
  </button>
);

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
  "Lose weight", "Maintain weight", "Gain weight", "Gain muscle", "Modify my diet", "Manage stress", "Increase step count"
];

const habitOptions = [
  "Nutrition", "Physical Activity", "Sleep", "Hydration", "Stress Management"
];

const mealPlanningOptions = [
  "I plan every meal", "I plan most meals", "I plan occasionally", "I don't plan at all"
];

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [registerStep, setRegisterStep] = useState(1);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', goals: [], importantHabit: '', mealPlanning: '', activityLevel: 'moderate',
    gender: 'male', age: '', country: '', heightFeet: '', heightInches: '', weight: '',
    email: '', password: '', confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleGoalToggle = (goal) => {
    const currentGoals = [...registerData.goals];
    if (currentGoals.includes(goal)) {
      setRegisterData({ ...registerData, goals: currentGoals.filter(g => g !== goal) });
    } else if (currentGoals.length < 3) {
      setRegisterData({ ...registerData, goals: [...currentGoals, goal] });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    alert('Backend integration is pending.');
    onClose();
  };

  const handleNext = () => setRegisterStep(prev => prev + 1);
  const handleBack = () => setRegisterStep(prev => prev - 1);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Final Registration attempt:', registerData);
    alert('Backend integration is pending.');
    onClose();
  };

  const isStepValid = () => {
    switch(registerStep) {
      case 1: return registerData.name.length > 0;
      case 2: return registerData.goals.length > 0;
      case 3: return registerData.importantHabit.length > 0;
      case 4: return registerData.mealPlanning.length > 0;
      case 5: return registerData.activityLevel.length > 0;
      case 6: return registerData.age && registerData.country;
      case 7: return registerData.heightFeet && registerData.weight;
      case 8: return registerData.email && registerData.password && registerData.confirmPassword;
      default: return true;
    }
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

        {registerStep > 1 && mode === 'register' && (
          <button 
            onClick={handleBack}
            className="absolute top-6 left-6 p-2 rounded-full bg-brand-white/40 text-brand-green hover:bg-white transition-colors z-[110]"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
        )}

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
                <label className="block text-brand-green font-bold mb-1.5 ml-2 text-sm" htmlFor="login-email">Email Address</label>
                <input
                  type="email" id="login-email" name="email" value={loginData.email} onChange={handleLoginChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-5 py-2.5 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-brand-green font-bold mb-1.5 ml-2 text-sm" htmlFor="login-password">Password</label>
                <input
                  type="password" id="login-password" name="password" value={loginData.password} onChange={handleLoginChange} required
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
              <button onClick={() => { setMode('register'); setRegisterStep(1); }} className="text-brand-green font-bold hover:underline">Sign up</button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in relative z-10">
            {registerStep === 1 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-black italic tracking-tighter text-brand-green mb-2 uppercase text-center">
                  First, what's <span className="text-white">your name?</span>
                </h2>
                <input
                  autoFocus
                  type="text" name="name" value={registerData.name} onChange={handleRegisterChange} required
                  className="w-full bg-white border-2 border-brand-green/30 rounded-full px-6 py-4 text-brand-dark focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all font-bold text-xl text-center"
                  placeholder="Your Name"
                  onKeyPress={(e) => e.key === 'Enter' && registerData.name && handleNext()}
                />
                <button onClick={handleNext} disabled={!registerData.name} className="btn-primary w-full mt-4 py-3 rounded-full text-lg disabled:opacity-50">Next Step</button>
              </div>
            )}

            {registerStep === 2 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-black italic tracking-tighter text-brand-green mb-0 uppercase text-center leading-tight">
                  Thanks {registerData.name}! <br/><span className="text-white text-4xl">Now for your goals.</span>
                </h2>
                <p className="text-center text-brand-green/80 font-bold mb-4 text-sm italic">Select up to 3 that are important to you.</p>
                <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto px-2 scrollbar-hide mb-4">
                  {goalOptions.map(goal => (
                    <SelectionButton 
                      key={goal} label={goal} 
                      selected={registerData.goals.includes(goal)} 
                      onClick={() => handleGoalToggle(goal)} 
                    />
                  ))}
                </div>
                <button onClick={handleNext} disabled={registerData.goals.length === 0} className="btn-primary w-full py-3 rounded-full text-lg disabled:opacity-50">Continue</button>
              </div>
            )}

            {registerStep === 3 && (
              <div className="flex flex-col gap-4 text-center">
                <h2 className="text-3xl font-black italic tracking-tighter text-brand-green mb-2 uppercase">
                  Which <span className="text-white">health habit</span> is most important to you?
                </h2>
                <div className="flex flex-col gap-1 mt-4">
                  {habitOptions.map(habit => (
                    <SelectionButton 
                      key={habit} label={habit} 
                      selected={registerData.importantHabit === habit} 
                      onClick={() => { setRegisterData({...registerData, importantHabit: habit}); handleNext(); }} 
                    />
                  ))}
                </div>
              </div>
            )}

            {registerStep === 4 && (
              <div className="flex flex-col gap-4 text-center">
                <h2 className="text-3xl font-black italic tracking-tighter text-brand-green mb-2 uppercase">
                  How often do you <span className="text-white">plan your meals</span> in advance?
                </h2>
                <div className="flex flex-col gap-1 mt-4">
                  {mealPlanningOptions.map(option => (
                    <SelectionButton 
                      key={option} label={option} 
                      selected={registerData.mealPlanning === option} 
                      onClick={() => { setRegisterData({...registerData, mealPlanning: option}); handleNext(); }} 
                    />
                  ))}
                </div>
              </div>
            )}

            {registerStep === 5 && (
              <div className="flex flex-col gap-4 text-center">
                <h2 className="text-3xl font-black italic tracking-tighter text-brand-green mb-2 uppercase">
                  What is your <span className="text-white">baseline activity level?</span>
                </h2>
                <div className="flex flex-col gap-1 mt-4">
                  {activityOptions.map(option => (
                    <SelectionButton 
                      key={option.value} label={option.label} 
                      selected={registerData.activityLevel === option.value} 
                      onClick={() => { setRegisterData({...registerData, activityLevel: option.value}); handleNext(); }} 
                    />
                  ))}
                </div>
              </div>
            )}

            {registerStep === 6 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-black italic tracking-tighter text-brand-green mb-4 uppercase text-center">
                  Tell us <span className="text-white">about yourself</span>
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-brand-green font-bold mb-1 ml-2 text-sm">Age</label>
                    <input
                      type="number" name="age" value={registerData.age} onChange={handleRegisterChange} required
                      className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-green font-bold mb-1 ml-2 text-sm">Gender</label>
                    <div className="flex items-center gap-4 px-2 py-2">
                      <label className="flex items-center gap-1.5 text-brand-green font-medium cursor-pointer text-sm">
                        <input type="radio" name="gender" value="male" checked={registerData.gender === 'male'} onChange={handleRegisterChange} className="accent-brand-green" />
                        Male
                      </label>
                      <label className="flex items-center gap-1.5 text-brand-green font-medium cursor-pointer text-sm">
                        <input type="radio" name="gender" value="female" checked={registerData.gender === 'female'} onChange={handleRegisterChange} className="accent-brand-green" />
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm">Country</label>
                  <input
                    type="text" name="country" value={registerData.country} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark focus:outline-none focus:border-brand-green"
                    placeholder="India"
                  />
                </div>
                <button onClick={handleNext} disabled={!registerData.age || !registerData.country} className="btn-primary w-full mt-4 py-3 rounded-full text-lg disabled:opacity-50">Next Section</button>
              </div>
            )}

            {registerStep === 7 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-black italic tracking-tighter text-brand-green mb-4 uppercase text-center">
                  Almost <span className="text-white">there!</span>
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-brand-green font-bold mb-1 ml-2 text-sm text-center font-bold">Height (ft)</label>
                    <input
                      type="number" name="heightFeet" value={registerData.heightFeet} onChange={handleRegisterChange} required
                      className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark text-center"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-green font-bold mb-1 ml-2 text-sm text-center font-bold">Height (in)</label>
                    <input
                      type="number" name="heightInches" value={registerData.heightInches} onChange={handleRegisterChange} required
                      className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark text-center"
                      placeholder="10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm text-center font-bold">Weight (kg)</label>
                  <input
                    type="number" name="weight" value={registerData.weight} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark text-center font-bold"
                    placeholder="75"
                  />
                </div>
                <button onClick={handleNext} disabled={!registerData.heightFeet || !registerData.weight} className="btn-primary w-full mt-4 py-3 rounded-full text-lg disabled:opacity-50">Next Section</button>
              </div>
            )}

            {registerStep === 8 && (
              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                <h2 className="text-3xl font-black italic tracking-tighter text-brand-green mb-4 uppercase text-center leading-tight">
                  Finally, create your <span className="text-white">credentials</span>
                </h2>
                <div>
                  <label className="block text-brand-green font-bold mb-1 ml-2 text-sm font-bold">Email</label>
                  <input
                    type="email" name="email" value={registerData.email} onChange={handleRegisterChange} required
                    className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-green font-bold mb-1 ml-2 text-sm font-bold">Password</label>
                    <input
                      type="password" name="password" value={registerData.password} onChange={handleRegisterChange} required
                      className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-green font-bold mb-1 ml-2 text-sm font-bold">Confirm</label>
                    <input
                      type="password" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} required
                      className="w-full bg-white border-2 border-brand-green/30 rounded-full px-4 py-2 text-brand-dark"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full mt-6 py-4 rounded-full text-xl">Complete Registration</button>
              </form>
            )}

            {registerStep === 1 && (
              <div className="mt-8 text-center text-brand-green/80 font-medium text-sm">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-brand-green font-bold hover:underline">Log in</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
