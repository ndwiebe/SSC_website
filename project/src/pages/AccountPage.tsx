import React, { useState } from 'react';
import { User, Heart, Clock, Package, Edit, Save, X } from 'lucide-react';
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
      <div className="min-h-screen bg-ssc-ivory flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-headline text-2xl text-ssc-text tracking-wide mb-4">PLEASE LOG IN</h2>
          <p className="font-body text-ssc-text-secondary">You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  const claimedCards = cards.filter(card => card.claimedBy === user.id);
  const wishlistCards = cards.filter(card => user.wishlist?.includes(card.id));

  const handleSave = () => {
    console.log('Updating user data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ name: user?.name || '', email: user?.email || '' });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'claimed', label: 'Claimed Cards', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'history', label: 'History', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-ssc-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-ssc-white border border-ssc-border shadow-card overflow-hidden">
          {/* Header */}
          <div className="bg-ssc-black px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-ssc-surface border border-ssc-border-dark flex items-center justify-center">
                  <User className="w-7 h-7 text-ssc-gold" />
                </div>
                <div>
                  <h1 className="font-headline text-2xl text-ssc-gold tracking-wide">{user.name.toUpperCase()}</h1>
                  <p className="font-body text-ssc-chrome text-sm">{user.email}</p>
                  {user.isAdmin && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-mono bg-ssc-gold/10 border border-ssc-gold/30 text-ssc-gold mt-1">
                      Admin
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-ssc-surface border border-ssc-border-dark hover:border-ssc-gold text-white px-4 py-2 font-body font-medium transition-colors flex items-center"
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-ssc-border">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-body font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-ssc-gold text-ssc-gold'
                        : 'border-transparent text-ssc-text-secondary hover:text-ssc-text hover:border-ssc-border'
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
                <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-6">PROFILE</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-body font-medium text-ssc-text mb-2">Full Name</label>
                    {isEditing ? (
                      <input type="text" value={editData.name} onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold bg-ssc-ivory text-ssc-text font-body" />
                    ) : (
                      <p className="font-body text-ssc-text">{user.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-ssc-text mb-2">Email</label>
                    {isEditing ? (
                      <input type="email" value={editData.email} onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-3 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold bg-ssc-ivory text-ssc-text font-body" />
                    ) : (
                      <p className="font-body text-ssc-text">{user.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-ssc-text mb-2">Account Type</label>
                    <p className="font-body text-ssc-text">{user.isAdmin ? 'Administrator' : 'Standard User'}</p>
                  </div>
                  {isEditing && (
                    <div className="flex space-x-4">
                      <button onClick={handleSave} className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-4 py-2 font-body font-medium transition-colors flex items-center"><Save className="w-4 h-4 mr-2" />Save</button>
                      <button onClick={handleCancel} className="bg-ssc-chrome-dark hover:bg-ssc-text text-white px-4 py-2 font-body font-medium transition-colors">Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'claimed' && (
              <div>
                <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-6">CLAIMED CARDS</h2>
                {claimedCards.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-ssc-chrome-dark mx-auto mb-4" />
                    <h3 className="font-body font-semibold text-ssc-text mb-2">No Claimed Cards</h3>
                    <p className="font-body text-ssc-text-secondary">You haven't claimed any cards yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {claimedCards.map((card) => (
                      <div key={card.id} className="bg-ssc-ivory border border-ssc-border p-4">
                        <img src={card.imageUrl} alt={card.playerName} className="w-full aspect-[5/7] object-cover mb-4" />
                        <h3 className="font-body font-bold text-ssc-text">{card.playerName}</h3>
                        <p className="font-body text-sm text-ssc-text-secondary mb-2">{card.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm text-ssc-text">{card.grade}</span>
                          {card.price && <span className="font-mono font-bold text-ssc-gold">${card.price.toLocaleString()}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-6">WISHLIST</h2>
                {wishlistCards.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-ssc-chrome-dark mx-auto mb-4" />
                    <h3 className="font-body font-semibold text-ssc-text mb-2">No Wishlist Items</h3>
                    <p className="font-body text-ssc-text-secondary">Add cards to your wishlist from the catalog.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistCards.map((card) => (
                      <div key={card.id} className="bg-ssc-ivory border border-ssc-border p-4">
                        <img src={card.imageUrl} alt={card.playerName} className="w-full aspect-[5/7] object-cover mb-4" />
                        <h3 className="font-body font-bold text-ssc-text">{card.playerName}</h3>
                        <p className="font-body text-sm text-ssc-text-secondary mb-2">{card.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm text-ssc-text">{card.grade}</span>
                          {card.price && <span className="font-mono font-bold text-ssc-gold">${card.price.toLocaleString()}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-6">ACTIVITY</h2>
                <div className="space-y-4">
                  <div className="bg-ssc-ivory border border-ssc-border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-body font-medium text-ssc-text">Account Created</h3>
                        <p className="font-body text-sm text-ssc-text-secondary">Welcome to Slab Savvy CPA</p>
                      </div>
                      <span className="font-mono text-sm text-ssc-chrome-dark">Jan 15, 2025</span>
                    </div>
                  </div>
                  {claimedCards.map((card) => (
                    <div key={card.id} className="bg-ssc-ivory border border-ssc-border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-body font-medium text-ssc-text">Card Claimed</h3>
                          <p className="font-body text-sm text-ssc-text-secondary">{card.playerName} - {card.description}</p>
                        </div>
                        <span className="font-mono text-sm text-ssc-chrome-dark">{card.claimedAt?.toLocaleDateString()}</span>
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