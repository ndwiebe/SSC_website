import React, { useState } from 'react';
import { Calculator, TrendingUp, Cpu, Clock, CheckCircle, ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';

export const ConsultingPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const services = [
    {
      id: 'tax',
      title: 'TAX PREP & PLANNING',
      icon: Calculator,
      price: 'Starting at $150',
      description: 'Personal and corporate tax returns, CRA audit support, and planning strategies. I know how eBay 1099s, grading fee deductions, and hobby vs. business rules actually work.',
      features: [
        'Personal & Corporate Tax Returns',
        'CRA Audit Representation',
        'Tax Planning & Strategy',
        'Quarterly Reviews',
        'Expense Tracking Setup',
        'Collector-Specific Deductions'
      ],
    },
    {
      id: 'business',
      title: 'BUSINESS CONSULTING',
      icon: TrendingUp,
      price: 'Starting at $200/hr',
      description: 'Financial analysis, cash flow management, and growth strategy. Whether you are running a card business or any other small business, I can help you get organized.',
      features: [
        'Financial Analysis & Reporting',
        'Business Plan Development',
        'Cash Flow Management',
        'Performance Tracking',
        'Growth Strategy',
        'Risk Assessment'
      ],
    },
    {
      id: 'ai',
      title: 'AI BUSINESS TOOLS',
      icon: Cpu,
      price: 'Custom Pricing',
      description: 'I use AI tools in my own practice and card business every day. I can help you set up automations, build workflows, and save hours on the stuff you hate doing.',
      features: [
        'Process Automation Setup',
        'AI Tool Selection & Integration',
        'Workflow Design',
        'Custom Solutions',
        'Training & Support',
        'Cost-Benefit Analysis'
      ],
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out. I will get back to you within 24 hours.');
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-ssc-ivory">
      {/* Hero Section */}
      <div className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-6xl text-ssc-gold tracking-wide mb-6">
              CPA SERVICES FOR COLLECTORS
            </h1>
            <p className="font-body text-xl md:text-2xl text-ssc-chrome max-w-3xl mx-auto mb-8">
              Tax prep, business consulting, and AI automation. From a CPA who actually
              understands the hobby.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-8 py-3 font-body font-semibold transition-colors"
              >
                See Services
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-ssc-chrome/30 hover:border-ssc-gold hover:text-ssc-gold text-white px-8 py-3 font-body font-semibold transition-colors"
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-4">
            HOW I CAN HELP
          </h2>
          <p className="font-body text-lg text-ssc-text-secondary max-w-3xl mx-auto">
            Every service is backed by real CPA experience and real knowledge of the hobby.
            No generic advice. No copy-paste templates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className={`bg-ssc-white border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover-lift ${
                  selectedService === service.id ? 'border-ssc-gold' : 'border-ssc-border'
                }`}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="p-8">
                  <div className="w-14 h-14 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-ssc-gold" />
                  </div>

                  <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-2">{service.title}</h3>
                  <div className="font-mono text-lg font-semibold text-ssc-gold mb-4">{service.price}</div>
                  <p className="font-body text-ssc-text-secondary mb-6">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    {service.features.slice(0, selectedService === service.id ? service.features.length : 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-ssc-gold flex-shrink-0" />
                        <span className="font-body text-ssc-text-secondary text-sm">{feature}</span>
                      </div>
                    ))}
                    {selectedService !== service.id && service.features.length > 3 && (
                      <div className="text-sm text-ssc-chrome-dark font-body font-medium">
                        +{service.features.length - 3} more
                      </div>
                    )}
                  </div>

                  <button
                    className="w-full bg-ssc-gold hover:bg-ssc-gold-dark text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, service: service.title }));
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-ssc-white border-y border-ssc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-4">
              HOW IT WORKS
            </h2>
            <p className="font-body text-lg text-ssc-text-secondary max-w-2xl mx-auto">
              Simple process. No surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'FREE CALL', description: '30-minute call to figure out what you need' },
              { step: '02', title: 'CUSTOM PLAN', description: 'A clear proposal with pricing and timeline' },
              { step: '03', title: 'GET IT DONE', description: 'I do the work and keep you updated' },
              { step: '04', title: 'ONGOING HELP', description: 'Questions come up later? I am here' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-ssc-gold text-white flex items-center justify-center font-mono text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-2">{item.title}</h3>
                <p className="font-body text-ssc-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-6">
                LET'S TALK
              </h2>
              <p className="font-body text-xl text-ssc-chrome mb-8">
                Book a free 30-minute consultation. No pressure, no sales pitch.
                Just a conversation about what you need.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ssc-surface border border-ssc-border-dark flex items-center justify-center">
                    <Phone className="w-6 h-6 text-ssc-gold" />
                  </div>
                  <div>
                    <div className="font-body font-semibold">Phone Consultation</div>
                    <div className="font-body text-ssc-chrome">Schedule a call at your convenience</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ssc-surface border border-ssc-border-dark flex items-center justify-center">
                    <Mail className="w-6 h-6 text-ssc-gold" />
                  </div>
                  <div>
                    <div className="font-body font-semibold">Email</div>
                    <div className="font-body text-ssc-chrome">Detailed answers within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ssc-surface border border-ssc-border-dark flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-ssc-gold" />
                  </div>
                  <div>
                    <div className="font-body font-semibold">Facebook DM</div>
                    <div className="font-body text-ssc-chrome">Find me as Slab Savvy CPA in the collector groups</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-ssc-white p-8 border border-ssc-border">
              <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-6">
                FREE CONSULTATION
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-ssc-text mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-ssc-text mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-ssc-text mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-ssc-text mb-2">Service Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                  >
                    <option value="">Select a service</option>
                    <option value="Tax Preparation & Planning">Tax Prep & Planning</option>
                    <option value="Business Consulting">Business Consulting</option>
                    <option value="AI Business Tools">AI Business Tools</option>
                    <option value="Multiple Services">Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-ssc-text mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="What are you looking for help with?"
                    className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ssc-gold hover:bg-ssc-gold-dark text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center"
                >
                  Send Request
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};