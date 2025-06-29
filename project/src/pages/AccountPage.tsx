import React, { useState } from 'react';
import { User, Heart, Clock, Package, Settings, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCards } from '../contexts/CardContext';

export const AccountPage: React.FC = () => {
  const { user } = useAuth();
  const { cards } = useCards();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  const claimedCards = cards.filter(card => card.claimedBy === user.id);
  const wishlistCards = cards.filter(card => user.wishlist?.includes(card.id));

  const handleSave = () => {
    // Update user data
    console.log('Updating user data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'claimed', label: 'Claimed Cards', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'history', label: 'History', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <p className="text-blue-100">{user.email}</p>
                  {user.isAdmin && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                      Administrator
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
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

          {/* Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <p className="text-gray-900">
                      {user.isAdmin ? 'Administrator' : 'Standard User'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <p className="text-gray-900">January 2025</p>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'claimed' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Claimed Cards</h2>
                
                {claimedCards.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Claimed Cards</h3>
                    <p className="text-gray-600">You haven't claimed any cards yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {claimedCards.map((card) => (
                      <div key={card.id} className="bg-gray-50 rounded-lg p-4">
                        <img
                          src={card.imageUrl}
                          alt={card.playerName}
                          className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-gray-900">{card.playerName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{card.grade}</span>
                          {card.price && (
                            <span className="font-bold text-green-600">${card.price.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Claimed: {card.claimedAt?.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Wishlist</h2>
                
                {wishlistCards.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Wishlist Items</h3>
                    <p className="text-gray-600">Add cards to your wishlist to see them here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistCards.map((card) => (
                      <div key={card.id} className="bg-gray-50 rounded-lg p-4">
                        <img
                          src={card.imageUrl}
                          alt={card.playerName}
                          className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-gray-900">{card.playerName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{card.grade}</span>
                          {card.price && (
                            <span className="font-bold text-green-600">${card.price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Activity History</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Account Created</h3>
                        <p className="text-sm text-gray-600">Welcome to Slab Savvy CPA!</p>
                      </div>
                      <span className="text-sm text-gray-500">Jan 15, 2025</span>
                    </div>
                  </div>
                  
                  {claimedCards.map((card) => (
                    <div key={card.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Card Claimed</h3>
                          <p className="text-sm text-gray-600">{card.playerName} - {card.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {card.claimedAt?.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};