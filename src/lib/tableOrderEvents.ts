import type { TableOrder, TableOrderItem } from '@/types';

// Simple event emitter for table order events
export type TableOrderEventType = 
  | 'order_created'
  | 'order_updated'
  | 'item_status_changed'
  | 'order_completed'
  | 'order_deleted';

export interface TableOrderEvent {
  type: TableOrderEventType;
  timestamp: string;
  data: {
    order?: TableOrder;
    item?: TableOrderItem;
    tableNumber?: string;
    status?: string;
    [key: string]: any;
  };
}

type EventListener = (event: TableOrderEvent) => void;

class TableOrderEventEmitter {
  private listeners: Map<TableOrderEventType, Set<EventListener>> = new Map();

  subscribe(eventType: TableOrderEventType, listener: EventListener): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.get(eventType)?.delete(listener);
    };
  }

  emit(event: TableOrderEvent) {
    const listeners = this.listeners.get(event.type);
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(event);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  // Helper methods for common events
  emitOrderCreated(order: TableOrder) {
    this.emit({
      type: 'order_created',
      timestamp: new Date().toISOString(),
      data: { order, tableNumber: order.table_number },
    });
  }

  emitOrderUpdated(order: TableOrder) {
    this.emit({
      type: 'order_updated',
      timestamp: new Date().toISOString(),
      data: { order, tableNumber: order.table_number },
    });
  }

  emitItemStatusChanged(order: TableOrder, item: TableOrderItem) {
    this.emit({
      type: 'item_status_changed',
      timestamp: new Date().toISOString(),
      data: { order, item, tableNumber: order.table_number, status: item.status },
    });
  }

  emitOrderCompleted(order: TableOrder) {
    this.emit({
      type: 'order_completed',
      timestamp: new Date().toISOString(),
      data: { order, tableNumber: order.table_number },
    });
  }

  emitOrderDeleted(tableNumber: string) {
    this.emit({
      type: 'order_deleted',
      timestamp: new Date().toISOString(),
      data: { tableNumber },
    });
  }
}

export const tableOrderEventEmitter = new TableOrderEventEmitter();
