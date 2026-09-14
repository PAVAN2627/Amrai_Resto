import { useState } from 'react';
import { UserCog, Plus, Trash2, X, Mail, User, ShieldCheck } from 'lucide-react';
import { getAllStaff, addStaff, deleteStaff, MockUser } from '@/lib/mockAuth';
import { useToast } from '@/context/ToastContext';

export function StaffManagement() {
  const [staff, setStaff] = useState<MockUser[]>(() => getAllStaff());
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'counter'>('counter');
  const { showToast } = useToast();

  const reload = () => setStaff(getAllStaff());

  const handleAdd = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('All fields are required', 'error');
      return;
    }
    const { error } = addStaff(name, email, password, role);
    if (error) {
      showToast(error, 'error');
      return;
    }
    showToast('Staff member added successfully', 'success');
    setName(''); setEmail(''); setPassword(''); setRole('counter');
    setShowForm(false);
    reload();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this staff member?')) return;
    const { error } = deleteStaff(id);
    if (error) {
      showToast(error, 'error');
      return;
    }
    showToast('Staff member removed', 'success');
    reload();
  };

  return (
    <div className="space-y-6 text-stone-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-amber-100 font-bold flex items-center gap-2">
            <UserCog size={28} className="text-amber-400" /> Staff Management
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-0.5">Manage admin and counter billing staff accounts</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition-all hover:scale-105"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-stone-900 border border-amber-400/20 shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-stone-950 text-amber-400 text-xs uppercase tracking-wider border-b border-amber-400/20">
            <tr>
              <th className="text-left p-4 font-bold">Staff Member</th>
              <th className="text-left p-4 font-bold">Email / Login</th>
              <th className="text-center p-4 font-bold">Role</th>
              <th className="text-center p-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-stone-800/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-800 border border-amber-400/30 text-amber-400 flex items-center justify-center font-serif text-base font-bold">
                      {s.name.charAt(0)}
                    </div>
                    <span className="font-bold text-stone-100">{s.name}</span>
                  </div>
                </td>
                <td className="p-4 text-stone-300 font-mono text-xs">{s.email}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    s.role === 'admin'
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {s.role}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-stone-900 border border-amber-400/30 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-scale-in text-stone-100" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5 border-b border-amber-400/10 pb-3">
              <h3 className="font-serif text-xl text-amber-100 font-bold flex items-center gap-2">
                <ShieldCheck className="text-amber-400" size={20} /> Add Staff Account
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1.5">Email / Username *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                    placeholder="staff@aamrairesort.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1.5">Password *</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none font-mono text-sm"
                  placeholder="Set account password"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-1.5">System Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRole('admin')}
                    className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                      role === 'admin'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Admin Access
                  </button>
                  <button
                    onClick={() => setRole('counter')}
                    className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                      role === 'counter'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Counter Billing
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm shadow-xl transition-all mt-2"
              >
                Create Staff Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
