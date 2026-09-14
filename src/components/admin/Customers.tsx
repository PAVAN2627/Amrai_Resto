import { useMemo, useState } from 'react';
import { mockBills, mockSettings } from '@/lib/mockData';
import type { Bill } from '@/types';
import { formatCurrency, formatDate } from '@/lib/constants';
import { Phone, Eye, X, Users, FileText, MessageCircle } from 'lucide-react';
import { downloadBillPDF } from '@/lib/pdf';
import { sendAutoWhatsAppBillPDF } from '@/lib/whatsappService';
import { useToast } from '@/context/ToastContext';

interface Customer {
  name: string;
  mobile: string;
  visits: number;
  totalSpent: number;
  lastVisit: string;
  avgBill: number;
}

export function Customers() {
  const [search, setSearch] = useState('');
  const [profile, setProfile] = useState<Customer | null>(null);
  const [profileBills, setProfileBills] = useState<Bill[]>([]);
  const { showToast } = useToast();

  const customers = useMemo(() => {
    const grouped: Record<string, Customer> = {};
    mockBills.filter((b) => b.status === 'paid').forEach((b) => {
      const key = b.customer_mobile;
      if (!grouped[key]) grouped[key] = { name: b.customer_name, mobile: b.customer_mobile, visits: 0, totalSpent: 0, lastVisit: b.created_at, avgBill: 0 };
      grouped[key].visits += 1;
      grouped[key].totalSpent += Number(b.total);
      if (new Date(b.created_at) > new Date(grouped[key].lastVisit)) grouped[key].lastVisit = b.created_at;
    });
    return Object.values(grouped).map((c) => ({ ...c, avgBill: c.visits > 0 ? c.totalSpent / c.visits : 0 })).sort((a, b) => b.totalSpent - a.totalSpent);
  }, []);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search));

  const viewProfile = (cust: Customer) => {
    setProfile(cust);
    setProfileBills(mockBills.filter((b) => b.customer_mobile === cust.mobile && b.status === 'paid').sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  };

  return (
    <div className="space-y-6 text-stone-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-amber-100 font-bold flex items-center gap-2">
            <Users size={28} className="text-amber-400" /> Customer Directory
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-0.5">Track repeat customers, total spending, and visit history</p>
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by customer name or mobile number..."
        className="w-full px-4 py-3.5 rounded-2xl border border-amber-400/30 bg-stone-900 text-stone-100 placeholder:text-stone-500 text-base font-medium shadow-inner focus:border-amber-400 focus:outline-none"
      />

      <div className="overflow-x-auto rounded-2xl bg-stone-900 border border-amber-400/20 shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-stone-950 text-amber-400 text-xs uppercase tracking-wider border-b border-amber-400/20">
            <tr>
              <th className="text-left p-4 font-bold">Customer Name</th>
              <th className="text-left p-4 font-bold hidden sm:table-cell">Mobile</th>
              <th className="text-center p-4 font-bold">Total Visits</th>
              <th className="text-right p-4 font-bold">Total Spent</th>
              <th className="text-right p-4 font-bold hidden md:table-cell">Avg Bill</th>
              <th className="text-left p-4 font-bold hidden lg:table-cell">Last Visit</th>
              <th className="text-center p-4 font-bold">View History</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {filtered.map((c) => (
              <tr key={c.mobile} className="hover:bg-stone-800/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-800 border border-amber-400/30 text-amber-400 flex items-center justify-center font-serif text-base font-bold">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-bold text-stone-100">{c.name}</span>
                  </div>
                </td>
                <td className="p-4 hidden sm:table-cell font-mono text-amber-200 text-xs">{c.mobile}</td>
                <td className="p-4 text-center font-bold text-amber-300">{c.visits}</td>
                <td className="p-4 text-right font-extrabold text-amber-400 text-base">{formatCurrency(c.totalSpent)}</td>
                <td className="p-4 text-right hidden md:table-cell text-stone-300 font-bold">{formatCurrency(c.avgBill)}</td>
                <td className="p-4 hidden lg:table-cell text-xs text-stone-400">{formatDate(c.lastVisit)}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => viewProfile(c)}
                    className="p-2 rounded-lg bg-stone-800 text-amber-400 border border-amber-400/30 hover:bg-stone-700 transition-colors"
                    title="View Profile"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-stone-500 text-xs italic text-center">Customer records are confidential and stored securely</p>

      {profile && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setProfile(null)}>
          <div className="bg-stone-900 border border-amber-400/30 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in text-stone-100" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-amber-400/20 bg-stone-950 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-stone-800 border border-amber-400/30 text-amber-400 flex items-center justify-center font-serif text-xl font-bold">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-amber-100 font-bold">{profile.name}</h3>
                  <p className="text-xs text-amber-300 flex items-center gap-1 font-mono mt-0.5"><Phone size={12} /> {profile.mobile}</p>
                </div>
              </div>
              <button onClick={() => setProfile(null)} className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl bg-stone-950 border border-amber-400/20 p-3 text-center">
                  <p className="font-serif text-2xl text-amber-300 font-bold">{profile.visits}</p>
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Visits</p>
                </div>
                <div className="rounded-xl bg-stone-950 border border-amber-400/20 p-3 text-center">
                  <p className="font-serif text-2xl text-amber-400 font-extrabold">{formatCurrency(profile.totalSpent)}</p>
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Total Spent</p>
                </div>
                <div className="rounded-xl bg-stone-950 border border-amber-400/20 p-3 text-center">
                  <p className="font-serif text-2xl text-amber-200 font-bold">{formatCurrency(profile.avgBill)}</p>
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Avg Bill</p>
                </div>
              </div>

              <h4 className="font-serif text-lg text-amber-100 font-bold mb-3">Order History</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {profileBills.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-amber-400/15">
                    <div>
                      <p className="font-mono text-xs font-bold text-amber-300">{b.bill_number}</p>
                      <p className="text-[11px] text-stone-400">{formatDate(b.created_at)} • {b.payment_method.toUpperCase()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg text-amber-400 font-extrabold">{formatCurrency(b.total)}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => downloadBillPDF(b, b.bill_items || [], mockSettings)}
                          className="p-1.5 rounded-lg bg-stone-800 text-amber-400 border border-amber-400/30 hover:bg-stone-700 transition-colors"
                          title="Download PDF"
                        >
                          <FileText size={14} />
                        </button>
                        <button
                          onClick={async () => {
                            const res = await sendAutoWhatsAppBillPDF(b, b.bill_items || [], mockSettings);
                            showToast(res.message, res.success ? 'success' : 'error');
                          }}
                          className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors"
                          title="Send on WhatsApp"
                        >
                          <MessageCircle size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
