import React, { useState } from 'react';
import { Play, Clock, User, Eye, BookOpen, Video, Download, Lock } from 'lucide-react';
import { ComingSoonBadge } from '../components/ComingSoon';

export const ContentHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const articles = [
    {
      id: 1,
      title: 'PSA vs BGS: Which Grading Company Gets You More Money?',
      excerpt: 'A real comparison of the two big grading companies and how they affect what your cards sell for.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-15',
      readTime: '8 min read',
      category: 'Grading',
      image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'When Does CRA Care About Your Card Sales?',
      excerpt: 'The hobby vs. business line is blurry. Here is what actually matters when you file.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-12',
      readTime: '12 min read',
      category: 'Tax & Finance',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Hockey Cards vs Basketball Cards: Where is the Market Going?',
      excerpt: 'Looking at real sales data to see which sport has better upside heading into 2026.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-10',
      readTime: '15 min read',
      category: 'Market Analysis',
      image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Starting a Card Collection with Investment in Mind',
      excerpt: 'How to build a collection that is also smart financially. A step-by-step approach.',
      author: 'Slab Savvy CPA',
      publishDate: '2025-01-08',
      readTime: '10 min read',
      category: 'Investment',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Box Break: 2024-25 Upper Deck Series 1 Hockey',
      description: 'Ripping a fresh box and talking through market values in real time.',
      duration: '45:32',
      views: '12.5K',
      publishDate: '2025-01-14',
      thumbnail: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Tax Strategies for Card Collectors (Deep Dive)',
      description: 'Advanced tax planning for collectors who sell enough that CRA might care.',
      duration: '1:23:15',
      views: '3.2K',
      publishDate: '2025-01-11',
      thumbnail: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Grading Submission Tips: Get Better PSA Grades',
      description: 'How to prep your cards, pick the right service level, and time your submissions.',
      duration: '28:47',
      views: '8.7K',
      publishDate: '2025-01-09',
      thumbnail: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const tabs = [
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-ssc-ivory">
      {/* Header */}
      <div className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-ssc-gold tracking-wide mb-6">
              CONTENT HUB
            </h1>
            <p className="font-body text-xl text-ssc-chrome max-w-3xl mx-auto">
              Tax tips, market analysis, and collecting insights. From a CPA who actually rips packs.
            </p>
          </div>
        </div>
      </div>

      {/* Tax Playbook Banner */}
      <div className="bg-ssc-surface border-b border-ssc-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/30 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-ssc-gold" />
              </div>
              <div>
                <h2 className="font-headline text-2xl text-ssc-gold tracking-wide">
                  THE CARD COLLECTOR'S TAX PLAYBOOK
                </h2>
                <p className="font-body text-ssc-chrome mt-1">
                  Everything Canadian collectors need to know about taxes when selling cards. Written by a CPA who collects.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <span className="font-mono text-2xl font-bold text-ssc-gold">$29</span>
              <span className="inline-flex items-center px-3 py-1 bg-ssc-gold/10 border border-ssc-gold/20 text-ssc-gold text-xs font-mono font-medium">
                <Clock className="w-3 h-3 mr-1" />
                LAUNCHING SOON
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="bg-ssc-white border border-ssc-border mb-8">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-body font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-ssc-gold text-ssc-gold'
                      : 'border-transparent text-ssc-text-secondary hover:text-ssc-gold hover:border-ssc-border'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coming Soon notice */}
        <div className="bg-ssc-gold/5 border border-ssc-gold/20 p-4 mb-8 flex items-center space-x-3">
          <Clock className="w-5 h-5 text-ssc-gold flex-shrink-0" />
          <p className="font-body text-ssc-text-secondary text-sm">
            Articles and videos are coming soon. These are previews of planned content.
          </p>
        </div>

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-8">
            {/* Featured Article */}
            <div className="bg-ssc-white border border-ssc-border shadow-card overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img src={articles[0].image} alt={articles[0].title} className="w-full h-48 md:h-full object-cover" />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-ssc-gold/10 border border-ssc-gold/20 text-ssc-gold px-3 py-1 text-xs font-body font-medium">Featured</span>
                    <span className="bg-ssc-ivory border border-ssc-border text-ssc-text-secondary px-3 py-1 text-xs font-body font-medium">{articles[0].category}</span>
                  </div>
                  <h2 className="font-headline text-2xl text-ssc-text tracking-wide mb-4">{articles[0].title.toUpperCase()}</h2>
                  <p className="font-body text-ssc-text-secondary mb-6">{articles[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-ssc-chrome-dark font-body">
                      <div className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{articles[0].author}</span></div>
                      <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{articles[0].readTime}</span></div>
                    </div>
                    <ComingSoonBadge />
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <div key={article.id} className="bg-ssc-white border border-ssc-border shadow-card overflow-hidden group">
                  <div className="relative">
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-ssc-ivory border border-ssc-border text-ssc-text-secondary px-2 py-1 text-xs font-body font-medium">{article.category}</span>
                    </div>
                    <h3 className="font-body font-bold text-ssc-text mb-3 line-clamp-2">{article.title}</h3>
                    <p className="font-body text-ssc-text-secondary text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-ssc-chrome-dark font-body mb-4">
                      <span>{article.publishDate}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="w-full bg-ssc-chrome-dark/10 border border-ssc-border text-ssc-chrome-dark px-4 py-2 font-body font-medium text-center flex items-center justify-center">
                      <Clock className="w-3 h-3 mr-2" />
                      Coming Soon
                    </div>
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
              <div key={video.id} className="bg-ssc-white border border-ssc-border shadow-card overflow-hidden group">
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-ssc-gold/80 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-ssc-black/80 text-white px-2 py-1 text-xs font-mono">{video.duration}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-body font-bold text-ssc-text mb-3 line-clamp-2">{video.title}</h3>
                  <p className="font-body text-ssc-text-secondary text-sm mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-ssc-chrome-dark font-body mb-4">
                    <div className="flex items-center space-x-1"><Eye className="w-3 h-3" /><span>{video.views} views</span></div>
                    <span>{video.publishDate}</span>
                  </div>
                  <div className="w-full bg-ssc-chrome-dark/10 border border-ssc-border text-ssc-chrome-dark px-4 py-2 font-body font-medium text-center flex items-center justify-center">
                    <Clock className="w-3 h-3 mr-2" />
                    Coming Soon
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};