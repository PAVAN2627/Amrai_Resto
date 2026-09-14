import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, MapPin, Phone } from 'lucide-react';
import { mockBills, mockSettings } from '@/lib/mockData';
import { formatCurrency, formatDate, formatTime, BUSINESS_INFO } from '@/lib/constants';
import { downloadBillPDF } from '@/lib/pdf';

export function PublicBillView() {
  const { billId } = useParams<{ billId: string }>();

  const bill = useMemo(() => {
    return mockBills.find((b) => b.bill_number.toLowerCase() === billId?.toLowerCase() || b.id.toLowerCase() === billId?.toLowerCase()) || mockBills[0];
  }, [billId]);

  const items = bill?.bill_items || [];

  if (!bill) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <FileText size={48} className="mx-auto text-amber-400 opacity-50" />
          <h1 className="font-serif text-2xl font-bold">Bill Not Found</h1>
          <p className="text-stone-400 text-sm">The requested bill receipt could not be located.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 text-stone-950 font-bold text-sm">
            <ArrowLeft size={16} /> Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-8 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-stone-900 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center border-b border-amber-400/20 pb-5">
          <img src="/logo.png" alt="Aamrai Resort Logo" className="w-20 h-20 object-contain rounded-full bg-white p-1 shadow-xl border border-amber-400/50 mx-auto mb-3" />
          <h1 className="font-serif text-3xl font-bold text-amber-100">{BUSINESS_INFO.name}</h1>
          <p className="text-amber-300/80 text-xs italic">{BUSINESS_INFO.tagline}</p>
          <p className="text-stone-400 text-[11px] mt-1 flex items-center justify-center gap-1">
            <MapPin size={12} className="text-amber-400" /> {BUSINESS_INFO.location}, Satara
          </p>
          <p className="text-stone-400 text-[11px] flex items-center justify-center gap-1">
            <Phone size={12} className="text-amber-400" /> GSTIN: {mockSettings.gst_number}
          </p>
        </div>

        {/* Bill Metadata Bar */}
        <div className="rounded-2xl bg-stone-950 border border-amber-400/20 p-4 space-y-1.5 text-xs text-stone-300">
          <div className="flex justify-between">
            <span className="text-amber-300 font-bold font-mono">Bill No: {bill.bill_number}</span>
            <span className="font-bold">{formatDate(bill.created_at)}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer: <strong className="text-stone-100">{bill.customer_name}</strong></span>
            <span>{formatTime(bill.created_at)}</span>
          </div>
          {bill.table_number && (
            <div>Table No: <strong className="text-amber-200">{bill.table_number}</strong></div>
          )}
        </div>

        {/* Items List */}
        <div>
          <h3 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2">Dishes Ordered</h3>
          <div className="space-y-2 border-b border-amber-400/20 pb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-stone-200">{item.name} <strong className="text-amber-300">x{item.quantity}</strong></span>
                <span className="font-mono text-amber-200 font-bold">{formatCurrency(item.total)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calculations & Total */}
        <div className="space-y-2 text-xs sm:text-sm text-stone-300">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono font-bold text-amber-200">{formatCurrency(bill.subtotal)}</span>
          </div>
          {bill.tax > 0 && (
            <>
              <div className="flex justify-between">
                <span>CGST (9%)</span>
                <span className="font-mono font-bold text-amber-200">{formatCurrency(bill.tax / 2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (9%)</span>
                <span className="font-mono font-bold text-amber-200">{formatCurrency(bill.tax / 2)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between items-center text-lg pt-3 border-t border-amber-400/20 font-serif">
            <span className="font-bold text-stone-100">Grand Total</span>
            <span className="font-extrabold text-amber-400 text-2xl">{formatCurrency(bill.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-3">
          <button
            onClick={() => downloadBillPDF(bill, items, mockSettings)}
            className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Download size={18} /> Download Official PDF Bill
          </button>
          <Link to="/" className="block text-center text-xs text-amber-300/80 hover:text-amber-200 font-bold">
            ← Visit Aamrai Resort Website
          </Link>
        </div>

      </div>
    </div>
  );
}
