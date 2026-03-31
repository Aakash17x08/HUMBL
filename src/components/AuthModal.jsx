console.log("FILE VERSION: NEW ✅")
import { auth } from '../config/firebase'; // ← initialized auth instance
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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

// ─── Auth Modal ───────────────────────────────────────────────────────────────
const AuthModal = ({ isOpen, onClose }) => {
  const [mode,  setMode]  = useState('login');
  const [error, setError] = useState('');

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
    try {
      console.log("🔐 Logging in with:", loginData.email);
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      console.log("✅ Token saved:", token.substring(0, 20));
      onClose();
    } catch (err) {
      console.log("❌ LOGIN ERROR:", err.code, err.message);
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '').trim());
    }
  };

  // ── Register ──
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log("📝 Registering user:", registerData.email);
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      console.log("✅ Registration Token saved:", token.substring(0, 20));
      onClose();
    } catch (err) {
      console.log("❌ REGISTER ERROR:", err.code, err.message);
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '').trim());
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

            <button type="submit"
              className="w-full bg-brand-green text-white font-bold text-base py-3.5 rounded-full hover:bg-brand-dark transition-colors duration-200 shadow-md mt-1"
            >
              Sign In
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
            {/* All your existing register inputs and styling remain intact */}
            {/* ... KEEP REGISTER FORM JSX SAME AS YOUR ORIGINAL ... */}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;