'use client';

import { useState } from 'react';
import { 
  FiBell, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiMessageSquare, 
  FiDollarSign, 
  FiStar,
  FiFilter,
  FiChevronDown,
  FiClock
} from 'react-icons/fi';

type NotificationType = 'all' | 'unread' | 'messages' | 'payments' | 'reviews' | 'system';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'payment' | 'review' | 'system';
  read: boolean;
  time: string;
  icon: React.ReactNode;
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from John about your booking',
      type: 'message',
      read: false,
      time: '5 min ago',
      icon: <FiMessageSquare className="text-blue-500" />
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Your payment of ₦15,000 for Plumbing Service has been received',
      type: 'payment',
      read: true,
      time: '2 hours ago',
      icon: <FiDollarSign className="text-green-500" />
    },
    {
      id: '3',
      title: 'New Review',
      message: 'You received a 5-star review from Jane Smith',
      type: 'review',
      read: false,
      time: '1 day ago',
      icon: <FiStar className="text-yellow-500" />
    },
    {
      id: '4',
      title: 'System Update',
      message: 'New features have been added to your dashboard',
      type: 'system',
      read: true,
      time: '2 days ago',
      icon: <FiAlertTriangle className="text-purple-500" />
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    if (activeFilter === 'messages') return notification.type === 'message';
    if (activeFilter === 'payments') return notification.type === 'payment';
    if (activeFilter === 'reviews') return notification.type === 'review';
    if (activeFilter === 'system') return notification.type === 'system';
    return true;
  });

  const markAsRead = (id: string) => {
    // In a real app, this would update the notification status via API
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would update all notifications status via API
    console.log('Marking all notifications as read');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => markAllAsRead()}
            className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg"
          >
            Mark all as read
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <FiFilter size={16} />
              <span>Filter</span>
              {showFilters ? <FiChevronDown size={16} /> : <FiChevronDown size={16} className="transform rotate-180" />}
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                <div className="py-1">
                  {['all', 'unread', 'messages', 'payments', 'reviews', 'system'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter as NotificationType);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        activeFilter === filter 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-foreground hover:bg-gray-50'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-foreground/60">
            <FiBell className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium">No notifications</h3>
            <p className="mt-1 text-sm">You don't have any notifications yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <li 
                key={notification.id}
                className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {notification.icon}
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${
                        !notification.read ? 'text-foreground' : 'text-foreground/70'
                      }`}>
                        {notification.title}
                      </p>
                      <div className="flex items-center text-xs text-foreground/50">
                        <FiClock className="mr-1" size={12} />
                        {notification.time}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 mt-1">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-2 text-xs text-primary hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
