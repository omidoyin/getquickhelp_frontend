'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiBell, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiMessageSquare, 
  FiDollarSign, 
  FiStar,
  FiFilter,
  FiChevronDown,
  FiClock,
  FiChevronRight,
  FiCheck,
  FiX,
  FiTrash2,
  FiArrowLeft
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
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

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

  const toggleNotificationSelect = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const markAsRead = (id: string) => {
    // In a real app, this would update the notification status via API
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would update all notifications status via API
    console.log('Marking all notifications as read');
  };

  const deleteSelected = () => {
    // In a real app, this would delete the selected notifications via API
    console.log('Deleting notifications:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const filterOptions: { id: NotificationType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Notifications', icon: <FiBell className="mr-2" /> },
    { id: 'unread', label: 'Unread', icon: <FiCheckCircle className="mr-2" /> },
    { id: 'messages', label: 'Messages', icon: <FiMessageSquare className="mr-2" /> },
    { id: 'payments', label: 'Payments', icon: <FiDollarSign className="mr-2" /> },
    { id: 'reviews', label: 'Reviews', icon: <FiStar className="mr-2" /> },
    { id: 'system', label: 'System', icon: <FiAlertTriangle className="mr-2" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 p-1 rounded-full hover:bg-gray-100"
            >
              <FiArrowLeft size={24} className="text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Notifications</h1>
            <div className="flex items-center space-x-3">
              {selectedNotifications.length > 0 ? (
                <>
                  <button 
                    onClick={markAllAsRead}
                    className="p-2 text-foreground/80 hover:text-foreground"
                    title="Mark as read"
                  >
                    <FiCheck size={20} />
                  </button>
                  <button 
                    onClick={deleteSelected}
                    className="p-2 text-red-500 hover:text-red-600"
                    title="Delete selected"
                  >
                    <FiTrash2 size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedNotifications([])}
                    className="p-2 text-foreground/50 hover:text-foreground"
                    title="Cancel"
                  >
                    <FiX size={20} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground/80 hover:bg-gray-100'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
                  !notification.read ? 'border-l-4 border-l-primary' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start p-4">
                  {selectedNotifications.length > 0 ? (
                    <button
                      onClick={() => toggleNotificationSelect(notification.id)}
                      className={`mt-1 mr-3 w-5 h-5 rounded border ${
                        selectedNotifications.includes(notification.id)
                          ? 'bg-primary border-primary flex items-center justify-center'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedNotifications.includes(notification.id) && (
                        <FiCheck className="text-white text-sm" />
                      )}
                    </button>
                  ) : (
                    <div className="mt-1 mr-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {notification.icon}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-foreground">
                        {notification.title}
                      </h3>
                      <span className="text-xs text-foreground/50 ml-2 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/80">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex items-center space-x-3">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-primary hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                      <button className="text-xs text-foreground/60 hover:text-foreground">
                        View details
                      </button>
                    </div>
                  </div>
                  
                  <button className="ml-2 text-foreground/40 hover:text-foreground">
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <FiBell className="text-foreground/40" size={24} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No notifications</h3>
              <p className="text-foreground/60">When you get notifications, they'll appear here</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
