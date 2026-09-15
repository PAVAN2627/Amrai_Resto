import { useEffect } from 'react';
import { useNotification } from '@/context/NotificationContext';
import { tableOrderEventEmitter, type TableOrderEventType } from '@/lib/tableOrderEvents';

export function useTableOrderNotifications() {
  const { addNotification } = useNotification();

  useEffect(() => {
    // Subscribe to order created events
    const unsubscribeCreated = tableOrderEventEmitter.subscribe('order_created', (event) => {
      const tableNum = event.data.tableNumber;
      const items = event.data.order?.items?.length || 0;
      addNotification({
        type: 'info',
        title: '🔔 New Table Order',
        message: `Table ${tableNum} ordered ${items} item(s)`,
        duration: 5000,
      });
    });

    // Subscribe to item status changed events
    const unsubscribeItemStatus = tableOrderEventEmitter.subscribe('item_status_changed', (event) => {
      const item = event.data.item;
      const status = event.data.status;
      const tableNum = event.data.tableNumber;

      const statusMessages: Record<string, string> = {
        pending: '⏳ Pending',
        preparing: '👨‍🍳 Preparing',
        ready: '✅ Ready',
        served: '🍽️ Served',
      };

      addNotification({
        type: status === 'ready' ? 'success' : 'info',
        title: `${statusMessages[status] || status} - ${item?.name}`,
        message: `Table ${tableNum}`,
        duration: 4000,
      });
    });

    // Subscribe to order completed events
    const unsubscribeCompleted = tableOrderEventEmitter.subscribe('order_completed', (event) => {
      const tableNum = event.data.tableNumber;
      addNotification({
        type: 'success',
        title: '✅ Order Complete',
        message: `Table ${tableNum} order is ready for billing`,
        duration: 5000,
      });
    });

    // Subscribe to order deleted events
    const unsubscribeDeleted = tableOrderEventEmitter.subscribe('order_deleted', (event) => {
      const tableNum = event.data.tableNumber;
      addNotification({
        type: 'warning',
        title: '⚠️ Order Deleted',
        message: `Table ${tableNum} order has been deleted`,
        duration: 3000,
      });
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeCreated();
      unsubscribeItemStatus();
      unsubscribeCompleted();
      unsubscribeDeleted();
    };
  }, [addNotification]);
}
