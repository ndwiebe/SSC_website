import React, { useState } from 'react';
import { DollarSign, ArrowUpDown, Star, Shield, CheckCircle, Upload, Calculator, TrendingUp } from 'lucide-react';

export const SellTradePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sell');
  const [sellForm, setSellForm] = useState({
    playerName: '',
    cardSet: '',
    year: '',
    grade: '',
    grader: '',
    condition: '',
    quantity: 1,
    askingPrice: '',
    description: '',
    images: [] as File[]
  });

  const [tradeForm, setTradeForm] = useState({
    haveCards: '',
    wantCard: '',
    playerName: '',
    cardSet: '',
    year: '',
    maxBudget: '',
    description: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSellForm(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files!)]
      }));
    }
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sell form submitted:', sellForm);
    alert('Thank you! We\'ll review your submission and get back to you within 24 hours.');
  };

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trade form submitted:', tradeForm);
    alert('Trade inquiry submitted! We\'ll contact you soon to discuss possibilities.');
  };

  const benefits = [
    {
      icon: DollarSign,
      title: 'Up to 85% of Market Value',
      description: 'We offer competitive rates based on current market conditions and card liquidity'
    },
    {
      icon: TrendingUp,
      title: 'Expert Market Analysis',
      description: 'Our CPA background ensures accurate valuations using real market data'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Professional handling with full insurance coverage during the entire process'
    },
    {
      icon: CheckCircle,
      title: 'Quick Turnaround',
      description: 'Fast evaluation and payment within 48 hours of receiving your cards'
    }
  ];

  const consolidationExamples = [
    {
      have: ['Connor McDavid PSA 9 ($800)', 'Sidney Crosby BGS 9 ($600)', 'Nathan MacKinnon PSA 9 ($400)'],
      get: 'Wayne Gretzky PSA 8 Rookie ($1,500)',
      value: '$1,800 → $1,500 + Cash'
    },
    {
      have: ['Multiple mid-tier rookies ($200-500 each)', '5-8 cards total value $2,000'],
      get: 'Single high-grade vintage card ($1,800)',
      value: 'Portfolio consolidation'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-primary-bg">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-primary-text via-brand-button-hover to-brand-primary-bg text-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-accent-gold">
              Sell & Trade Your Cards
            </h1>
            <p className="text-xl text-brand-secondary-bg max-w-3xl mx-auto">
              Get up to 85% of market value for your cards or consolidate your collection into grail pieces
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-secondary-text mb-4">Why Sell to Slab Savvy CPA?</h2>
          <p className="text-brand-secondary-text/70 max-w-2xl mx-auto">
            Professional evaluation, competitive pricing, and expert service backed by CPA expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-brand-secondary-text rounded-xl shadow-brand p-6 text-center hover:shadow-brand-lg transition-shadow border border-brand-border hover-lift">
                <div className="w-12 h-12 bg-brand-secondary-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-brand-accent-gold" />
                </div>
                <h3 className="font-bold text-brand-primary-text mb-2">{benefit.title}</h3>
                <p className="text-brand-primary-text/70 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Consolidation Examples */}
        <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 mb-16 border border-brand-border">
          <div className="text-center mb-8">
            <ArrowUpDown className="w-12 h-12 text-brand-accent-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-primary-text mb-2">Consolidation Trade Examples</h3>
            <p className="text-brand-primary-text/70">Turn multiple cards into your dream grail piece</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {consolidationExamples.map((example, index) => (
              <div key={index} className="bg-brand-secondary-bg rounded-lg p-6 border border-brand-border">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-brand-primary-text mb-2">You Have:</h4>
                    <ul className="space-y-1">
                      {example.have.map((card, cardIndex) => (
                        <li key={cardIndex} className="text-brand-primary-text/70 text-sm flex items-center">
                          <div className="w-2 h-2 bg-brand-accent-gold rounded-full mr-2"></div>
                          {card}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <ArrowUpDown className="w-6 h-6 text-brand-accent-gold" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-brand-primary-text mb-2">You Get:</h4>
                    <p className="text-brand-primary-text/70 text-sm">{example.get}</p>
                    <p className="text-brand-accent-gold font-medium text-sm mt-1">{example.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-brand-secondary-text rounded-lg shadow-brand mb-8 border border-brand-border">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('sell')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === 'sell'
                  ? 'border-brand-accent-gold text-brand-accent-gold'
                  : 'border-transparent text-brand-primary-text hover:text-brand-accent-gold hover:border-brand-border'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Sell Your Cards</span>
            </button>
            <button
              onClick={() => setActiveTab('trade')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === 'trade'
                  ? 'border-brand-accent-gold text-brand-accent-gold'
                  : 'border-transparent text-brand-primary-text hover:text-brand-accent-gold hover:border-brand-border'
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Consolidation Trades</span>
            </button>
          </div>
        </div>

        {/* Sell Form */}
        {activeTab === 'sell' && (
          <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-brand-primary-text mb-2">Sell Your Cards</h3>
              <p className="text-brand-primary-text/70">
                Fill out the form below and we'll provide a competitive offer within 24 hours
              </p>
            </div>

            <form onSubmit={handleSellSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Player Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={sellForm.playerName}
                    onChange={(e) => setSellForm(prev => ({ ...prev, playerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="e.g., Connor McDavid"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Card Set *
                  </label>
                  <input
                    type="text"
                    required
                    value={sellForm.cardSet}
                    onChange={(e) => setSellForm(prev => ({ ...prev, cardSet: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="e.g., Upper Deck Young Guns"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={sellForm.year}
                    onChange={(e) => setSellForm(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="e.g., 2015-16"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Grading Company
                  </label>
                  <select
                    value={sellForm.grader}
                    onChange={(e) => setSellForm(prev => ({ ...prev, grader: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                  >
                    <option value="">Select grader</option>
                    <option value="PSA">PSA</option>
                    <option value="BGS">BGS</option>
                    <option value="SGC">SGC</option>
                    <option value="CSG">CSG</option>
                    <option value="Ungraded">Ungraded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Grade/Condition *
                  </label>
                  <input
                    type="text"
                    required
                    value={sellForm.grade}
                    onChange={(e) => setSellForm(prev => ({ ...prev, grade: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="e.g., PSA 10, BGS 9.5, NM-MT"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={sellForm.quantity}
                    onChange={(e) => setSellForm(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Your Asking Price (Optional)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-brand-border" />
                  <input
                    type="text"
                    value={sellForm.askingPrice}
                    onChange={(e) => setSellForm(prev => ({ ...prev, askingPrice: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="Leave blank for our offer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Additional Details
                </label>
                <textarea
                  rows={4}
                  value={sellForm.description}
                  onChange={(e) => setSellForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                  placeholder="Any additional information about the card's condition, history, or special features..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Card Images
                </label>
                <div className="border-2 border-dashed border-brand-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-brand-border mx-auto mb-2" />
                  <p className="text-brand-primary-text/70 mb-2">Upload clear photos of your card</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="card-images"
                  />
                  <label
                    htmlFor="card-images"
                    className="bg-brand-accent-gold hover:bg-brand-button-hover text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Choose Files
                  </label>
                  {sellForm.images.length > 0 && (
                    <p className="text-sm text-brand-primary-text/70 mt-2">
                      {sellForm.images.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-accent-gold hover:bg-brand-button-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get My Offer
              </button>
            </form>
          </div>
        )}

        {/* Trade Form */}
        {activeTab === 'trade' && (
          <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-brand-primary-text mb-2">Consolidation Trades</h3>
              <p className="text-brand-primary-text/70">
                Trade multiple cards for a single grail piece. Tell us what you have and what you want!
              </p>
            </div>

            <form onSubmit={handleTradeSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Cards You Have to Trade *
                </label>
                <textarea
                  rows={4}
                  required
                  value={tradeForm.haveCards}
                  onChange={(e) => setTradeForm(prev => ({ ...prev, haveCards: e.target.value }))}
                  className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                  placeholder="List all cards you're willing to trade, including player names, sets, years, grades, and estimated values..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Target Player *
                  </label>
                  <input
                    type="text"
                    required
                    value={tradeForm.playerName}
                    onChange={(e) => setTradeForm(prev => ({ ...prev, playerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="e.g., Wayne Gretzky"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Target Card Set
                  </label>
                  <input
                    type="text"
                    value={tradeForm.cardSet}
                    onChange={(e) => setTradeForm(prev => ({ ...prev, cardSet: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="e.g., O-Pee-Chee Rookie"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Target Year
                  </label>
                  <input
                    type="text"
                    value={tradeForm.year}
                    onChange={(e) => setTradeForm(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    placeholder="e.g., 1979-80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Maximum Budget (if adding cash)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-brand-border" />
                    <input
                      type="text"
                      value={tradeForm.maxBudget}
                      onChange={(e) => setTradeForm(prev => ({ ...prev, maxBudget: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                      placeholder="Optional cash to add"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Specific Card You Want *
                </label>
                <textarea
                  rows={3}
                  required
                  value={tradeForm.wantCard}
                  onChange={(e) => setTradeForm(prev => ({ ...prev, wantCard: e.target.value }))}
                  className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                  placeholder="Describe the exact card you're looking for, including preferred grade range..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  value={tradeForm.description}
                  onChange={(e) => setTradeForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                  placeholder="Any other details about your trade preferences or timeline..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-accent-gold hover:bg-brand-button-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <ArrowUpDown className="w-5 h-5 mr-2" />
                Submit Trade Inquiry
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};