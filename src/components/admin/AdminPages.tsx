import { useState } from 'react';
import { mockGalleryImages, mockEvents, mockRooms, mockSettings } from '@/lib/mockData';
import { useToast } from '@/context/ToastContext';
import { Trash2, Plus, X, Pencil, Image as ImageIcon, PartyPopper, Settings as SettingsIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/constants';

const GALLERY_CATEGORIES = ['Resort & Garden', 'Restaurant', 'Property', 'Events', 'Evening Ambience', 'Parking', 'EV Charging'];

export function GalleryManagement() {
  const [images, setImages] = useState(() => [...mockGalleryImages]);
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Resort & Garden');
  const { showToast } = useToast();

  const handleAdd = () => {
    if (!url.trim()) { showToast('Enter an image URL', 'error'); return; }
    setImages([...images, { id: String(Date.now()), url, category, sort_order: images.length, created_at: '' }]);
    showToast('Image added', 'success');
    setUrl(''); setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this image?')) return;
    setImages(images.filter((i) => i.id !== id));
    showToast('Image deleted', 'success');
  };

  const handleCategoryChange = (imgId: string, newCat: string) => {
    setImages(images.map((i) => i.id === imgId ? { ...i, category: newCat } : i));
  };

  return (
    <div className="space-y-6 text-stone-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-amber-100 font-bold flex items-center gap-2">
            <ImageIcon size={28} className="text-amber-400" /> Resort Gallery Management
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-0.5">Upload photos, organize categories, and manage public resort gallery</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition-all hover:scale-105"
        >
          <Plus size={18} /> Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative rounded-2xl overflow-hidden border border-amber-400/20 shadow-xl bg-stone-900">
            <img src={img.url} alt={img.category} className="w-full h-40 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
              <select
                value={img.category}
                onChange={(e) => handleCategoryChange(img.id, e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-xl bg-stone-900 border border-amber-400/30 text-amber-300 font-bold mb-1"
              >
                {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => handleDelete(img.id)} className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500 shadow-md">
                <Trash2 size={16} />
              </button>
            </div>
            <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-sm border border-amber-400/30 text-amber-300 text-[10px] font-bold">
              {img.category}
            </span>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-stone-900 border border-amber-400/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-scale-in text-stone-100" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 border-b border-amber-400/20 pb-3">
              <h3 className="font-serif text-xl text-amber-100 font-bold">Add Resort Gallery Photo</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Image URL *</label>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" placeholder="https://..." />
                {url && <img src={url} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-xl border border-amber-400/30" />}
              </div>
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-amber-300 font-bold focus:border-amber-400 focus:outline-none">
                  {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all">Add Image to Gallery</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function EventsAdmin() {
  const [packages, setPackages] = useState(() => mockEvents.map((e) => ({ ...e })));
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', capacity: '', description: '', starting_price: '', image_url: '', amenities: '', availability: '' });
  const { showToast } = useToast();

  const resetForm = () => {
    setForm({ name: '', capacity: '', description: '', starting_price: '', image_url: '', amenities: '', availability: '' });
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.name) { showToast('Event name required', 'error'); return; }
    if (editingId) {
      setPackages(packages.map((p) => p.id === editingId ? {
        ...p,
        name: form.name,
        capacity: form.capacity,
        description: form.description,
        starting_price: parseFloat(form.starting_price) || 0,
        image_url: form.image_url,
        amenities: form.amenities,
        availability: form.availability,
      } : p));
      showToast('Package updated', 'success');
    } else {
      setPackages([...packages, {
        id: String(Date.now()),
        name: form.name,
        capacity: form.capacity,
        description: form.description,
        starting_price: parseFloat(form.starting_price) || 0,
        image_url: form.image_url,
        amenities: form.amenities,
        availability: form.availability,
        contact: '7030926868',
        created_at: '',
      }]);
      showToast('Package added', 'success');
    }
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (pkg: typeof packages[0]) => {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      capacity: pkg.capacity,
      description: pkg.description,
      starting_price: String(pkg.starting_price),
      image_url: pkg.image_url,
      amenities: pkg.amenities,
      availability: pkg.availability,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this package?')) return;
    setPackages(packages.filter((p) => p.id !== id));
    showToast('Package deleted', 'success');
  };

  return (
    <div className="space-y-6 text-stone-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-amber-100 font-bold flex items-center gap-2">
            <PartyPopper size={28} className="text-amber-400" /> Event Lawns & Packages
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-0.5">Manage wedding lawns, mehendi packages, and corporate pricing</p>
        </div>

        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition-all hover:scale-105"
        >
          <Plus size={18} /> Add Event Package
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="rounded-2xl overflow-hidden bg-stone-900 border border-amber-400/20 shadow-xl flex flex-col justify-between">
            <div>
              <img src={pkg.image_url} alt={pkg.name} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="font-serif text-xl text-amber-100 font-bold">{pkg.name}</h3>
                <p className="text-xs text-amber-300 font-semibold mt-1">{pkg.capacity}</p>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed line-clamp-3">{pkg.description}</p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex items-center justify-between pt-3 border-t border-amber-400/10">
                <span className="font-serif text-xl text-amber-400 font-extrabold">{formatCurrency(pkg.starting_price)}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(pkg)} className="p-2 rounded-lg bg-stone-800 text-amber-400 border border-amber-400/30 hover:bg-stone-700"><Pencil size={15} /></button>
                  <button onClick={() => handleDelete(pkg.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => { setShowForm(false); resetForm(); }}>
          <div className="bg-stone-900 border border-amber-400/30 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-scale-in text-stone-100" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 border-b border-amber-400/20 pb-3">
              <h3 className="font-serif text-xl text-amber-100 font-bold">{editingId ? 'Edit Event Package' : 'Add Event Package'}</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Event Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" />
              <input type="text" placeholder="Capacity (e.g. Up to 500 guests)" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Starting Price (₹)" value={form.starting_price} onChange={(e) => setForm({ ...form, starting_price: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-amber-400 font-extrabold font-mono text-base focus:border-amber-400 focus:outline-none" />
                <input type="text" placeholder="Availability" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" />
              </div>
              <input type="text" placeholder="Amenities (comma separated)" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" />
              <input type="url" placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" />
              <button onClick={handleSave} className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all">{editingId ? 'Update Package' : 'Save Event Package'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SettingsAdmin() {
  const [settings, setSettings] = useState(() => ({ ...mockSettings }));
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = () => {
    setSaving(true);
    Object.assign(mockSettings, settings);
    setTimeout(() => {
      showToast('Settings saved', 'success');
      setSaving(false);
    }, 500);
  };

  const field = (label: string, key: string, type = 'text') => (
    <div>
      <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">{label}</label>
      <input type={type} value={String(settings[key as keyof typeof settings] || '')} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" />
    </div>
  );

  return (
    <div className="space-y-6 text-stone-100">
      <h2 className="font-serif text-3xl text-amber-100 font-bold flex items-center gap-2">
        <SettingsIcon size={28} className="text-amber-400" /> Business Settings
      </h2>

      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-6 space-y-4 shadow-xl">
        <h3 className="font-serif text-xl text-amber-100 font-bold border-b border-amber-400/10 pb-3">Resort Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {field('Restaurant Name', 'restaurant_name')}
          {field('Tagline', 'tagline')}
          {field('Phone', 'phone')}
          {field('WhatsApp', 'whatsapp')}
          {field('Email', 'email', 'email')}
          {field('Opening Hours', 'opening_hours')}
        </div>
        <div>
          <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Address</label>
          <textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" rows={2} />
        </div>
        <div>
          <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Bill Footer Message</label>
          <textarea value={settings.bill_footer} onChange={(e) => setSettings({ ...settings, bill_footer: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none" rows={2} />
        </div>
      </div>

      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-6 space-y-4 shadow-xl">
        <h3 className="font-serif text-xl text-amber-100 font-bold border-b border-amber-400/10 pb-3">Tax & Billing Configuration</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-bold text-stone-200">
            <input type="checkbox" checked={settings.tax_enabled} onChange={(e) => setSettings({ ...settings, tax_enabled: e.target.checked })} className="rounded accent-amber-400" />
            Enable Tax (GST) Calculation on POS Bills
          </label>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1">Tax Percentage (%)</label>
            <input type="number" value={String(settings.tax_percentage)} onChange={(e) => setSettings({ ...settings, tax_percentage: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-amber-400 font-extrabold font-mono text-base focus:border-amber-400 focus:outline-none" />
          </div>
          {field('GST Number', 'gst_number')}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all">
        {saving ? 'Saving Settings...' : 'Save Settings'}
      </button>
    </div>
  );
}

export function SimpleAdmin({ title, icon: Icon, message }: { title: string; icon: any; message: string }) {
  return (
    <div className="space-y-4 text-stone-100">
      <h2 className="font-serif text-3xl text-amber-100 font-bold flex items-center gap-2"><Icon size={28} className="text-amber-400" /> {title}</h2>
      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-12 text-center shadow-xl">
        <Icon size={48} className="mx-auto mb-3 text-amber-400 opacity-60" />
        <p className="text-stone-300 font-medium">{message}</p>
      </div>
    </div>
  );
}
