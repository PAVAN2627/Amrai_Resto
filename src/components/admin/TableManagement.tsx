import { useState, useRef } from 'react';
import { Plus, QrCode, Trash2, Download, Eye, EyeOff, AlertCircle } from 'lucide-react';
import type { Table } from '@/types';
import { mockTables } from '@/lib/mockData';

export function TableManagement() {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [newTableNum, setNewTableNum] = useState('');
  const [newCapacity, setNewCapacity] = useState('2');
  const [showQRModal, setShowQRModal] = useState<string | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR Code using canvas (simple implementation)
  const generateQRCode = async (text: string, canvasEl: HTMLCanvasElement) => {
    try {
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const ctx = canvasEl.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (error) {
      console.error('QR code generation error:', error);
    }
  };

  const handleAddTable = () => {
    if (!newTableNum.trim() || !newCapacity) return;

    const tableId = `t${tables.length + 1}`;
    const qrLink = `${window.location.origin}/table/${tableId}`;
    
    const newTable: Table = {
      id: tableId,
      table_number: newTableNum,
      capacity: parseInt(newCapacity),
      qr_code: qrLink,
      status: 'available',
      created_at: new Date().toISOString(),
    };

    setTables([...tables, newTable]);
    setNewTableNum('');
    setNewCapacity('2');
  };

  const handleDeleteTable = (id: string) => {
    if (confirm('Delete this table? This action cannot be undone.')) {
      setTables(tables.filter((t) => t.id !== id));
    }
  };

  const handlePrintQR = (table: Table) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Table ${table.table_number} QR Code</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
              .qr-container { margin: 20px auto; padding: 20px; border: 2px solid #333; }
              img { max-width: 400px; }
              h2 { margin-top: 0; }
              .info { margin-top: 20px; font-size: 14px; color: #666; }
            </style>
          </head>
          <body>
            <h2>Aamrai Resort - Table ${table.table_number}</h2>
            <div class="qr-container">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(table.qr_code)}" alt="QR Code" />
            </div>
            <div class="info">
              <p>Capacity: ${table.capacity} persons</p>
              <p>Scan to order food online</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
    }
  };

  const handleDownloadQR = (table: Table) => {
    const link = document.createElement('a');
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(table.qr_code)}`;
    link.download = `table-${table.table_number}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-stone-900 border border-amber-400/30 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl text-amber-50 font-bold mb-1">Table Management</h2>
            <p className="text-stone-400 text-sm">Create tables and generate QR codes for online ordering</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-stone-800 border border-amber-400/30 flex items-center justify-center">
            <QrCode className="text-amber-400" size={24} />
          </div>
        </div>
      </div>

      {/* Add New Table Form */}
      <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-6 shadow-xl">
        <h3 className="font-serif text-xl text-amber-100 font-bold mb-4">Add New Table</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">Table Number</label>
            <input
              type="text"
              value={newTableNum}
              onChange={(e) => setNewTableNum(e.target.value)}
              placeholder="e.g., 1, 2, A1, VIP-1"
              className="w-full px-4 py-3 rounded-md border border-stone-700 bg-stone-950 text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">Capacity (Persons)</label>
            <select
              value={newCapacity}
              onChange={(e) => setNewCapacity(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-stone-700 bg-stone-950 text-stone-100 focus:border-amber-400 focus:outline-none"
            >
              <option value="2">2 persons</option>
              <option value="4">4 persons</option>
              <option value="6">6 persons</option>
              <option value="8">8 persons</option>
              <option value="10">10+ persons</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddTable}
              disabled={!newTableNum.trim()}
              className="w-full py-3 rounded-md bg-amber-400 hover:bg-amber-300 disabled:bg-stone-700 disabled:text-stone-500 text-stone-950 font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Table
            </button>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div key={table.id} className="rounded-2xl bg-stone-900 border border-amber-400/20 p-5 shadow-xl hover:border-amber-400/50 transition-all">
            {/* Table Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-serif text-2xl text-amber-100 font-bold">Table {table.table_number}</h4>
                <p className="text-xs text-stone-400 mt-1">Capacity: {table.capacity} persons</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                table.status === 'occupied'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {table.status === 'occupied' ? 'Occupied' : 'Available'}
              </span>
            </div>

            {/* QR Code Preview */}
            <div className="mb-4 p-3 rounded-lg bg-stone-950 border border-amber-400/10 flex items-center justify-center h-32">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(table.qr_code)}`}
                alt={`QR Code for Table ${table.table_number}`}
                className="w-24 h-24"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => setShowQRModal(table.id)}
                className="w-full py-2.5 rounded-md bg-stone-950 hover:bg-stone-800 border border-amber-400/30 text-amber-300 hover:text-amber-100 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Eye size={16} /> View QR Code
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handlePrintQR(table)}
                  className="py-2 rounded-md bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <QrCode size={14} /> Print
                </button>
                <button
                  onClick={() => handleDownloadQR(table)}
                  className="py-2 rounded-md bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Download size={14} /> Download
                </button>
              </div>
              <button
                onClick={() => handleDeleteTable(table.id)}
                className="w-full py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> Delete Table
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Card */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-stone-900 border border-amber-400/20 p-5 text-center">
          <p className="text-3xl font-bold text-amber-400">{tables.length}</p>
          <p className="text-xs text-stone-400 mt-1">Total Tables</p>
        </div>
        <div className="rounded-2xl bg-stone-900 border border-emerald-500/20 p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">{tables.filter((t) => t.status === 'available').length}</p>
          <p className="text-xs text-stone-400 mt-1">Available</p>
        </div>
        <div className="rounded-2xl bg-stone-900 border border-red-500/20 p-5 text-center">
          <p className="text-3xl font-bold text-red-400">{tables.filter((t) => t.status === 'occupied').length}</p>
          <p className="text-xs text-stone-400 mt-1">Occupied</p>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="font-serif text-2xl text-amber-100 font-bold mb-6 text-center">
              Table {tables.find((t) => t.id === showQRModal)?.table_number}
            </h3>
            
            <div className="bg-white p-6 rounded-lg flex items-center justify-center mb-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                  tables.find((t) => t.id === showQRModal)?.qr_code || ''
                )}`}
                alt="QR Code"
                className="w-full"
              />
            </div>

            <div className="bg-stone-950 border border-amber-400/10 rounded-lg p-4 mb-6 text-center">
              <p className="text-xs text-stone-400 mb-2">Capacity: {tables.find((t) => t.id === showQRModal)?.capacity} persons</p>
              <p className="text-xs text-stone-300 font-mono break-all">
                {tables.find((t) => t.id === showQRModal)?.qr_code}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handlePrintQR(tables.find((t) => t.id === showQRModal)!)}
                className="flex-1 py-3 rounded-md bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <QrCode size={16} /> Print QR
              </button>
              <button
                onClick={() => setShowQRModal(null)}
                className="flex-1 py-3 rounded-md bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-100 font-bold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
