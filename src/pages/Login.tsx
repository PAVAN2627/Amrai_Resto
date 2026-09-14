import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TreePalm, Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    showToast('Welcome back!', 'success');
    navigate(email === 'admin@aamrairesort.com' ? '/admin' : '/counter');
  };

  const fillDemo = (role: 'admin' | 'counter') => {
    if (role === 'admin') {
      setEmail('admin@aamrairesort.com');
      setPassword('admin123');
    } else {
      setEmail('counter@aamrairesort.com');
      setPassword('counter123');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 bg-stone-950 text-stone-100">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/14024976/pexels-photo-14024976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Resort background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors mb-6 text-sm font-bold">
          <ArrowLeft size={16} /> Back to website
        </Link>

        <div className="bg-stone-900 rounded-3xl p-8 shadow-2xl border border-amber-400/30 backdrop-blur-md">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Aamrai Resort Logo" className="w-20 h-20 object-contain rounded-full bg-white p-1 shadow-2xl border border-amber-400/50 mx-auto mb-4" />
            <h1 className="font-serif text-3xl text-amber-50 font-bold">Aamrai Resort</h1>
            <p className="text-amber-300/70 text-xs uppercase tracking-widest font-semibold mt-1">Management Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-amber-200 text-xs font-bold uppercase tracking-wider mb-1.5">Username / Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  placeholder="admin@aamrairesort.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-amber-200 text-xs font-bold uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/20 border border-red-500/40 px-4 py-3 text-red-300 text-xs font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold transition-all duration-300 shadow-xl disabled:opacity-60"
            >
              {loading ? 'Signing in...' : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-amber-400/10">
            <p className="text-center text-amber-300/70 text-xs mb-4 uppercase tracking-widest font-bold">Demo Quick Accounts</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => fillDemo('admin')}
                className="rounded-xl border border-amber-400/20 bg-stone-950 p-3 text-left hover:border-amber-400/60 transition-all"
              >
                <p className="font-bold text-amber-300 text-sm">Admin</p>
                <p className="text-stone-400 text-[11px] mt-0.5 font-mono">admin@aamrairesort.com</p>
                <p className="text-amber-400/80 text-[11px] font-mono font-bold">admin123</p>
              </button>
              <button
                onClick={() => fillDemo('counter')}
                className="rounded-xl border border-amber-400/20 bg-stone-950 p-3 text-left hover:border-amber-400/60 transition-all"
              >
                <p className="font-bold text-amber-300 text-sm">Counter POS</p>
                <p className="text-stone-400 text-[11px] mt-0.5 font-mono">counter@aamrairesort.com</p>
                <p className="text-amber-400/80 text-[11px] font-mono font-bold">counter123</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
