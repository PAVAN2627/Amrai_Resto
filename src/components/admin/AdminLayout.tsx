import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TreePalm, LogOut, LayoutDashboard, Utensils, Star, Image, Leaf,
  Receipt, BarChart3, TrendingUp, CreditCard, Users, PartyPopper,
  Bed, UserCog, FileText, Settings, Menu as MenuIcon, X, Store, QrCode
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getGreeting } from '@/lib/constants';

const NAV_GROUPS = [
  {
    label: 'Dashboard',
    items: [{ id: 'overview', label: 'Overview', icon: LayoutDashboard }],
  },
  {
    label: 'Restaurant',
    items: [
      { id: 'menu', label: 'Menu Items', icon: Utensils },
      { id: 'specials', label: "Today's Special", icon: Star },
      { id: 'gallery', label: 'Resort Gallery', icon: Image },
      { id: 'ambience', label: 'Ambience', icon: Leaf },
    ],
  },
  {
    label: 'Billing & POS',
    items: [
      { id: 'new-bill', label: 'New POS Bill', icon: Store },
      { id: 'bills', label: 'Bill History', icon: Receipt },
    ],
  },
  {
    label: 'Table Ordering',
    items: [
      { id: 'tables', label: 'Manage Tables', icon: QrCode },
      { id: 'table-orders', label: 'Live Orders', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { id: 'revenue', label: 'Revenue & Sales', icon: BarChart3 },
      { id: 'popular', label: 'Popular Dishes', icon: TrendingUp },
      { id: 'payments', label: 'Payment Types', icon: CreditCard },
    ],
  },
  {
    label: 'Customers',
    items: [{ id: 'customers', label: 'Customer Directory', icon: Users }],
  },
  {
    label: 'Events & Lodging',
    items: [
      { id: 'events', label: 'Events & Packages', icon: PartyPopper },
      { id: 'lodging', label: 'Rooms & Lodging', icon: Bed },
    ],
  },
  {
    label: 'Management',
    items: [
      { id: 'staff', label: 'Counter Staff', icon: UserCog },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

const QUICK_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'menu', label: 'Menu', icon: Utensils },
  { id: 'specials', label: 'Specials', icon: Star },
  { id: 'new-bill', label: 'New POS', icon: Store },
  { id: 'bills', label: 'Bill History', icon: Receipt },
  { id: 'table-orders', label: 'Table Orders', icon: QrCode },
  { id: 'revenue', label: 'Revenue', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'staff', label: 'Staff', icon: UserCog },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export function AdminLayout({ children, activePage, onNavigate }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col lg:flex-row">
      
      {/* SIDEBAR DRAWER */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-[100dvh] w-64 bg-stone-900 border-r border-amber-400/20 text-stone-200 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 sm:p-5 border-b border-amber-400/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Aamrai Resort Logo" className="w-8 h-8 object-contain rounded-full bg-white p-0.5 shadow border border-amber-400/50" />
            <div className="leading-none">
              <span className="font-serif text-xl font-bold text-amber-100">Aamrai Resort</span>
              <p className="text-amber-300/70 text-[10px] tracking-wide mt-0.5 uppercase font-semibold">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-amber-400/70 text-[10px] uppercase font-bold tracking-widest px-3 mb-1.5">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      activePage === item.id
                        ? 'bg-amber-400 text-stone-950 font-extrabold shadow-md'
                        : 'text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <item.icon size={16} /> {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-amber-400/10 bg-stone-950">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-stone-950/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTAINER */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* HEADER NAVBAR */}
        <header className="bg-stone-900/95 backdrop-blur-md border-b border-amber-400/20 sticky top-0 z-20 shadow-xl">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-stone-800 text-amber-400 border border-amber-400/30">
                <MenuIcon size={20} />
              </button>
              <div>
                <p className="font-serif text-lg sm:text-xl text-amber-100 font-bold">{getGreeting()}, Admin</p>
                <p className="text-[11px] sm:text-xs text-stone-400">Management & Operations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-amber-100">{user?.name}</p>
                <p className="text-[10px] text-amber-300/70 uppercase font-semibold">Administrator</p>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE
              </div>
              
              {/* Prominent Header Logout Button */}
              <button
                onClick={handleSignOut}
                className="p-2 rounded-full bg-stone-800 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* MOBILE SCROLLABLE QUICK NAV BAR (LIKE COUNTER POS) */}
          <div className="lg:hidden flex items-center gap-1.5 px-3 pb-2.5 pt-1 overflow-x-auto scrollbar-hide border-t border-amber-400/10 bg-stone-950">
            {QUICK_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activePage === item.id
                    ? 'bg-amber-400 text-stone-950 shadow-md'
                    : 'text-stone-300 bg-stone-900 border border-amber-400/20'
                }`}
              >
                <item.icon size={14} /> {item.label}
              </button>
            ))}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
