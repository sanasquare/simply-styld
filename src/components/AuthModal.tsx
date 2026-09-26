import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BRAND_LOGO } from '../data/mockData';

export const AuthModal: React.FC = () => {
  const { showAuthModal, closeAuthModal, signIn, signUp, resetPassword, isConfigured } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const res = await signIn(email, password);
        if (res.success) {
          closeAuthModal();
        } else {
          setErrorMsg(res.error || 'Failed to sign in. Please check your credentials.');
        }
      } else if (mode === 'signup') {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your full name');
          setIsSubmitting(false);
          return;
        }
        const res = await signUp(email, password, fullName, phone);
        if (res.success) {
          setSuccessMsg('Account created successfully! Welcome to Simply Styld.');
          setTimeout(() => {
            closeAuthModal();
          }, 1200);
        } else {
          setErrorMsg(res.error || 'Failed to create account.');
        }
      } else if (mode === 'forgot') {
        const res = await resetPassword(email);
        if (res.success) {
          setSuccessMsg('Password reset link sent to your email.');
        } else {
          setErrorMsg(res.error || 'Failed to request password reset.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FCFAF6] rounded-2xl max-w-md w-full border border-[#D8C8AE] shadow-2xl p-6 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2ede4] hover:bg-[#EDE4D6] text-[#171513] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header Emblem */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full border-2 border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden shadow-xs mb-2 flex items-center justify-center p-0.5">
            <img src={BRAND_LOGO} alt="Simply Styld" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#745a2f] font-semibold">
            Boutique Account
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#171513] mt-0.5">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup' && 'Join Simply Styld'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-[#8C827A] mt-1 max-w-xs">
            {mode === 'signin' && 'Access your orders, saved pieces, and express boutique checkout.'}
            {mode === 'signup' && 'Create your account for personalized fittings and member privileges.'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Supabase Status Pill */}
        {!isConfigured && (
          <div className="mb-4 bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-amber-700">info</span>
            <span>Running in preview demo mode. Add Supabase keys to <code>.env</code> for live cloud sync.</span>
          </div>
        )}

        {/* Mode Tabs */}
        {mode !== 'forgot' && (
          <div className="flex rounded-xl bg-[#f2ede4] p-1 mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signin' ? 'bg-white text-[#171513] shadow-xs' : 'text-[#8C827A] hover:text-[#171513]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signup' ? 'bg-white text-[#171513] shadow-xs' : 'text-[#8C827A] hover:text-[#171513]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] shrink-0">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Roy"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-xl p-3 text-[#171513] focus:outline-none focus:border-[#745a2f]"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-xl p-3 text-[#171513] focus:outline-none focus:border-[#745a2f]"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 98200 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-xl p-3 text-[#171513] focus:outline-none focus:border-[#745a2f]"
              />
            </div>
          )}

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] uppercase font-bold text-[#8C827A]">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                    className="text-[10px] text-[#745a2f] hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-xl p-3 text-[#171513] focus:outline-none focus:border-[#745a2f]"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-[#171513] text-white font-semibold uppercase tracking-wider text-xs hover:bg-[#745a2f] transition-colors disabled:opacity-50 mt-2 flex items-center justify-center gap-2 shadow-sm"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Boutique Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </>
            )}
          </button>

          {mode === 'forgot' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-xs text-[#745a2f] font-semibold hover:underline"
              >
                ← Back to Sign In
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};
