import React, { useState } from 'react';
import { Shield, Users, Package, TrendingUp, Settings, Plus, Edit, Trash2, Eye, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCards } from '../contexts/CardContext';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { cards } = useCards();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'cards', label: 'Card Management', icon: Package },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    {
      title: 'Total Cards',
      value: cards.length.toString(),
      change: '+12%',
      color: 'blue'
    },
    {
      title: 'Available Cards',
      value: cards.filter(card => !card.sold && !card.claimedBy).length.toString(),
      change: '-5%',
      color: 'green'
    },
    {
      title: 'Claimed Cards',
      value: cards.filter(card => card.claimedBy).length.toString(),
      change: '+8%',
      color: 'orange'
    },
    {
      title: 'Sold Cards',
      value: cards.filter(card => card.sold).length.toString(),
      change: '+15%',
      color: 'purple'
    }
  ];

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User', joinDate: '2025-01-10', claimedCards: 2 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', joinDate: '2025-01-08', claimedCards: 1 },
    { id: '3', name: 'Admin User', email: 'admin@slabsavvy.com', role: 'Admin', joinDate: '2025-01-01', claimedCards: 0 },
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your cards, users, and system settings</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                        <div className={`w-3 h-3 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]}`}></div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className={`text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {cards.filter(card => card.claimedBy).slice(0, 5).map((card) => (
                      <div key={card.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center space-x-4">
                          <img
                            src={card.imageUrl}
                            alt={card.playerName}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{card.playerName}</div>
                            <div className="text-sm text-gray-600">Claimed by user</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {card.claimedAt?.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cards' && (
              <div className="space-y-6">
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Card Inventory</h3>
                  <div className="flex space-x-3">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Card
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Cards Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Card
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grade
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cards.map((card) => (
                          <tr key={card.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={card.imageUrl}
                                  alt={card.playerName}
                                  className="w-10 h-10 object-cover rounded-lg mr-4"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{card.playerName}</div>
                                  <div className="text-sm text-gray-500">{card.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                                {card.grade}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {card.price ? `$${card.price.toLocaleString()}` : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                card.sold 
                                  ? 'bg-gray-100 text-gray-800'
                                  : card.claimedBy
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {card.sold ? 'Sold' : card.claimedBy ? 'Claimed' : 'Available'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Users
                  </button>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Join Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Claimed Cards
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                  <Users className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                user.role === 'Admin' 
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.joinDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.claimedCards}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h3 className="text-lg font-bold text-gray-900">System Settings</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Google Sheets Integration */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Google Sheets Integration</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sheet URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://docs.google.com/spreadsheets/..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sync Frequency
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Every 15 minutes</option>
                          <option>Every 30 minutes</option>
                          <option>Every hour</option>
                          <option>Manual only</option>
                        </select>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Update Settings
                      </button>
                    </div>
                  </div>

                  {/* Site Configuration */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Site Configuration</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Title
                        </label>
                        <input
                          type="text"
                          value="Slab Savvy CPA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value="The Hobby's Accountant"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value="hello@slabsavvy.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};