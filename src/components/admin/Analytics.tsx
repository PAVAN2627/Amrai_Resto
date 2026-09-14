import { useMemo, useState } from 'react';
import type { Bill } from '@/types';
import { formatCurrency, formatDate, formatTime } from '@/lib/constants';
import { IndianRupee, Receipt, Users, TrendingUp, FileText, MessageCircle } from 'lucide-react';
import { mockBills, mockSettings } from '@/lib/mockData';
import { downloadBillPDF } from '@/lib/pdf';
import { sendAutoWhatsAppBillPDF } from '@/lib/whatsappService';
import { useToast } from '@/context/ToastContext';

type DateRange = 'today' | 'yesterday' | 'week' | 'month' | 'year';

export function RevenueAnalytics() {
  const [range, setRange] = useState<DateRange>('month');

  const data = useMemo(() => {
    const now = new Date();
    let start: Date;

    switch (range) {
      case 'today': start = new Date(now.getFullYear(), now.getMonth(), now.getDate()); break;
      case 'yesterday': start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); break;
      case 'week': start = new Date(now); start.setDate(now.getDate() - 7); break;
      case 'month': start = new Date(now.getFullYear(), now.getMonth(), 1); break;
      case 'year': start = new Date(now.getFullYear(), 0, 1); break;
      default: start = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const end = range === 'yesterday'
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
      : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const allBills = mockBills.filter((b) => {
      const bd = new Date(b.created_at);
      return b.status === 'paid' && bd >= start && bd < end;
    });

    const total = allBills.reduce((s, b) => s + Number(b.total), 0);
    const uniqueCust = new Set(allBills.map((b) => b.customer_mobile)).size;

    const payments = ['cash', 'upi', 'card', 'other'];
    const pData = payments.map((method) => {
      const methodBills = allBills.filter((b) => b.payment_method === method);
      return { method: method.toUpperCase(), amount: methodBills.reduce((s, b) => s + Number(b.total), 0), count: methodBills.length };
    }).filter((p) => p.count > 0);

    const groups: Record<string, { revenue: number; bills: number }> = {};
    allBills.forEach((b) => {
      const d = new Date(b.created_at);
      const key = range === 'year' ? d.toLocaleDateString('en-IN', { month: 'short' }) : range === 'month' ? `${d.getDate()}` : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      if (!groups[key]) groups[key] = { revenue: 0, bills: 0 };
      groups[key].revenue += Number(b.total);
      groups[key].bills += 1;
    });

    return {
      stats: { total, count: allBills.length, customers: uniqueCust, avg: allBills.length > 0 ? total / allBills.length : 0 },
      chartData: Object.entries(groups).map(([label, v]) => ({ label, ...v })),
      paymentData: pData,
    };
  }, [range]);

  const maxRevenue = Math.max(...data.chartData.map((d) => d.revenue), 1);

  return (
    <div className="space-y-6 text-stone-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl text-amber-100 font-bold">Revenue Analytics</h2>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {(['today', 'yesterday', 'week', 'month', 'year'] as DateRange[]).map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all capitalize ${range === r ? 'bg-amber-400 text-stone-950 shadow-md' : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-amber-400/20'}`}>
              {r === 'week' ? 'This Week' : r === 'month' ? 'This Month' : r === 'year' ? 'This Year' : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(data.stats.total), icon: IndianRupee },
          { label: 'Total Bills', value: data.stats.count, icon: Receipt },
          { label: 'Customers', value: data.stats.customers, icon: Users },
          { label: 'Average Bill', value: formatCurrency(data.stats.avg), icon: TrendingUp },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-stone-900 border border-amber-400/20 p-5 shadow-xl">
            <s.icon className="text-amber-400 mb-2" size={24} />
            <p className="font-serif text-2xl sm:text-3xl text-amber-400 font-extrabold mb-1">{s.value}</p>
            <p className="text-xs text-stone-400 uppercase font-bold tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-6 shadow-xl">
        <h3 className="font-serif text-xl text-amber-100 font-bold mb-5">Revenue & Orders Trend</h3>
        {data.chartData.length === 0 ? (
          <p className="text-center text-stone-500 py-12 text-sm">No data for this period</p>
        ) : (
          <div className="flex items-end justify-between gap-1.5 h-56 overflow-x-auto">
            {data.chartData.map((d) => (
              <div key={d.label} className="flex flex-col items-center gap-1.5 flex-shrink-0" style={{ minWidth: '40px' }}>
                <span className="text-[10px] font-bold text-amber-400">{formatCurrency(d.revenue)}</span>
                <div className="w-full bg-stone-950 rounded-t-lg overflow-hidden flex items-end border border-amber-400/20" style={{ height: '150px' }}>
                  <div className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg transition-all duration-700" style={{ height: `${(d.revenue / maxRevenue) * 100}%` }} />
                </div>
                <span className="text-[10px] text-stone-400">{d.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-6 shadow-xl">
        <h3 className="font-serif text-xl text-amber-100 font-bold mb-5">Payment Method Breakdown</h3>
        {data.paymentData.length === 0 ? (
          <p className="text-center text-stone-500 py-8 text-sm">No payment data</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.paymentData.map((p) => (
              <div key={p.method} className="rounded-xl bg-stone-950 border border-amber-400/20 p-4">
                <p className="font-bold text-amber-100 text-sm">{p.method}</p>
                <p className="font-serif text-2xl text-amber-400 font-extrabold mt-1">{formatCurrency(p.amount)}</p>
                <p className="text-xs text-stone-400 font-semibold">{p.count} bills completed</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function BillsList() {
  const [search, setSearch] = useState('');
  const { showToast } = useToast();
  const bills = useMemo(() => [...mockBills], []);
  const filtered = bills.filter((b) =>
    b.bill_number.toLowerCase().includes(search.toLowerCase()) ||
    b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    b.customer_mobile.includes(search)
  );
  const totalRevenue = bills.filter((b) => b.status === 'paid').reduce((s, b) => s + Number(b.total), 0);

  return (
    <div className="space-y-4 text-stone-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl text-amber-100 font-bold">All Bills</h2>
        <div className="text-right">
          <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Total Revenue (Paid)</p>
          <p className="font-serif text-2xl text-amber-400 font-extrabold">{formatCurrency(totalRevenue)}</p>
        </div>
      </div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by bill no, customer name, or mobile..." className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" />
      
      <div className="overflow-x-auto rounded-2xl bg-stone-900 border border-amber-400/20 shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-stone-950 text-amber-400 text-xs uppercase tracking-wider border-b border-amber-400/20">
            <tr>
              <th className="text-left p-3 font-bold">Bill No</th>
              <th className="text-left p-3 font-bold">Date & Time</th>
              <th className="text-left p-3 font-bold">Customer</th>
              <th className="text-left p-3 font-bold hidden md:table-cell">Staff</th>
              <th className="text-left p-3 font-bold">Payment</th>
              <th className="text-right p-3 font-bold">Amount</th>
              <th className="text-center p-3 font-bold">Status</th>
              <th className="text-center p-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {filtered.map((bill) => (
              <tr key={bill.id} className="hover:bg-stone-800/50 transition-colors">
                <td className="p-3 font-mono font-bold text-amber-300">{bill.bill_number}</td>
                <td className="p-3 text-xs text-stone-400">{formatDate(bill.created_at)}<br />{formatTime(bill.created_at)}</td>
                <td className="p-3"><p className="font-bold text-stone-100">{bill.customer_name}</p><p className="text-xs font-mono text-stone-400">{bill.customer_mobile}</p></td>
                <td className="p-3 hidden md:table-cell text-stone-300">{bill.counter_user_name}</td>
                <td className="p-3"><span className="px-2.5 py-1 rounded-full bg-stone-950 border border-amber-400/30 text-amber-300 text-xs font-bold">{bill.payment_method.toUpperCase()}</span></td>
                <td className="p-3 text-right font-extrabold text-amber-400 text-base">{formatCurrency(bill.total)}</td>
                <td className="p-3 text-center"><span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${bill.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300'}`}>{bill.status}</span></td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => downloadBillPDF(bill, bill.bill_items || [], mockSettings)}
                      className="p-1.5 rounded-lg bg-stone-800 text-amber-400 border border-amber-400/30 hover:bg-stone-700 transition-colors"
                      title="Download PDF"
                    >
                      <FileText size={15} />
                    </button>
                    <button
                      onClick={async () => {
                        const res = await sendAutoWhatsAppBillPDF(bill, bill.bill_items || [], mockSettings);
                        showToast(res.message, res.success ? 'success' : 'error');
                      }}
                      className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors"
                      title="Send on WhatsApp"
                    >
                      <MessageCircle size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PopularDishes() {
  const [filter, setFilter] = useState('all');

  const { items, topDish, topRevenueDish } = useMemo(() => {
    let bills = mockBills.filter((b) => b.status === 'paid');
    if (filter !== 'all') {
      const now = new Date();
      let start: Date;
      if (filter === 'today') start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      else if (filter === 'week') { start = new Date(now); start.setDate(now.getDate() - 7); }
      else if (filter === 'month') start = new Date(now.getFullYear(), now.getMonth(), 1);
      else start = new Date(now.getFullYear(), 0, 1);
      bills = bills.filter((b) => new Date(b.created_at) >= start);
    }
    const grouped: Record<string, { orders: number; quantity: number; revenue: number }> = {};
    bills.forEach((b) => {
      (b.bill_items || []).forEach((bi) => {
        if (!grouped[bi.name]) grouped[bi.name] = { orders: 0, quantity: 0, revenue: 0 };
        grouped[bi.name].orders += 1;
        grouped[bi.name].quantity += bi.quantity;
        grouped[bi.name].revenue += Number(bi.total);
      });
    });
    const sorted = Object.entries(grouped).map(([name, v]) => ({ name, ...v })).sort((a, b) => b.quantity - a.quantity);
    return { items: sorted, topDish: sorted[0]?.name || '-', topRevenueDish: [...sorted].sort((a, b) => b.revenue - a.revenue)[0]?.name || '-' };
  }, [filter]);

  return (
    <div className="space-y-6 text-stone-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl text-amber-100 font-bold">Popular Dishes</h2>
        <div className="flex gap-1.5">
          {['today', 'week', 'month', 'year', 'all'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${filter === f ? 'bg-amber-400 text-stone-950 shadow-md' : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-amber-400/20'}`}>{f === 'all' ? 'All Time' : f}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Most Ordered Dish', value: topDish },
          { label: 'Highest Revenue Dish', value: topRevenueDish },
          { label: 'Top Selling Category', value: topDish },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-stone-900 border border-amber-400/20 p-5 shadow-xl">
            <p className="text-amber-300/70 text-xs mb-1 font-semibold uppercase tracking-wider">{s.label}</p>
            <p className="font-serif text-2xl text-amber-400 font-extrabold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-amber-400/20"><h3 className="font-serif text-xl text-amber-100 font-bold">Top Selling Dishes Ranking</h3></div>
        {items.length === 0 ? (
          <p className="text-center text-stone-500 py-12 text-sm">No data for this period</p>
        ) : (
          <div className="divide-y divide-stone-800">
            {items.slice(0, 15).map((item, i) => (
              <div key={item.name} className="flex items-center gap-4 p-4 hover:bg-stone-800/40 transition-colors">
                <span className="font-serif text-2xl text-amber-400/50 w-8 font-extrabold">{i + 1}</span>
                <div className="flex-1"><p className="font-bold text-stone-100 text-base">{item.name}</p><p className="text-xs text-stone-400">{item.orders} orders • {item.quantity} plates sold</p></div>
                <span className="font-serif text-xl text-amber-400 font-extrabold">{formatCurrency(item.revenue)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
