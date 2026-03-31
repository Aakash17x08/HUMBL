import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';

const API = import.meta.env.VITE_API_BASE_URL;

// ─── Custom Select ────────────────────────────────────────────────────────────
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
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-brand-green/20 rounded-3xl shadow-2xl z-50 p-2">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => { onChange({ target: { name, value: option.value } }); setIsOpen(false); }}
                className={`px-4 py-2.5 rounded-2xl cursor-pointer text-sm ${value === option.value ? 'bg-brand-green/10 font-bold' : 'hover:bg-brand-green hover:text-white'}`}
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
  { value: 'bmr',          label: 'Basal Metabolic Rate (BMR)' },
  { value: 'sedentary',    label: 'Sedentary' },
  { value: 'light',        label: 'Light' },
  { value: 'moderate',     label: 'Moderate' },
  { value: 'active',       label: 'Active' },
  { value: 'very-active',  label: 'Very Active' },
  { value: 'extra-active', label: 'Extra Active' },
];

const goalOptions = [
  { value: 'loss',     label: 'Weight Loss' },
  { value: 'maintain', label: 'Maintain Weight' },
  { value: 'bulk',     label: 'Bulk' },
];

const inputClass =
  "w-full bg-white border-0 rounded-full px-5 py-3 text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-all text-sm font-medium shadow-sm";

// ─── Login Page ───────────────────────────────────────────────────────────────
const Login = ({ isOpen, onClose }) => {
  const [mode,  setMode]  = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const [registerData, setRegisterData] = useState({
    name: '', email: '', mobile: '', password: '', confirmPassword: '',
    age: '', gender: 'male', heightFeet: '', heightInches: '',
    weight: '', activity: 'moderate', goal: 'maintain',
  });

  if (!isOpen) return null;

  const handleLoginChange    = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  // ── Login ──
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!API) {
      setError("Backend API URL is not configured. Check your .env file.");
      setLoading(false);
      return;
    }
    try {
      // Step 1: Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const token = await userCredential.user.getIdToken();

      // Step 2: Save token
      localStorage.setItem('token', token);

      // Step 3: Sync with backend
      try {
        const res = await fetch(`${API}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: token }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.data));
        } else {
          console.warn('Backend returned failure:', data.message);
        }
      } catch (backendErr) {
        // Backend sync failed but login still succeeded
        console.warn('Backend sync failed:', backendErr.message);
        console.error('Backend sync failed. Is the server running?', backendErr.message);
      }

      onClose();
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '').trim());
    } finally {
      setLoading(false);
    }
  };

  // ── Register ──
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    if (!API) {
      setError("Backend API URL is not configured. Check your .env file.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const token = await userCredential.user.getIdToken();

      // Step 2: Save token
      localStorage.setItem('token', token);

      // Step 3: Save user profile to backend/Firestore
      try {
        const res = await fetch(`${API}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:     registerData.name,
            email:    registerData.email,
            phone:    registerData.mobile,
            role:     'customer',
            age:      registerData.age,
            gender:   registerData.gender,
            height:   `${registerData.heightFeet}ft ${registerData.heightInches}in`,
            weight:   registerData.weight,
            activity: registerData.activity,
            goal:     registerData.goal,
          }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.data));
        } else {
          console.warn('Backend registration error:', data.message);
        }
      } catch (backendErr) {
        console.warn('Backend sync failed:', backendErr.message);
        console.error('Backend registration sync failed:', backendErr.message);
      }

      onClose();
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '').trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-brand-pink relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 sm:p-10 shadow-2xl border-4 border-brand-green scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
        >
          <X size={18} className="text-brand-dark" />
        </button>

        {/* ── LOGIN FORM ── */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            <div className="text-center mb-1">
              <h2 className="text-3xl font-black tracking-tight text-brand-green leading-tight">
                WELCOME <span className="italic">BACK.</span>
              </h2>
              <p className="text-brand-dark/60 text-sm mt-2 font-medium">
                Log in to continue picking up where you left off.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Email Address</label>
              <input type="email" name="email" value={loginData.email}
                onChange={handleLoginChange} placeholder="you@example.com" required className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Password</label>
              <input type="password" name="password" value={loginData.password}
                onChange={handleLoginChange} placeholder="••••••••" required className={inputClass} />
              <div className="text-right pr-2 mt-0.5">
                <span className="text-xs font-semibold italic text-brand-green/80 cursor-pointer hover:text-brand-green transition-colors">
                  Forgot password?
                </span>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-xs font-semibold text-center bg-red-50 rounded-2xl px-4 py-2">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-brand-green text-white font-bold text-base py-3.5 rounded-full hover:bg-brand-dark transition-colors duration-200 shadow-md mt-1 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-brand-dark/70 font-medium">
              Don't have an account?{' '}
              <span onClick={() => { setMode('register'); setError(''); }}
                className="font-black text-brand-green cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </form>

        ) : (
          /* ── REGISTER FORM ── */
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <div className="text-center mb-1">
              <h2 className="text-3xl font-black tracking-tight text-brand-green leading-tight">
                JOIN <span className="italic">HUMBL.</span>
              </h2>
              <p className="text-brand-dark/60 text-sm mt-2 font-medium">
                Create your account and start eating well.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Full Name</label>
              <input type="text" name="name" value={registerData.name} onChange={handleRegisterChange} placeholder="Your name" required className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Email Address</label>
              <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="you@example.com" required className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Mobile Number</label>
              <input type="tel" name="mobile" value={registerData.mobile} onChange={handleRegisterChange} placeholder="+91 00000 00000" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Password</label>
              <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="••••••••" required className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Confirm Password</label>
              <input type="password" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} placeholder="••••••••" required className={inputClass} />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-bold text-brand-dark pl-2">Age</label>
                <input type="number" name="age" value={registerData.age} onChange={handleRegisterChange} placeholder="25" min="10" max="100" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-bold text-brand-dark pl-2">Gender</label>
                <select name="gender" value={registerData.gender} onChange={handleRegisterChange}
                  className={inputClass + " cursor-pointer appearance-none"}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-bold text-brand-dark pl-2">Height (ft)</label>
                <input type="number" name="heightFeet" value={registerData.heightFeet} onChange={handleRegisterChange} placeholder="5" min="1" max="9" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-bold text-brand-dark pl-2">Height (in)</label>
                <input type="number" name="heightInches" value={registerData.heightInches} onChange={handleRegisterChange} placeholder="8" min="0" max="11" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Weight (kg)</label>
              <input type="number" name="weight" value={registerData.weight} onChange={handleRegisterChange} placeholder="70" min="20" max="300" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Activity Level</label>
              <CustomSelect name="activity" value={registerData.activity} onChange={handleRegisterChange} options={activityOptions} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-brand-dark pl-2">Goal</label>
              <CustomSelect name="goal" value={registerData.goal} onChange={handleRegisterChange} options={goalOptions} />
            </div>

            {error && (
              <p className="text-red-600 text-xs font-semibold text-center bg-red-50 rounded-2xl px-4 py-2">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-brand-green text-white font-bold text-base py-3.5 rounded-full hover:bg-brand-dark transition-colors duration-200 shadow-md mt-1 disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-brand-dark/70 font-medium">
              Already have an account?{' '}
              <span onClick={() => { setMode('login'); setError(''); }}
                className="font-black text-brand-green cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;