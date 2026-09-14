import { Link, useNavigate } from 'react-router-dom';
import { TreePalm, LogOut, Plus, History, BarChart3, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface CounterLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export function CounterLayout({ children, activePage, onNavigate }: CounterLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'new-bill', label: 'New Bill (POS)', icon: Plus },
    { id: 'history', label: 'Bill History', icon: History },
    { id: 'sales', label: "Today's Sales", icon: BarChart3 },
    { id: 'customer', label: 'Customer Lookup', icon: User },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      <header className="bg-stone-900 border-b border-amber-400/20 text-amber-50 sticky top-0 z-30 shadow-2xl">
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Aamrai Resort Logo" className="w-9 h-9 object-contain rounded-full bg-white p-0.5 shadow border border-amber-400/50" />
            <div className="leading-none">
              <span className="font-serif text-xl font-bold text-amber-100">Aamrai Resort</span>
              <p className="text-amber-300/70 text-[10px] tracking-wider uppercase font-semibold mt-0.5">Counter Billing Terminal</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activePage === item.id
                    ? 'bg-amber-400 text-stone-950 shadow-md scale-105'
                    : 'text-stone-300 hover:bg-stone-800 border border-amber-400/20'
                }`}
              >
                <item.icon size={15} /> {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-amber-100 text-xs font-bold">{user?.name}</p>
              <p className="text-amber-300/70 text-[10px] uppercase font-semibold">Counter Staff</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-full bg-stone-800 text-amber-400 border border-amber-400/30 hover:bg-stone-700 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-1.5 px-3 pb-2.5 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activePage === item.id ? 'bg-amber-400 text-stone-950 shadow-md' : 'text-stone-300 bg-stone-800 border border-amber-400/20'
              }`}
            >
              <item.icon size={14} /> {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-6">{children}</main>
    </div>
  );
}
