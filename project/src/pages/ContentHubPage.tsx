import React, { useState } from 'react';
import { Play, Lock, Clock, User, Eye, MessageCircle, BookOpen, Video, Star, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ContentHubPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('articles');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hello! I\'m your AI card valuation assistant. Ask me about any sports card and I\'ll provide market analysis and pricing insights.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const isSubscriber = user?.isAdmin || false; // In real app, check subscription status

  const articles = [
    {
      id: 1,
      title: 'Understanding PSA vs BGS Grading: Which is Better for Investment?',
      excerpt: 'A comprehensive comparison of the two major grading companies and their impact on card values.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-15',
      readTime: '8 min read',
      category: 'Grading',
      premium: false,
      image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Tax Implications of Sports Card Trading in Canada',
      excerpt: 'Everything you need to know about reporting card sales and claiming business expenses.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-12',
      readTime: '12 min read',
      category: 'Tax & Finance',
      premium: true,
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Market Analysis: Hockey Cards vs Basketball Cards in 2025',
      excerpt: 'Which sport offers better investment opportunities? Our data-driven analysis reveals the trends.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-10',
      readTime: '15 min read',
      category: 'Market Analysis',
      premium: true,
      image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Building Your First Sports Card Portfolio: A Beginner\'s Guide',
      excerpt: 'Step-by-step guide to starting your collection with investment potential in mind.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-08',
      readTime: '10 min read',
      category: 'Investment',
      premium: false,
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Live Card Break: 2024-25 Upper Deck Series 1 Hockey',
      description: 'Join me as I break a fresh box and discuss market values in real-time.',
      duration: '45:32',
      views: '12.5K',
      publishDate: '2025-01-14',
      premium: false,
      thumbnail: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Tax Strategies for Card Collectors (Premium Masterclass)',
      description: 'Advanced tax planning strategies specifically for sports card businesses and collectors.',
      duration: '1:23:15',
      views: '3.2K',
      publishDate: '2025-01-11',
      premium: true,
      thumbnail: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Grading Submission Tips: Maximize Your PSA Grades',
      description: 'Professional tips on card preparation, timing, and service level selection.',
      duration: '28:47',
      views: '8.7K',
      publishDate: '2025-01-09',
      premium: false,
      thumbnail: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Market Predictions 2025: Which Cards to Watch (Subscriber Only)',
      description: 'Exclusive market analysis and investment recommendations for the year ahead.',
      duration: '52:18',
      views: '1.8K',
      publishDate: '2025-01-07',
      premium: true,
      thumbnail: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const categories = ['All', 'Grading', 'Tax & Finance', 'Market Analysis', 'Investment'];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', message: chatInput };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: `Based on current market data, I can help you analyze that card. The market for that player has been trending upward with recent sales showing strong demand. Would you like me to provide specific pricing comparisons or investment outlook?`
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);

    setChatInput('');
  };

  const tabs = [
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'chatbot', label: 'AI Assistant', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-brand-primary-bg">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-primary-text via-brand-button-hover to-brand-primary-bg text-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-accent-gold">
              Content Hub
            </h1>
            <p className="text-xl text-brand-secondary-bg max-w-3xl mx-auto">
              Expert insights, market analysis, and educational content to help you succeed in sports card collecting and business
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Banner */}
      {!isSubscriber && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Star className="w-6 h-6 text-yellow-300" />
                <div>
                  <div className="font-semibold">Unlock Premium Content</div>
                  <div className="text-sm text-purple-100">Get access to exclusive articles, videos, and AI card valuation assistant</div>
                </div>
              </div>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="bg-brand-secondary-text rounded-lg shadow-brand mb-8 border border-brand-border">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-brand-accent-gold text-brand-accent-gold'
                      : 'border-transparent text-brand-primary-text hover:text-brand-accent-gold hover:border-brand-border'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'chatbot' && !isSubscriber && (
                    <Lock className="w-3 h-3 text-brand-border" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-8">
            {/* Featured Article */}
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg overflow-hidden border border-brand-border">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {articles[0].category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-brand-primary-text mb-4">{articles[0].title}</h2>
                  <p className="text-brand-primary-text/70 mb-6">{articles[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-brand-border">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{articles[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{articles[0].readTime}</span>
                      </div>
                    </div>
                    <button className="bg-brand-accent-gold hover:bg-brand-button-hover text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <div key={article.id} className="bg-brand-secondary-text rounded-xl shadow-brand overflow-hidden hover:shadow-brand-lg transition-shadow border border-brand-border group">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {article.premium && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        {!isSubscriber && <Lock className="w-3 h-3 mr-1" />}
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-brand-primary-text mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-brand-primary-text/70 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-brand-border mb-4">
                      <span>{article.publishDate}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <button 
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                        article.premium && !isSubscriber
                          ? 'bg-brand-border text-brand-secondary-text cursor-not-allowed'
                          : 'bg-brand-accent-gold hover:bg-brand-button-hover text-white'
                      }`}
                      disabled={article.premium && !isSubscriber}
                    >
                      {article.premium && !isSubscriber ? 'Subscribe to Read' : 'Read Article'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-brand-secondary-text rounded-xl shadow-brand overflow-hidden hover:shadow-brand-lg transition-shadow border border-brand-border group">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  {video.premium && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      {!isSubscriber && <Lock className="w-3 h-3 mr-1" />}
                      Premium
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-brand-primary-text mb-3 line-clamp-2">{video.title}</h3>
                  <p className="text-brand-primary-text/70 text-sm mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-brand-border mb-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views} views</span>
                    </div>
                    <span>{video.publishDate}</span>
                  </div>
                  <button 
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      video.premium && !isSubscriber
                        ? 'bg-brand-border text-brand-secondary-text cursor-not-allowed'
                        : 'bg-brand-accent-gold hover:bg-brand-button-hover text-white'
                    }`}
                    disabled={video.premium && !isSubscriber}
                  >
                    {video.premium && !isSubscriber ? 'Subscribe to Watch' : 'Watch Video'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Chatbot Tab */}
        {activeTab === 'chatbot' && (
          <div className="max-w-4xl mx-auto">
            {!isSubscriber ? (
              <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-12 text-center border border-brand-border">
                <Lock className="w-16 h-16 text-brand-border mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-brand-primary-text mb-4">Premium Feature</h2>
                <p className="text-brand-primary-text/70 mb-8 max-w-2xl mx-auto">
                  The AI Card Valuation Assistant is available exclusively to premium subscribers. 
                  Get instant market analysis, pricing insights, and investment recommendations powered by advanced AI.
                </p>
                <button className="bg-brand-accent-gold hover:bg-brand-button-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Subscribe for $19.99/month
                </button>
              </div>
            ) : (
              <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg border border-brand-border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <h2 className="text-xl font-bold mb-2">AI Card Valuation Assistant</h2>
                  <p className="text-blue-100">Ask me about any sports card for market analysis and pricing insights</p>
                </div>
                
                <div className="h-96 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-brand-accent-gold text-white' 
                          : 'bg-brand-secondary-bg text-brand-primary-text'
                      }`}>
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-brand-border p-6">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about a sports card..."
                      className="flex-1 px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-brand-accent-gold hover:bg-brand-button-hover text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};