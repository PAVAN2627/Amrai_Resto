import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, Phone, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { MenuItem, TableOrder, TableOrderItem } from '@/types';
import { mockMenuItems, mockTableOrders, mockTables } from '@/lib/mockData';
import { formatCurrency, validateIndianMobile } from '@/lib/constants';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export function TableOrderPage() {
  const { tableId } = useParams<{ tableId: string }>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState('');

  const table = mockTables.find((t) => t.id === tableId);
  const currentOrder = mockTableOrders.find((o) => o.table_id === tableId);

  const categories = useMemo(() => {
    const cats = [...new Set(mockMenuItems.map((i) => i.category))];
    return ['All', ...cats];
  }, []);

  const items = useMemo(() => mockMenuItems.filter((i) => i.is_available && !i.is_bar_item).sort((a, b) => a.sort_order - b.sort_order), []);

  const filtered = items.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesCat;
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
  const tax = (subtotal * 0.18);
  const total = subtotal + tax;

  const handleSubmitOrder = () => {
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!validateIndianMobile(customerMobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    if (cart.length === 0) {
      alert('Please add items to your order');
      return;
    }

    // Simulate order submission
    const orderId = `to${Date.now()}`;
    setSubmittedOrderId(orderId);
    setOrderSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setOrderSubmitted(false);
      setCart([]);
      setCustomerName('');
      setCustomerMobile('');
      setNumGuests('');
      setSpecialNotes('');
      setShowCheckout(false);
    }, 5000);
  };

  if (!table) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-amber-50 font-bold mb-2">Invalid Table</h1>
          <p className="text-stone-400">This table QR code is not valid or has been removed.</p>
        </div>
      </div>
    );
  }

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-emerald-400 mx-auto mb-4 animate-bounce" />
          <h1 className="font-serif text-3xl text-amber-50 font-bold mb-2">Order Submitted!</h1>
          <p className="text-stone-300 mb-2">Your order has been sent to the kitchen.</p>
          <p className="text-xs text-stone-400 mb-6">Order ID: {submittedOrderId}</p>
          <div className="bg-stone-900 border border-amber-400/20 rounded-lg p-4 text-left mb-6">
            <p className="text-amber-300 font-bold mb-2">Order Details:</p>
            <p className="text-stone-300 text-sm">Name: {customerName}</p>
            <p className="text-stone-300 text-sm">Mobile: {customerMobile}</p>
            <p className="text-stone-300 text-sm">Guests: {numGuests || '—'}</p>
            <p className="text-stone-300 text-sm mt-2 font-semibold">Amount: {formatCurrency(total)}</p>
          </div>
          <p className="text-stone-400 text-sm">Your kitchen will prepare your order. You'll be notified when it's ready.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-stone-950 via-stone-950/95 to-transparent border-b border-amber-400/10 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-serif text-2xl text-amber-50 font-bold">Table {table.table_number}</h1>
              <p className="text-xs text-stone-400">Capacity: {table.capacity} persons</p>
            </div>
            <div className="text-right">
              <p className="text-amber-400 font-bold text-sm">Aamrai Resort</p>
              <p className="text-xs text-stone-400">Online Ordering</p>
            </div>
          </div>

          {/* Current Order Status */}
          {currentOrder && (
            <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-3 text-xs">
              <p className="text-amber-300 font-bold mb-1">Active Order</p>
              <p className="text-stone-300">
                You have {currentOrder.items.length} item(s) already ordered. Total: {formatCurrency(currentOrder.total)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {!showCheckout ? (
          <>
            {/* Categories */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-amber-400 text-stone-950 shadow-md scale-105'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-amber-400/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filtered.map((item) => {
                const inCart = cart.find((c) => c.menuItem.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="rounded-lg bg-stone-900 border border-amber-400/20 hover:border-amber-400/60 overflow-hidden shadow-lg transition-all"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span
                          className={`inline-flex items-center justify-center px-2 py-1 rounded text-[10px] font-bold ${
                            item.is_veg ? 'bg-emerald-600 text-white' : 'bg-red-700 text-white'
                          }`}
                        >
                          {item.is_veg ? '● Veg' : '▲ Non-Veg'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="font-serif text-lg font-bold text-amber-100 mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-stone-400 mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 font-bold text-sm">{formatCurrency(item.price)}</span>
                        {inCart ? (
                          <div className="flex items-center gap-1 bg-stone-950 rounded-full border border-amber-400/30">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-6 h-6 rounded-full text-amber-400 flex items-center justify-center hover:bg-stone-800"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-amber-100">{inCart.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center hover:bg-amber-300"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center hover:bg-amber-300"
                          >
                            <Plus size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          // Checkout Form
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl text-amber-100 font-bold mb-6">Complete Your Order</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">Your Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-md border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none font-mono text-sm"
                  placeholder="10-digit mobile"
                />
                {customerMobile && !validateIndianMobile(customerMobile) && (
                  <p className="text-red-400 text-xs mt-1">Enter a valid 10-digit number</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">Number of Guests</label>
                  <input
                    type="number"
                    value={numGuests}
                    onChange={(e) => setNumGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">Special Notes</label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  rows={2}
                  placeholder="e.g., No onion, extra spicy, allergies, etc."
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-stone-900 border border-amber-400/20 rounded-lg p-4 mb-6 space-y-2">
              <h3 className="font-bold text-amber-100 mb-3">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between text-sm text-stone-300">
                  <span>{item.menuItem.name} × {item.quantity}</span>
                  <span>{formatCurrency(item.menuItem.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-stone-700 pt-2 mt-2">
                <div className="flex justify-between text-sm text-stone-300 mb-1">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-300">
                  <span>Tax (18%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>
              <div className="border-t border-stone-700 pt-2 mt-2 flex justify-between text-lg font-bold text-amber-400">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 py-3 rounded-md bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-100 font-bold text-sm transition-colors"
              >
                Back to Menu
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={!customerName.trim() || !validateIndianMobile(customerMobile) || cart.length === 0}
                className="flex-1 py-3 rounded-md bg-amber-400 hover:bg-amber-300 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} /> Place Order
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Order Button */}
      {!showCheckout && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950 to-transparent p-4">
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full py-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-lg shadow-2xl flex items-center justify-between px-6 transition-transform hover:scale-105"
          >
            <span>Review Order ({cart.length} items)</span>
            <span className="text-xl">{formatCurrency(subtotal + tax)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
