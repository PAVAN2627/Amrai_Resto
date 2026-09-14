import { useMemo } from 'react';
import { IndianRupee, Receipt, Users, TrendingUp, Clock, Calendar, Sparkles } from 'lucide-react';
import { mockBills, mockSettings } from '@/lib/mockData';
import { formatCurrency, formatDate, BUSINESS_INFO } from '@/lib/constants';

export function AdminOverview() {
  const { stats, recentBills, weekData } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayBills = mockBills.filter((b) => b.status === 'paid' && b.created_at.startsWith(today));
    const total = todayBills.reduce((s, b) => s + Number(b.total), 0);
    const uniqueCust = new Set(todayBills.map((b) => b.customer_mobile)).size;

    const recent = [...mockBills].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    const dayIdx = (now.getDay() + 6) % 7;
    const week = days.map((day, i) => {
      const start = new Date(now);
      start.setDate(now.getDate() - dayIdx + i);
      const startStr = start.toISOString().split('T')[0];
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      const endStr = end.toISOString().split('T')[0];
      const bills = mockBills.filter((b) => b.status === 'paid' && b.created_at >= `${startStr}T00:00:00` && b.created_at < `${endStr}T00:00:00`);
      return { day, revenue: bills.reduce((s, b) => s + Number(b.total), 0), bills: bills.length };
    });

    return {
      stats: {
        todayRevenue: total,
        todayBills: todayBills.length,
        todayCustomers: uniqueCust,
        avgBill: todayBills.length > 0 ? total / todayBills.length : 0,
      },
      recentBills: recent,
      weekData: week,
    };
  }, []);

  const maxRevenue = Math.max(...weekData.map((d) => d.revenue), 1);

  return (
    <div className="space-y-6 text-stone-100">
      {/* Top Banner Card */}
      <div className="rounded-2xl bg-stone-900 border border-amber-400/30 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
          <img src="https://1qlik.com/Vendor_img/1729504904868.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} className="text-amber-400" />
            <span>Restaurant Operational Status</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-amber-50 font-bold mb-2">
            Aamrai Resort Management Overview
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE & OPEN FOR BILLING
            </span>
            <span className="text-stone-300 flex items-center gap-1.5 font-medium">
              <Clock size={14} className="text-amber-400" /> {BUSINESS_INFO.hours}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Revenue", value: formatCurrency(stats.todayRevenue), icon: IndianRupee },
          { label: "Today's Bills", value: stats.todayBills, icon: Receipt },
          { label: 'Customers Served', value: stats.todayCustomers, icon: Users },
          { label: 'Average Bill Amount', value: formatCurrency(stats.avgBill), icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-stone-900 border border-amber-400/20 p-5 shadow-xl hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-amber-400/30 flex items-center justify-center">
                <stat.icon className="text-amber-400" size={20} />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-amber-400 font-extrabold mb-1">{stat.value}</p>
            <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly Revenue Trend Chart */}
      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl text-amber-100 font-bold">Weekly Revenue Trend</h3>
          <span className="text-xs text-amber-300 font-bold flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 border border-amber-400/20">
            <Calendar size={13} className="text-amber-400" /> This Week
          </span>
        </div>
        <div className="flex items-end justify-between gap-2 h-48">
          {weekData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-amber-400">{formatCurrency(d.revenue)}</span>
              <div className="w-full bg-stone-950 rounded-t-lg overflow-hidden flex items-end border border-amber-400/20" style={{ height: '120px' }}>
                <div
                  className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg transition-all duration-1000"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
              </div>
              <span className="text-xs text-stone-400 font-bold">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bills Section */}
      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-6 shadow-xl">
        <h3 className="font-serif text-xl text-amber-100 font-bold mb-4">Recent POS Transactions</h3>
        <div className="space-y-2.5">
          {recentBills.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between p-3.5 rounded-xl bg-stone-950 border border-amber-400/15 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-amber-300">{bill.bill_number}</span>
                <div>
                  <p className="text-sm font-bold text-stone-100">{bill.customer_name}</p>
                  <p className="text-xs text-stone-400">{formatDate(bill.created_at)} • {bill.payment_method.toUpperCase()}</p>
                </div>
              </div>
              <span className="font-serif text-xl text-amber-400 font-extrabold">{formatCurrency(bill.total)}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-stone-500 text-xs italic">
        Real-time analytics — figures automatically update as staff issue new POS bills.
      </p>
    </div>
  );
}
