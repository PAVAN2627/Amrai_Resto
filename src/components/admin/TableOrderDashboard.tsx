import { useState, useMemo } from 'react';
import { Clock, CheckCircle, AlertCircle, ChefHat, UtensilsCrossed, Trash2, Eye, Filter, Plus } from 'lucide-react';
import type { TableOrder } from '@/types';
import { mockTableOrders } from '@/lib/mockData';
import { formatCurrency } from '@/lib/constants';

export function TableOrderDashboard() {
  const [orders, setOrders] = useState<TableOrder[]>(mockTableOrders);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'pending_payment'>('active');
  const [selectedOrder, setSelectedOrder] = useState<TableOrder | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredOrders = useMemo(() => {
    if (filterStatus === 'all') return orders;
    return orders.filter((o) => o.status === filterStatus);
  }, [orders, filterStatus]);

  const handleUpdateItemStatus = (orderId: string, itemId: string, newStatus: 'pending' | 'preparing' | 'ready' | 'served') => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)),
          };
        }
        return order;
      })
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)),
        };
      });
    }
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: 'completed', completed_at: new Date().toISOString() } : order))
    );
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Delete this order? This action cannot be undone.')) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setShowDetailModal(false);
      setSelectedOrder(null);
    }
  };

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-stone-700 text-stone-200';
      case 'preparing':
        return 'bg-orange-600/20 text-orange-300 border border-orange-600/30';
      case 'ready':
        return 'bg-blue-600/20 text-blue-300 border border-blue-600/30';
      case 'served':
        return 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30';
      default:
        return 'bg-stone-700 text-stone-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} />;
      case 'preparing':
        return <ChefHat size={14} />;
      case 'ready':
        return <UtensilsCrossed size={14} />;
      case 'served':
        return <CheckCircle size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-stone-900 border border-amber-400/30 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-3xl text-amber-50 font-bold mb-1">Table Orders Live</h2>
            <p className="text-stone-400 text-sm">Real-time order tracking and management</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-amber-400">{filteredOrders.length}</p>
            <p className="text-xs text-stone-400 mt-1">Active Orders</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'active', 'completed', 'pending_payment'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                filterStatus === status
                  ? 'bg-amber-400 text-stone-950 shadow-lg'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-700'
              }`}
            >
              {status === 'pending_payment' ? 'Pending Payment' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-stone-900 border border-stone-800">
          <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4 opacity-50" />
          <h3 className="font-serif text-2xl text-stone-400 font-bold mb-2">No Orders</h3>
          <p className="text-stone-500 text-sm">All orders are completed. Great job!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => {
            const allItemsReady = order.items.every((item) => item.status === 'ready' || item.status === 'served');
            const anyPending = order.items.some((item) => item.status === 'pending');

            return (
              <div
                key={order.id}
                className="rounded-2xl bg-stone-900 border border-amber-400/20 hover:border-amber-400/50 p-4 shadow-lg transition-all hover:shadow-xl"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-lg text-amber-100 font-bold">Table {order.table_number}</h3>
                    <p className="text-xs text-stone-400 mt-0.5">{order.customer_name}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                      order.status === 'active'
                        ? anyPending
                          ? 'bg-orange-600/20 text-orange-300 border border-orange-600/30'
                          : allItemsReady
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30'
                            : 'bg-amber-600/20 text-amber-300 border border-amber-600/30'
                        : order.status === 'completed'
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30'
                          : 'bg-red-600/20 text-red-300 border border-red-600/30'
                    }`}
                  >
                    {order.status === 'active' ? (
                      anyPending ? (
                        <>
                          <Clock size={11} /> Pending
                        </>
                      ) : allItemsReady ? (
                        <>
                          <UtensilsCrossed size={11} /> Ready
                        </>
                      ) : (
                        <>
                          <ChefHat size={11} /> Preparing
                        </>
                      )
                    ) : order.status === 'completed' ? (
                      <>
                        <CheckCircle size={11} /> Completed
                      </>
                    ) : (
                      <>
                        <AlertCircle size={11} /> Payment
                      </>
                    )}
                  </span>
                </div>

                {/* Order Items Summary */}
                <div className="mb-3 p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                  <p className="text-[11px] text-amber-300 font-bold mb-2">Items ({order.items.length})</p>
                  <div className="space-y-1.5">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <span className="text-stone-300 truncate">
                          {item.name} <span className="text-stone-500">×{item.quantity}</span>
                        </span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5 ${getItemStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span>{item.status}</span>
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-xs text-stone-500 italic">+{order.items.length - 3} more items</p>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div className="text-xs text-stone-400 mb-3 space-y-1 pb-3 border-b border-stone-800">
                  <p>Guests: {order.num_guests || '—'}</p>
                  <p>Mobile: {order.customer_mobile}</p>
                  {order.special_notes && <p>Note: {order.special_notes.substring(0, 30)}...</p>}
                </div>

                {/* Amount */}
                <div className="mb-3 pb-3 border-b border-stone-800">
                  <p className="text-amber-400 font-bold text-sm">{formatCurrency(order.total)}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetailModal(true);
                    }}
                    className="flex-1 py-2 rounded-md bg-stone-950 hover:bg-stone-800 border border-amber-400/30 text-amber-300 hover:text-amber-100 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye size={14} /> Details
                  </button>
                  <button
                    onClick={() => handleCompleteOrder(order.id)}
                    disabled={anyPending}
                    className="flex-1 py-2 rounded-md bg-emerald-600/20 hover:bg-emerald-600/30 disabled:bg-stone-800 disabled:text-stone-600 border border-emerald-600/30 disabled:border-stone-700 text-emerald-300 disabled:text-stone-500 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle size={14} /> Done
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-400/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-stone-900 border-b border-amber-400/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-amber-100 font-bold">Table {selectedOrder.table_number}</h2>
                  <p className="text-sm text-stone-400 mt-1">{selectedOrder.customer_name} • {selectedOrder.customer_mobile}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-stone-400 hover:text-stone-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-stone-950 border border-stone-800 rounded-lg p-4">
                <h3 className="font-bold text-amber-100 mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-stone-400">Name:</span> <span className="text-stone-200 font-medium">{selectedOrder.customer_name}</span>
                  </p>
                  <p>
                    <span className="text-stone-400">Mobile:</span> <span className="text-stone-200 font-medium">{selectedOrder.customer_mobile}</span>
                  </p>
                  <p>
                    <span className="text-stone-400">Guests:</span> <span className="text-stone-200 font-medium">{selectedOrder.num_guests || '—'}</span>
                  </p>
                  {selectedOrder.special_notes && (
                    <p>
                      <span className="text-stone-400">Notes:</span> <span className="text-amber-300 font-medium">{selectedOrder.special_notes}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items with Status Control */}
              <div>
                <h3 className="font-bold text-amber-100 mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="bg-stone-950 border border-stone-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-stone-100">{item.name}</p>
                          <p className="text-xs text-stone-400">
                            {formatCurrency(item.price)} × {item.quantity} = {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {(['pending', 'preparing', 'ready', 'served'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleUpdateItemStatus(selectedOrder.id, item.id, status)}
                            className={`flex-1 py-1.5 rounded text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                              item.status === status
                                ? 'bg-amber-400 text-stone-950 shadow-md'
                                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-700'
                            }`}
                          >
                            {getStatusIcon(status)}
                            <span className="hidden sm:inline capitalize">{status}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Summary */}
              <div className="bg-stone-950 border border-stone-800 rounded-lg p-4 space-y-2">
                <h3 className="font-bold text-amber-100 mb-3">Bill Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Subtotal</span>
                  <span className="text-stone-200 font-medium">{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Tax (18%)</span>
                  <span className="text-stone-200 font-medium">{formatCurrency(selectedOrder.tax)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400">Discount</span>
                    <span className="text-emerald-400 font-medium">-{formatCurrency(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="border-t border-stone-700 pt-2 mt-2 flex justify-between text-lg font-bold">
                  <span className="text-stone-100">Total</span>
                  <span className="text-amber-400">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleCompleteOrder(selectedOrder.id)}
                  className="py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Mark Complete
                </button>
                <button
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                  className="py-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-300 hover:text-red-200 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
