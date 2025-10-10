'use client';

import { useState } from 'react';
import { 
  FiUsers, 
  FiBriefcase, 
  FiAlertTriangle, 
  FiBarChart2, 
  FiMail, 
  FiUserCheck, 
  FiUserX,
  FiMapPin,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiMessageSquare,
  FiStar,
  FiTrendingUp,
  FiUser
} from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'user' | 'provider';
  status: 'active' | 'suspended' | 'pending';
  rating: number;
  jobsCompleted: number;
  lastActive: string;
  region: string;
}

interface Job {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'disputed';
  user: string;
  provider: string;
  date: string;
  amount: number;
  category: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState<User[]>([
    // Mock data - in a real app, this would come from an API
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      type: 'provider',
      status: 'active',
      rating: 4.8,
      jobsCompleted: 42,
      lastActive: '2h ago',
      region: 'Lagos'
    },
    // Add more mock users as needed
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    // Mock job data
    {
      id: '101',
      title: 'Plumbing Repair',
      status: 'completed',
      user: 'Jane Smith',
      provider: 'John Doe',
      date: '2023-10-09',
      amount: 15000,
      category: 'Plumbing'
    },
    // Add more mock jobs as needed
  ]);

  const stats = [
    { name: 'Total Users', value: '1,234', icon: FiUsers, change: '+12%', changeType: 'increase' },
    { name: 'Active Providers', value: '256', icon: FiUserCheck, change: '+5%', changeType: 'increase' },
    { name: 'Jobs This Month', value: '1,024', icon: FiBriefcase, change: '+8%', changeType: 'increase' },
    { name: 'Disputes', value: '12', icon: FiAlertTriangle, change: '-2%', changeType: 'decrease' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'completed a job', time: '2h ago', icon: FiCheckCircle },
    { id: 2, user: 'Jane Smith', action: 'signed up as a provider', time: '4h ago', icon: FiUser },
    { id: 3, user: 'Mike Johnson', action: 'reported an issue', time: '1d ago', icon: FiAlertTriangle },
  ];

  const topCategories = [
    { name: 'Plumbing', jobs: 245, change: '12%' },
    { name: 'Electrical', jobs: 198, change: '8%' },
    { name: 'Cleaning', jobs: 156, change: '15%' },
    { name: 'Moving', jobs: 132, change: '5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4
          ">
            <button className="p-2 text-foreground/70 hover:text-primary">
              <FiMessageSquare size={20} />
            </button>
            <button className="p-2 text-foreground/70 hover:text-primary">
              <FiSettings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'dashboard' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'users' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'jobs' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'analytics' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'moderation' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Moderation
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground/70">{stat.name}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <stat.icon size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Recent Activities</h2>
                  <button className="text-sm text-primary">View All</button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <activity.icon className="text-foreground/70" size={18} />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-foreground/50">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Categories */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold mb-4">Top Categories</h2>
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{category.name}</span>
                        <span className="font-medium">{category.jobs} jobs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (category.jobs / 250) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-foreground/50 mt-1">
                        {category.change} increase from last month
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance by Region */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Performance by Region</h2>
                <button className="text-sm text-primary">View All Regions</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Region</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Jobs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Growth</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Avg. Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiMapPin className="text-foreground/50 mr-2" size={16} />
                          <span>Lagos</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">542</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600">+12%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 fill-current mr-1" size={16} />
                          <span>4.7</span>
                        </div>
                      </td>
                    </tr>
                    {/* Add more regions as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-lg font-bold">User Management</h2>
              <div className="flex space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <FiSearch className="absolute left-3 top-3 text-foreground/50" />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FiFilter size={16} />
                  <span>Filters</span>
                  {showFilters ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">User Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">All Types</option>
                    <option value="user">Regular Users</option>
                    <option value="provider">Service Providers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Status</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Region</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">All Regions</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                    <option value="port-harcourt">Port Harcourt</option>
                  </select>
                </div>
              </div>
            )}

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Jobs</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-foreground">{user.name}</div>
                            <div className="text-sm text-foreground/50">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.type === 'provider' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.type === 'provider' ? 'Provider' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 fill-current mr-1" size={16} />
                          <span>{user.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/70">
                        {user.jobsCompleted} jobs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : user.status === 'suspended'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/70">
                        <div className="flex items-center">
                          <FiClock className="mr-1 text-foreground/50" size={14} />
                          {user.lastActive}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-4">View</button>
                        <button className="text-amber-600 hover:text-amber-800">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-foreground/70">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">1,234</span> users
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-foreground/70 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-primary bg-primary text-white rounded-lg hover:bg-primary-dark">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-foreground/70 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-foreground/70 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-foreground/70 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6">Job Management</h2>
            <p className="text-foreground/70">Job management features will be implemented here.</p>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6">Analytics Dashboard</h2>
            <p className="text-foreground/70">Analytics and reporting features will be implemented here.</p>
          </div>
        )}

        {/* Moderation Tab */}
        {activeTab === 'moderation' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6">Content Moderation</h2>
            <p className="text-foreground/70">Content moderation tools will be implemented here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
