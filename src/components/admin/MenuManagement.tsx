import { useState, useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { Flame, Star, Leaf, Drumstick, Plus, Pencil, Trash2, Eye, EyeOff, X, History, Utensils } from 'lucide-react';
import { mockMenuItems } from '@/lib/mockData';
import { formatCurrency } from '@/lib/constants';
import { useToast } from '@/context/ToastContext';

const MENU_CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Starters', 'Main Course', 'Rice', 'Biryani', 'Roti / Bread', 'Chinese', 'South Indian', 'Beverages', 'Specials'];

export function MenuManagement() {
  const [items, setItems] = useState(() => mockMenuItems.map((i) => ({ ...i })));
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<typeof items[0] | null>(null);
  const [historyItem, setHistoryItem] = useState<typeof items[0] | null>(null);
  const [history, setHistory] = useState<{ old_price: number; new_price: number; changed_by: string; changed_at: string }[]>([]);
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '', description: '', category: 'Starters', is_veg: true, price: '', image_url: '',
    is_available: true, is_special: false, is_featured: false, is_bar_item: false,
  });

  const openAdd = () => {
    setEditingItem(null);
    setForm({ name: '', description: '', category: 'Starters', is_veg: true, price: '', image_url: '', is_available: true, is_special: false, is_featured: false, is_bar_item: false });
    setShowForm(true);
  };

  const openEdit = (item: typeof items[0]) => {
    setEditingItem(item);
    setForm({ name: item.name, description: item.description, category: item.category, is_veg: item.is_veg, price: String(item.price), image_url: item.image_url, is_available: item.is_available, is_special: item.is_special, is_featured: item.is_featured, is_bar_item: item.is_bar_item });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { showToast('Dish name is required', 'error'); return; }
    const price = parseFloat(form.price) || 0;

    if (editingItem) {
      if (price !== editingItem.price) {
        setHistory((prev) => [{ old_price: editingItem.price, new_price: price, changed_by: 'Admin', changed_at: new Date().toISOString() }, ...prev]);
      }
      setItems(items.map((i) => i.id === editingItem.id ? { ...i, ...form, price, updated_at: new Date().toISOString() } : i));
      showToast('Dish updated', 'success');
    } else {
      const newItem = { ...form, price, id: String(Date.now()), sort_order: items.length, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      setItems([...items, newItem]);
      showToast('Dish added', 'success');
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this dish?')) return;
    setItems(items.filter((i) => i.id !== id));
    showToast('Dish deleted', 'success');
  };

  const toggleSpecial = (id: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, is_special: !i.is_special } : i));
  };

  const toggleAvailable = (id: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, is_available: !i.is_available } : i));
  };

  const showHistory = (item: typeof items[0]) => {
    setHistoryItem(item);
    setHistory(item.price > 0 ? [{ old_price: item.price - 20, new_price: item.price, changed_by: 'Admin', changed_at: new Date().toISOString() }] : []);
  };

  return (
    <div className="space-y-6 text-stone-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-amber-100 font-bold flex items-center gap-2">
            <Utensils size={28} className="text-amber-400" /> Menu Items Management
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-0.5">Add, edit, change prices, and set today's special delicacies</p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition-all hover:scale-105"
        >
          <Plus size={18} /> Add New Dish
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-stone-900 border border-amber-400/20 shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-stone-950 text-amber-400 text-xs uppercase tracking-wider border-b border-amber-400/20">
            <tr>
              <th className="text-left p-3 font-bold">Image</th>
              <th className="text-left p-3 font-bold">Dish Name</th>
              <th className="text-left p-3 font-bold hidden md:table-cell">Category</th>
              <th className="text-left p-3 font-bold">Veg/Non-Veg</th>
              <th className="text-right p-3 font-bold">Price</th>
              <th className="text-center p-3 font-bold hidden sm:table-cell">Available</th>
              <th className="text-center p-3 font-bold">Special</th>
              <th className="text-right p-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-stone-800/50 transition-colors">
                <td className="p-3">
                  <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-amber-400/20" loading="lazy" />
                </td>
                <td className="p-3">
                  <p className="font-bold text-stone-100 text-sm">{item.name}</p>
                  <p className="text-xs text-stone-400 line-clamp-1 max-w-xs">{item.description}</p>
                </td>
                <td className="p-3 hidden md:table-cell text-amber-300 text-xs font-bold">{item.category}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.is_veg ? 'bg-emerald-600 text-white' : 'bg-red-700 text-white'}`}>
                    {item.is_veg ? 'Veg' : 'Non-Veg'}
                  </span>
                </td>
                <td className="p-3 text-right font-extrabold text-amber-400 text-base">{formatCurrency(item.price)}</td>
                <td className="p-3 hidden sm:table-cell text-center">
                  <button onClick={() => toggleAvailable(item.id)} className={`p-1.5 rounded-lg ${item.is_available ? 'text-emerald-400 hover:bg-stone-800' : 'text-stone-600 hover:bg-stone-800'}`}>
                    {item.is_available ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => toggleSpecial(item.id)} className={`p-1.5 rounded-lg ${item.is_special ? 'text-amber-400' : 'text-stone-600'}`}>
                    <Star size={16} fill={item.is_special ? 'currentColor' : 'none'} />
                  </button>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button onClick={() => showHistory(item)} className="p-1.5 rounded-lg text-amber-300 hover:bg-stone-800" title="Price History"><History size={15} /></button>
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-amber-400 hover:bg-stone-800" title="Edit"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-stone-800" title="Delete"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowForm(false)}>
          <div className="bg-stone-900 border border-amber-400/30 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in text-stone-100" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-stone-900 p-5 border-b border-amber-400/20 flex items-center justify-between z-10">
              <h3 className="font-serif text-xl text-amber-100 font-bold">{editingItem ? 'Edit Dish Details' : 'Add New Menu Item'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400 hover:text-stone-100"><X size={20} /></button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Dish Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="e.g. Satara Mutton Handi" />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" rows={2} placeholder="Dish details..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-3 rounded-xl border border-stone-700 bg-stone-950 text-amber-100 font-bold focus:border-amber-400 focus:outline-none">
                    {MENU_CATEGORIES.filter((c) => c !== 'All' && c !== 'Veg' && c !== 'Non-Veg').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Price (₹) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-amber-400 font-extrabold font-mono text-base focus:border-amber-400 focus:outline-none" placeholder="280" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Image URL</label>
                <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="https://..." />
                {form.image_url && <img src={form.image_url} alt="Preview" className="mt-2 w-20 h-20 rounded-lg object-cover border border-amber-400/30" />}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-stone-200"><input type="checkbox" checked={form.is_veg} onChange={(e) => setForm({ ...form, is_veg: e.target.checked })} className="rounded accent-amber-400" /> Vegetarian</label>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-200"><input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} className="rounded accent-amber-400" /> Available</label>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-200"><input type="checkbox" checked={form.is_special} onChange={(e) => setForm({ ...form, is_special: e.target.checked })} className="rounded accent-amber-400" /> Today's Special</label>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-200"><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="rounded accent-amber-400" /> Featured</label>
              </div>

              <button onClick={handleSave} className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all mt-2">
                {editingItem ? 'Update Dish Details' : 'Save New Dish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {historyItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setHistoryItem(null)}>
          <div className="bg-stone-900 border border-amber-400/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-scale-in text-stone-100" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 border-b border-amber-400/20 pb-3">
              <h3 className="font-serif text-xl text-amber-100 font-bold">Price History: {historyItem.name}</h3>
              <button onClick={() => setHistoryItem(null)} className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400"><X size={18} /></button>
            </div>
            
            {history.length === 0 ? <p className="text-center text-stone-500 py-8">No price changes recorded</p> : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-amber-400/20">
                    <span className="text-sm font-bold text-amber-400">{formatCurrency(h.old_price)} → {formatCurrency(h.new_price)}</span>
                    <div className="text-right"><p className="text-xs text-stone-400">{new Date(h.changed_at).toLocaleDateString('en-IN')}</p><p className="text-[10px] text-stone-500">{h.changed_by}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
