import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Bell, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // ms, undefined = persistent
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = `notif-${Date.now()}-${Math.random()}`;
      const newNotification: Notification = { ...notification, id };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto-remove if duration is set
      if (notification.duration) {
        setTimeout(() => {
          removeNotification(id);
        }, notification.duration);
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
      <NotificationDisplay />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

function NotificationDisplay() {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-emerald-400" />;
      case 'error':
        return <AlertTriangle size={20} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-orange-400" />;
      case 'info':
      default:
        return <Bell size={20} className="text-blue-400" />;
    }
  };

  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600/20 border-emerald-600/30';
      case 'error':
        return 'bg-red-600/20 border-red-600/30';
      case 'warning':
        return 'bg-orange-600/20 border-orange-600/30';
      case 'info':
      default:
        return 'bg-blue-600/20 border-blue-600/30';
    }
  };

  const getTextColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'text-emerald-300';
      case 'error':
        return 'text-red-300';
      case 'warning':
        return 'text-orange-300';
      case 'info':
      default:
        return 'text-blue-300';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[999] space-y-2 max-w-sm">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`rounded-lg border p-4 shadow-lg animate-slide-in-right ${getBgColor(notif.type)}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{getIcon(notif.type)}</div>
            <div className="flex-1">
              <h4 className={`font-bold ${getTextColor(notif.type)}`}>{notif.title}</h4>
              <p className="text-sm text-stone-300 mt-0.5">{notif.message}</p>
              {notif.actionLabel && (
                <button
                  onClick={() => {
                    notif.onAction?.();
                    removeNotification(notif.id);
                  }}
                  className={`mt-2 px-3 py-1 rounded text-xs font-bold transition-colors ${
                    notif.type === 'success'
                      ? 'bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-300'
                      : notif.type === 'error'
                        ? 'bg-red-600/40 hover:bg-red-600/60 text-red-300'
                        : notif.type === 'warning'
                          ? 'bg-orange-600/40 hover:bg-orange-600/60 text-orange-300'
                          : 'bg-blue-600/40 hover:bg-blue-600/60 text-blue-300'
                  }`}
                >
                  {notif.actionLabel}
                </button>
              )}
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-stone-400 hover:text-stone-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
