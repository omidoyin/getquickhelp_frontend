'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiChevronLeft, FiMoreVertical, FiPhone, FiVideo, FiImage, FiPaperclip, FiCheck, FiCheckCircle } from 'react-icons/fi';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'provider';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'audio' | 'video';
};

type Chat = {
  id: string;
  providerName: string;
  providerImage: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'pending' | 'accepted' | 'on-the-way' | 'completed' | 'cancelled';
  deadline?: Date;
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data for chats list
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      providerName: 'John Plumbing',
      providerImage: 'J',
      lastMessage: 'I can be there in 30 minutes',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2,
      status: 'accepted',
    },
    {
      id: '2',
      providerName: 'Sarah Electrical',
      providerImage: 'S',
      lastMessage: 'What time works for you tomorrow?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      unreadCount: 0,
      status: 'pending',
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    },
    {
      id: '3',
      providerName: 'Mike Cleaning',
      providerImage: 'M',
      lastMessage: 'Thank you for your business!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
      status: 'completed',
    },
  ]);

  // Mock messages for the active chat
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      // Simulate loading messages for the active chat
      setMessages([
        {
          id: '1',
          text: 'Hi there! I need help with a plumbing issue.',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          status: 'read',
          type: 'text',
        },
        {
          id: '2',
          text: 'Hello! I can help with that. What seems to be the problem?',
          sender: 'provider',
          timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
          status: 'read',
          type: 'text',
        },
        {
          id: '3',
          text: 'My kitchen sink is clogged and water is not draining properly.',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
          status: 'read',
          type: 'text',
        },
        {
          id: '4',
          text: 'I can be there in 30 minutes. Does that work for you?',
          sender: 'provider',
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          status: 'read',
          type: 'text',
        },
      ]);
    }
  }, [activeChat]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      type: 'text',
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate auto-reply after 1-3 seconds
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! I\'ll get back to you shortly.',
        sender: 'provider',
        timestamp: new Date(),
        status: 'delivered',
        type: 'text',
      };
      setMessages(prev => [...prev, reply]);
    }, 1000 + Math.random() * 2000);
  };

  const handleBookNow = () => {
    // Show booking dialog
    alert('Booking dialog would open here');
  };

  const filteredChats = chats.filter(chat => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return chat.status === 'pending';
    if (activeTab === 'completed') return chat.status === 'completed';
    return true;
  });

  // Sort chats by deadline (if exists) or last message time
  const sortedChats = [...filteredChats].sort((a, b) => {
    // If either has a deadline, prioritize those
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    if (a.deadline && b.deadline) {
      return a.deadline.getTime() - b.deadline.getTime();
    }
    // Otherwise sort by last message time
    return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat List */}
      <div className={`${activeChat ? 'hidden md:block md:w-1/3' : 'w-full'} border-r border-gray-200 bg-white`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">Messages</h1>
          
          {/* Search Bar */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full p-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
            <svg
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4 border-b">
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'pending' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'completed' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        
        {/* Chat List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {sortedChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b border-gray-100 flex items-center ${activeChat === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mr-3">
                {chat.providerImage}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">{chat.providerName}</h3>
                  <span className="text-xs text-gray-500">
                    {chat.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {chat.status === 'pending' && chat.deadline && (
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      Respond in {Math.ceil((chat.deadline.getTime() - Date.now()) / (1000 * 60 * 60))}h
                    </span>
                  </div>
                )}
              </div>
              {chat.unreadCount > 0 && (
                <span className="ml-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      {activeChat ? (
        <div className={`${activeChat ? 'w-full' : 'hidden md:block md:w-2/3'} flex flex-col`}>
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 text-gray-600"
                onClick={() => setActiveChat(null)}
              >
                <FiChevronLeft size={24} />
              </button>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mr-3">
                {chats.find(c => c.id === activeChat)?.providerImage}
              </div>
              <div>
                <h2 className="font-bold">{chats.find(c => c.id === activeChat)?.providerName}</h2>
                <p className="text-xs text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary">
                <FiPhone size={20} />
              </button>
              <button className="text-gray-600 hover:text-primary">
                <FiVideo size={20} />
              </button>
              <button className="text-gray-600 hover:text-primary">
                <FiMoreVertical size={20} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className={`text-xs mt-1 flex items-center justify-end space-x-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.sender === 'user' && (
                        <span>
                          {msg.status === 'sent' && <FiCheck size={12} />}
                          {msg.status === 'delivered' && <FiCheck size={12} />}
                          {msg.status === 'read' && <FiCheck className="text-blue-300" size={12} />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-primary">
                <FiPaperclip size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-primary">
                <FiImage size={20} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 mx-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark"
              >
                <FiSend size={20} />
              </button>
            </div>
            
            {/* Book Now Button - Only show for pending/accepted chats */}
            {activeChat && ['pending', 'accepted'].includes(chats.find(c => c.id === activeChat)?.status || '') && (
              <div className="mt-4">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-green-500 text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-green-600"
                >
                  <FiCheckCircle size={18} />
                  <span>Book Now</span>
                </button>
              </div>
            )}
            
            {/* Status Indicator - Show current status of the booking */}
            {activeChat && (
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-500">
                  Status: <span className="font-medium capitalize">
                    {chats.find(c => c.id === activeChat)?.status.replace('-', ' ')}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-col items-center justify-center w-2/3 bg-gray-50 p-8">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a chat</h2>
            <p className="text-gray-600">Choose a conversation from the list or start a new one to begin messaging.</p>
          </div>
        </div>
      )}
      
      {/* Bottom Navigation - Only show on mobile when chat list is visible */}
      {!activeChat && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-4">
          <a href="/" className="flex flex-col items-center text-foreground/80">
            <span className="text-2xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="/chat" className="flex flex-col items-center text-primary">
            <span className="text-2xl">💬</span>
            <span className="text-xs mt-1">Chats</span>
          </a>
          <a href="/profile" className="flex flex-col items-center text-foreground/80">
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </a>
        </nav>
      )}
    </div>
  );
}
