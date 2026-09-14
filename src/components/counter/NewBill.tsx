import { useState, useMemo } from 'react';
import { Search, Plus, Minus, Trash2, X, CreditCard, Smartphone, Banknote, Wallet, FileText, MessageCircle, Leaf, Drumstick, ShoppingBag } from 'lucide-react';
import type { MenuItem, CartItem, Bill, BillItem } from '@/types';
import { formatCurrency, validateIndianMobile, formatWhatsAppMobile, WHATSAPP_BASE } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { downloadBillPDF, generateBillPDF } from '@/lib/pdf';
import { sendAutoWhatsAppBillPDF } from '@/lib/whatsappService';
import { mockMenuItems, mockSettings, mockBills } from '@/lib/mockData';

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: Banknote },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'other', label: 'Other', icon: Wallet },
] as const;

export function NewBill({ onBillSaved }: { onBillSaved: () => void }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card' | 'other'>('cash');
  const [discount, setDiscount] = useState('');
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();
  const settings = mockSettings;

  const items = useMemo(() => mockMenuItems.filter((i) => i.is_available && !i.is_bar_item).sort((a, b) => a.sort_order - b.sort_order), []);

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category))];
    return ['All', ...cats];
  }, [items]);

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) => (c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.menuItem.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.menuItem.id !== id));

  const subtotal = cart.reduce((sum, c) => sum + c.menuItem.price * c.quantity, 0);
  const discountAmount = parseFloat(discount) || 0;
  const taxEnabled = settings?.tax_enabled || false;
  const taxRate = settings?.tax_percentage || 0;
  const taxAmount = taxEnabled ? ((subtotal - discountAmount) * taxRate) / 100 : 0;
  const grandTotal = subtotal - discountAmount + taxAmount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Cart is empty', 'error');
      return;
    }
    setShowCheckout(true);
  };

  const handleSave = async (action: 'pdf' | 'whatsapp') => {
    if (!customerName.trim()) {
      showToast('Customer name is required', 'error');
      return;
    }
    if (!validateIndianMobile(customerMobile)) {
      showToast('Enter a valid 10-digit Indian mobile number', 'error');
      return;
    }
    setSaving(true);

    const maxNum = mockBills.reduce((max, b) => {
      const m = b.bill_number.match(/AR-(\d+)/);
      return m ? Math.max(max, parseInt(m[1])) : max;
    }, 0);
    const billNumber = `AR-${String(maxNum + 1).padStart(6, '0')}`;

    const billItems: BillItem[] = cart.map((c, i) => ({
      id: `${billNumber}-item-${i}`,
      bill_id: billNumber,
      menu_item_id: c.menuItem.id,
      name: c.menuItem.name,
      price_at_purchase: c.menuItem.price,
      quantity: c.quantity,
      total: c.menuItem.price * c.quantity,
    }));

    const newBill: Bill = {
      id: billNumber,
      bill_number: billNumber,
      customer_name: customerName,
      customer_mobile: customerMobile,
      table_number: tableNumber,
      num_guests: parseInt(numGuests) || 0,
      special_notes: specialNotes,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total: grandTotal,
      payment_method: paymentMethod,
      status: 'paid',
      counter_user_id: user?.id || null,
      counter_user_name: user?.name || 'Staff',
      created_at: new Date().toISOString(),
      bill_items: billItems,
    };

    mockBills.unshift(newBill);

    if (action === 'pdf') {
      downloadBillPDF(newBill, billItems, settings);
      showToast(`Bill ${billNumber} saved & PDF downloaded`, 'success');
    }

    if (action === 'whatsapp') {
      const res = await sendAutoWhatsAppBillPDF(newBill, billItems, settings);
      showToast(res.message, res.success ? 'success' : 'error');
    }

    setSaving(false);
    resetForm();
    onBillSaved();
  };

  const resetForm = () => {
    setCart([]);
    setCustomerName('');
    setCustomerMobile('');
    setTableNumber('');
    setNumGuests('');
    setSpecialNotes('');
    setDiscount('');
    setPaymentMethod('cash');
    setShowCheckout(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] text-stone-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dish or category..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-amber-400/30 bg-stone-900 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none text-lg font-medium shadow-inner"
              autoFocus
            />
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-stone-950 shadow-md scale-105'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-amber-400/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="group rounded-xl overflow-hidden bg-stone-900 border border-amber-400/20 text-left hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="relative h-24 overflow-hidden">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <span className={`absolute top-1.5 left-1.5 inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.is_veg ? 'bg-emerald-600 text-white' : 'bg-red-700 text-white'
                }`}>
                  {item.is_veg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>
              <div className="p-2.5">
                <p className="font-bold text-amber-100 text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-amber-300">{item.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-amber-400 font-extrabold text-sm sm:text-base">{formatCurrency(item.price)}</span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-stone-950 group-hover:bg-amber-300 transition-colors font-bold">
                    <Plus size={14} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone-500">
            <Search size={48} className="mx-auto mb-3 opacity-30" />
            <p>No dishes found</p>
          </div>
        )}
      </div>

      <div className="lg:w-96 bg-stone-900 border-t lg:border-t-0 lg:border-l border-amber-400/20 flex flex-col max-h-[50vh] lg:max-h-none shadow-2xl">
        <div className="p-4 border-b border-amber-400/20 flex items-center justify-between">
          <h3 className="font-serif text-lg text-amber-100 font-bold flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-400" /> Current Bill
          </h3>
          {cart.length > 0 && (
            <button onClick={resetForm} className="text-xs text-red-400 hover:text-red-300 font-bold">Clear All</button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <ShoppingBag size={36} className="mx-auto mb-2 opacity-30 text-amber-400" />
              <p className="text-xs font-semibold">Tap dishes on the left to add to bill</p>
            </div>
          ) : (
            cart.map((c) => (
              <div key={c.menuItem.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-950 border border-amber-400/15">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-stone-100 truncate">{c.menuItem.name}</p>
                  <p className="text-xs text-amber-400 font-semibold">{formatCurrency(c.menuItem.price)} each</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => updateQty(c.menuItem.id, -1)} className="w-7 h-7 rounded-full bg-stone-800 text-amber-400 border border-amber-400/30 flex items-center justify-center hover:bg-stone-700">
                    <Minus size={13} />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-amber-100">{c.quantity}</span>
                  <button onClick={() => updateQty(c.menuItem.id, 1)} className="w-7 h-7 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center hover:bg-amber-300 font-bold">
                    <Plus size={13} />
                  </button>
                  <button onClick={() => removeFromCart(c.menuItem.id)} className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 ml-1">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-amber-400/20 space-y-3 bg-stone-950">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-stone-400">Subtotal</span>
              <span className="font-bold text-amber-200">{formatCurrency(subtotal)}</span>
            </div>
            {taxEnabled && taxAmount > 0 && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-stone-400">Tax ({taxRate}%)</span>
                <span className="font-bold text-amber-200">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-lg pt-1 border-t border-stone-800">
              <span className="font-serif text-stone-100 font-bold">Total Amount</span>
              <span className="font-serif text-amber-400 font-extrabold text-2xl">{formatCurrency(grandTotal)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>

      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-stone-900 border border-amber-400/30 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-in-right text-stone-100">
            <div className="sticky top-0 bg-stone-900 p-4 border-b border-amber-400/20 flex items-center justify-between z-10">
              <h3 className="font-serif text-xl text-amber-100 font-bold">Complete & Save Bill</h3>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-stone-800 rounded-full text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="rounded-xl bg-stone-950 p-4 border border-amber-400/20">
                <div className="flex justify-between text-xs text-stone-300 mb-1">
                  <span>Subtotal</span>
                  <span className="font-bold text-amber-200">{formatCurrency(subtotal)}</span>
                </div>
                {taxEnabled && taxAmount > 0 && (
                  <>
                    <div className="flex justify-between text-xs text-stone-300 mb-1">
                      <span>CGST (9%)</span>
                      <span className="font-bold text-amber-200">{formatCurrency(taxAmount / 2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-300 mb-1">
                      <span>SGST (9%)</span>
                      <span className="font-bold text-amber-200">{formatCurrency(taxAmount / 2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-xl font-serif pt-2 border-t border-stone-800 mt-1">
                  <span className="text-stone-100 font-bold">Grand Total</span>
                  <span className="text-amber-400 font-extrabold">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Customer Name *</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="Enter customer name" />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Mobile Number *</label>
                <input type="tel" value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 font-mono text-sm placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="10-digit mobile number" maxLength={10} />
                {customerMobile && !validateIndianMobile(customerMobile) && (
                  <p className="text-red-400 text-xs mt-1">Enter a valid 10-digit Indian mobile number</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Table No.</label>
                  <input type="text" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Guests</label>
                  <input type="number" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="Optional" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Special Notes</label>
                <textarea value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" rows={2} placeholder="Optional" />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Discount (₹)</label>
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 font-mono text-sm placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="0" />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">Payment Method</label>
                <div className="grid grid-cols-4 gap-2">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-all ${
                        paymentMethod === pm.id
                          ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-bold'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <pm.icon size={18} />
                      <span className="text-xs font-bold">{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => handleSave('pdf')}
                  disabled={saving}
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <FileText size={18} /> {saving ? 'Saving...' : 'Save & Print Bill PDF'}
                </button>
                <button
                  onClick={() => handleSave('whatsapp')}
                  disabled={saving}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <MessageCircle size={18} /> Save & Send on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
