import { useState, useMemo } from 'react';
import { Eye, FileText, MessageCircle, Calendar, IndianRupee, TrendingUp, Receipt, Users } from 'lucide-react';
import type { Bill, BillItem } from '@/types';
import { formatCurrency, formatDate, formatTime, formatWhatsAppMobile, WHATSAPP_BASE } from '@/lib/constants';
import { downloadBillPDF } from '@/lib/pdf';
import { sendAutoWhatsAppBillPDF } from '@/lib/whatsappService';
import { useToast } from '@/context/ToastContext';
import { mockBills, mockSettings } from '@/lib/mockData';

export function BillHistory() {
  const [bills] = useState<Bill[]>(() => [...mockBills]);
  const [viewBill, setViewBill] = useState<Bill | null>(null);
  const [viewItems, setViewItems] = useState<BillItem[]>([]);
  const settings = mockSettings;
  const { showToast } = useToast();

  const viewBillDetails = (bill: Bill) => {
    setViewItems(bill.bill_items || []);
    setViewBill(bill);
  };

  const sendWhatsApp = async (bill: Bill) => {
    const res = await sendAutoWhatsAppBillPDF(bill, bill.bill_items || [], settings);
    showToast(res.message, res.success ? 'success' : 'error');
  };

  const printBill = (bill: Bill, items: BillItem[]) => {
    downloadBillPDF(bill, items, settings);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto text-stone-100">
      <h2 className="font-serif text-3xl text-amber-100 font-bold mb-6">Bill History</h2>

      <div className="space-y-3">
        {bills.map((bill) => (
          <div key={bill.id} className="flex items-center gap-3 p-4 rounded-xl bg-stone-900 border border-amber-400/20 hover:border-amber-400/50 hover:shadow-xl transition-all">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-amber-300">{bill.bill_number}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  bill.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300'
                }`}>{bill.status}</span>
              </div>
              <p className="text-sm font-bold text-stone-100">{bill.customer_name} • <span className="font-mono text-amber-200">{bill.customer_mobile}</span></p>
              <p className="text-xs text-stone-400">{formatDate(bill.created_at)} • {formatTime(bill.created_at)} • {bill.payment_method.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-xl text-amber-400 font-extrabold">{formatCurrency(bill.total)}</p>
              <p className="text-xs text-stone-400">{bill.counter_user_name}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => viewBillDetails(bill)} className="p-2 rounded-lg bg-stone-800 text-amber-400 border border-amber-400/30 hover:bg-stone-700 transition-colors" title="View">
                <Eye size={16} />
              </button>
              <button onClick={() => sendWhatsApp(bill)} className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors" title="WhatsApp">
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewBill && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-stone-900 border border-amber-400/30 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in text-stone-100">
            <div className="p-5 border-b border-amber-400/20 bg-stone-950">
              <div className="text-center">
                <h3 className="font-serif text-2xl text-amber-100 font-bold">Aamrai Resort</h3>
                <p className="text-amber-300/70 text-xs">Nature's Escape on NH4 Highway</p>
              </div>
              <div className="mt-4 space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between"><span className="text-stone-400">Bill No:</span><span className="font-mono font-bold text-amber-300">{viewBill.bill_number}</span></div>
                <div className="flex justify-between"><span className="text-stone-400">Date:</span><span>{formatDate(viewBill.created_at)} {formatTime(viewBill.created_at)}</span></div>
                <div className="flex justify-between"><span className="text-stone-400">Customer:</span><span className="font-bold">{viewBill.customer_name}</span></div>
                <div className="flex justify-between"><span className="text-stone-400">Mobile:</span><span className="font-mono">{viewBill.customer_mobile}</span></div>
                {viewBill.table_number && <div className="flex justify-between"><span className="text-stone-400">Table:</span><span>{viewBill.table_number}</span></div>}
                <div className="flex justify-between"><span className="text-stone-400">Payment:</span><span className="font-bold text-amber-400">{viewBill.payment_method.toUpperCase()}</span></div>
              </div>
            </div>

            <div className="p-5">
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-12 text-xs font-bold text-amber-300 uppercase tracking-wider pb-2 border-b border-amber-400/20">
                  <span className="col-span-6">Item</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-2 text-right">Rate</span>
                  <span className="col-span-2 text-right">Total</span>
                </div>
                {viewItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 text-xs text-stone-200 py-1">
                    <span className="col-span-6 truncate font-medium">{item.name}</span>
                    <span className="col-span-2 text-center font-bold">{item.quantity}</span>
                    <span className="col-span-2 text-right">{formatCurrency(item.price_at_purchase)}</span>
                    <span className="col-span-2 text-right font-bold text-amber-400">{formatCurrency(item.total)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 pt-3 border-t border-amber-400/20">
                <div className="flex justify-between text-xs"><span className="text-stone-400">Subtotal</span><span className="font-bold">{formatCurrency(viewBill.subtotal)}</span></div>
                {viewBill.discount > 0 && <div className="flex justify-between text-xs"><span className="text-stone-400">Discount</span><span className="text-red-400 font-bold">-{formatCurrency(viewBill.discount)}</span></div>}
                {viewBill.tax > 0 && <div className="flex justify-between text-xs"><span className="text-stone-400">Tax</span><span className="font-bold">{formatCurrency(viewBill.tax)}</span></div>}
                <div className="flex justify-between text-xl font-serif pt-2 border-t border-stone-800"><span className="text-stone-100 font-bold">Grand Total</span><span className="text-amber-400 font-extrabold">{formatCurrency(viewBill.total)}</span></div>
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={() => printBill(viewBill, viewItems)} className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-2">
                  <FileText size={16} /> PDF
                </button>
                <button onClick={() => sendWhatsApp(viewBill)} className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2">
                  <MessageCircle size={16} /> WhatsApp
                </button>
                <button onClick={() => setViewBill(null)} className="py-3 px-4 rounded-xl border border-stone-700 text-stone-300 hover:bg-stone-800 text-xs font-semibold">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TodaySales() {
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayBills = mockBills.filter((b) => b.status === 'paid' && b.created_at.startsWith(today));
    const total = todayBills.reduce((s, b) => s + Number(b.total), 0);
    const uniqueCustomers = new Set(todayBills.map((b) => b.customer_mobile)).size;
    return {
      total,
      count: todayBills.length,
      customers: uniqueCustomers,
      avg: todayBills.length > 0 ? total / todayBills.length : 0,
      bills: todayBills.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    };
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto text-stone-100">
      <h2 className="font-serif text-3xl text-amber-100 font-bold mb-6">Today's Sales Summary</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today's Revenue", value: formatCurrency(stats.total), icon: IndianRupee },
          { label: "Today's Bills", value: stats.count, icon: Receipt },
          { label: 'Unique Customers', value: stats.customers, icon: Users },
          { label: 'Average Bill Amount', value: formatCurrency(stats.avg), icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-stone-900 border border-amber-400/20 p-5 shadow-xl">
            <stat.icon className="text-amber-400 mb-3" size={24} />
            <p className="font-serif text-2xl sm:text-3xl text-amber-400 font-extrabold mb-1">{stat.value}</p>
            <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-serif text-xl text-amber-100 font-bold mb-4">Recent Bills Today</h3>
        {stats.bills.length === 0 ? (
          <div className="text-center py-12 bg-stone-900 rounded-2xl border border-amber-400/20 text-stone-400">
            <Calendar size={36} className="mx-auto mb-2 opacity-40 text-amber-400" />
            <p className="text-sm font-bold">No bills generated today yet</p>
            <p className="text-xs text-stone-500 mt-1">Mock bills in demo system are recorded on earlier dates</p>
          </div>
        ) : (
          <div className="space-y-2">
            {stats.bills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-3.5 rounded-xl bg-stone-900 border border-amber-400/20">
                <div>
                  <span className="font-mono text-sm font-bold text-amber-300">{bill.bill_number}</span>
                  <p className="text-xs text-stone-400">{bill.customer_name} • {formatTime(bill.created_at)}</p>
                </div>
                <span className="font-serif text-xl text-amber-400 font-extrabold">{formatCurrency(bill.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CustomerSearch() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    if (query.length < 2) return [];
    return mockBills
      .filter((b) => b.customer_name.toLowerCase().includes(query.toLowerCase()) || b.customer_mobile.includes(query))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20);
  }, [query]);

  return (
    <div className="p-4 max-w-4xl mx-auto text-stone-100">
      <h2 className="font-serif text-3xl text-amber-100 font-bold mb-6">Customer Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by customer name or 10-digit mobile number..."
        className="w-full px-5 py-4 rounded-2xl border border-amber-400/30 bg-stone-900 text-stone-100 placeholder:text-stone-500 text-lg font-medium shadow-inner mb-6 focus:border-amber-400 focus:outline-none"
        autoFocus
      />

      {query.length >= 2 && results.length === 0 && (
        <p className="text-center py-12 text-stone-500 text-sm">No customers found matching "{query}"</p>
      )}

      <div className="space-y-3">
        {results.map((bill) => (
          <div key={bill.id} className="flex items-center justify-between p-4 rounded-xl bg-stone-900 border border-amber-400/20">
            <div>
              <p className="font-bold text-stone-100 text-base">{bill.customer_name}</p>
              <p className="text-xs text-stone-400 font-mono mt-0.5">{bill.customer_mobile} • Bill {bill.bill_number} • {formatDate(bill.created_at)}</p>
            </div>
            <span className="font-serif text-xl text-amber-400 font-extrabold">{formatCurrency(bill.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
