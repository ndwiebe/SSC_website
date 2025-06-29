import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, TrendingUp, Shield, Star, Users, MessageCircle, BookOpen } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CardGrid } from '../components/CardGrid';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero />

      {/* Featured Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-gold mb-4">
            Featured Premium Cards
          </h2>
          <p className="text-lg text-brand-secondary-text max-w-2xl mx-auto">
            Hand-selected graded cards from our collection. Each card is authenticated, graded, and ready for serious collectors.
          </p>
        </div>
        
        <CardGrid showFeaturedOnly={true} limit={6} />
        
        <div className="text-center mt-8">
          <Link
            to="/catalog"
            className="inline-flex items-center px-6 py-3 bg-brand-accent-gold text-white font-semibold rounded-lg hover:bg-brand-button-hover transition-colors shadow-brand hover-lift"
          >
            View Full Catalog
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Consulting Services Section */}
      <section className="bg-brand-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-gold mb-4">
              Professional Services Beyond the Hobby
            </h2>
            <p className="text-lg text-brand-primary-text max-w-3xl mx-auto">
              As a qualified CPA, I offer comprehensive financial and business consulting services. 
              Whether you're scaling your collecting business or need expert accounting guidance, I'm here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tax Preparation */}
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 hover:shadow-brand-xl transition-shadow group border border-brand-border hover-lift">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary-text mb-4">Tax Preparation & Planning</h3>
              <p className="text-brand-primary-text/70 mb-6">
                Expert CRA tax preparation, planning strategies, and audit support. Maximize your returns and stay compliant.
              </p>
              <ul className="space-y-2 text-sm text-brand-primary-text/70 mb-6">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                  Personal & Corporate Tax Returns
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                  CRA Audit Representation
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                  Tax Planning & Strategy
                </li>
              </ul>
              <Link
                to="/consulting"
                className="text-brand-accent-gold font-semibold hover:text-brand-button-hover transition-colors inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Business Consulting */}
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 hover:shadow-brand-xl transition-shadow group border border-brand-border hover-lift">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary-text mb-4">Business Consulting</h3>
              <p className="text-brand-primary-text/70 mb-6">
                Strategic business advice, financial analysis, and growth planning to help your business thrive.
              </p>
              <ul className="space-y-2 text-sm text-brand-primary-text/70 mb-6">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Financial Analysis & Reporting
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Business Plan Development
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Cash Flow Management
                </li>
              </ul>
              <Link
                to="/consulting"
                className="text-brand-accent-gold font-semibold hover:text-brand-button-hover transition-colors inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* AI Automation */}
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 hover:shadow-brand-xl transition-shadow group border border-brand-border hover-lift">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary-text mb-4">AI Business Automation</h3>
              <p className="text-brand-primary-text/70 mb-6">
                Leverage cutting-edge AI tools to streamline operations, automate workflows, and boost productivity.
              </p>
              <ul className="space-y-2 text-sm text-brand-primary-text/70 mb-6">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                  Process Automation
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                  AI Integration Consulting
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                  Workflow Optimization
                </li>
              </ul>
              <Link
                to="/consulting"
                className="text-brand-accent-gold font-semibold hover:text-brand-button-hover transition-colors inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/consulting"
              className="inline-flex items-center px-8 py-4 bg-brand-accent-gold text-white font-semibold rounded-lg hover:bg-brand-button-hover transition-colors text-lg shadow-brand hover-lift"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Community Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-gold mb-6">
              Trusted by Collectors & Businesses
            </h2>
            <p className="text-lg text-brand-secondary-text mb-8">
              With years of experience in both sports card collecting and professional accounting, 
              I understand the unique needs of hobby businesses and serious collectors.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-secondary-text mb-1">Expertise You Can Trust</h3>
                  <p className="text-brand-secondary-text/80">Qualified CPA with deep knowledge of both hobby and business finance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-secondary-text mb-1">Authenticated & Graded</h3>
                  <p className="text-brand-secondary-text/80">Every card is thoroughly verified and professionally graded</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-secondary-text mb-1">Community Focused</h3>
                  <p className="text-brand-secondary-text/80">Building lasting relationships with collectors and business owners</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-brand-border hover-lift">
              <div className="text-3xl font-bold text-brand-accent-gold mb-2">500+</div>
              <div className="text-sm text-blue-800">Cards Traded</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-brand-border hover-lift">
              <div className="text-3xl font-bold text-brand-accent-gold mb-2">50+</div>
              <div className="text-sm text-green-800">Happy Clients</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center border border-brand-border hover-lift">
              <div className="text-3xl font-bold text-brand-accent-gold mb-2">5★</div>
              <div className="text-sm text-yellow-800">Average Rating</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border border-brand-border hover-lift">
              <div className="text-3xl font-bold text-brand-accent-gold mb-2">24/7</div>
              <div className="text-sm text-purple-800">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-brand-primary-text text-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-gold mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-brand-border max-w-2xl mx-auto">
              Connect with fellow collectors, get expert insights, and stay updated on the latest market trends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-button-hover rounded-xl p-6 text-center hover:bg-brand-primary-bg transition-colors border border-brand-border/30 hover-lift">
              <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Discord Community</h3>
              <p className="text-brand-border mb-4">Join our active Discord server for real-time discussions and market updates</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Join Discord
              </button>
            </div>
            
            <div className="bg-brand-button-hover rounded-xl p-6 text-center hover:bg-brand-primary-bg transition-colors border border-brand-border/30 hover-lift">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp Group</h3>
              <p className="text-brand-border mb-4">Get instant notifications about new arrivals and exclusive deals</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Join WhatsApp
              </button>
            </div>
            
            <div className="bg-brand-button-hover rounded-xl p-6 text-center hover:bg-brand-primary-bg transition-colors border border-brand-border/30 hover-lift">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Educational Content</h3>
              <p className="text-brand-border mb-4">Access exclusive guides on collecting, grading, and investment strategies</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};