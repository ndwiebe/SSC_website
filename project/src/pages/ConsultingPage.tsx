import React, { useState } from 'react';
import { Calculator, TrendingUp, Shield, Clock, Star, CheckCircle, ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';

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
      title: 'Tax Preparation & Planning',
      icon: Calculator,
      price: 'Starting at $150',
      description: 'Expert CRA tax preparation, planning strategies, and audit support to maximize your returns and ensure compliance.',
      features: [
        'Personal & Corporate Tax Returns',
        'CRA Audit Representation',
        'Tax Planning & Strategy',
        'Quarterly Reviews',
        'Expense Optimization',
        'Deduction Maximization'
      ],
      color: 'green'
    },
    {
      id: 'business',
      title: 'Business Consulting',
      icon: TrendingUp,
      price: 'Starting at $200/hr',
      description: 'Strategic business advice, financial analysis, and growth planning to help your business thrive in competitive markets.',
      features: [
        'Financial Analysis & Reporting',
        'Business Plan Development',
        'Cash Flow Management',
        'Performance Metrics',
        'Growth Strategy',
        'Risk Assessment'
      ],
      color: 'blue'
    },
    {
      id: 'ai',
      title: 'AI Business Automation',
      icon: Shield,
      price: 'Custom Pricing',
      description: 'Leverage cutting-edge AI tools to streamline operations, automate workflows, and boost productivity across your organization.',
      features: [
        'Process Automation',
        'AI Integration Consulting',
        'Workflow Optimization',
        'Custom AI Solutions',
        'Training & Support',
        'ROI Analysis'
      ],
      color: 'purple'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      content: 'The tax planning advice saved my business thousands. Professional, knowledgeable, and always available when I need help.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Card Collector',
      content: 'Helped me properly structure my collecting business for tax purposes. Now I can focus on what I love while staying compliant.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Tech Startup Founder',
      content: 'The AI automation consultation transformed our operations. We\'re now processing 3x more orders with the same team.',
      rating: 5
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      text: 'text-brand-success',
      border: 'border-green-200',
      button: 'bg-brand-success hover:bg-green-600'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-brand-accent-gold',
      border: 'border-blue-200',
      button: 'bg-brand-accent-gold hover:bg-brand-button-hover'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      button: 'bg-purple-600 hover:bg-purple-700'
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary-bg">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-primary-text via-brand-button-hover to-brand-primary-bg text-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-accent-gold">
              Professional Financial Services
            </h1>
            <p className="text-xl md:text-2xl text-brand-secondary-bg max-w-3xl mx-auto mb-8">
              Combining CPA expertise with business innovation to help you achieve your financial goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-accent-gold hover:bg-brand-button-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Services
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-brand-secondary-text hover:bg-brand-secondary-text hover:text-brand-primary-text px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-gold mb-4">
            Expert Services Tailored to Your Needs
          </h2>
          <p className="text-lg text-brand-secondary-text max-w-3xl mx-auto">
            From tax preparation to AI automation, I provide comprehensive financial and business consulting services 
            backed by years of experience and professional certification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            
            return (
              <div 
                key={service.id}
                className={`bg-brand-secondary-text rounded-xl shadow-brand-lg overflow-hidden hover:shadow-brand-xl transition-all duration-300 cursor-pointer border border-brand-border hover-lift ${
                  selectedService === service.id ? `ring-2 ${colors.border}` : ''
                }`}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="p-8">
                  <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-primary-text mb-2">{service.title}</h3>
                  <div className={`text-lg font-semibold ${colors.text} mb-4`}>{service.price}</div>
                  <p className="text-brand-primary-text/70 mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.slice(0, selectedService === service.id ? service.features.length : 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                        <span className="text-brand-primary-text/80">{feature}</span>
                      </div>
                    ))}
                    {selectedService !== service.id && service.features.length > 3 && (
                      <div className="text-sm text-brand-border font-medium">
                        +{service.features.length - 3} more features
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className={`w-full ${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center`}
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
      <section className="bg-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-gold mb-4">
              How We Work Together
            </h2>
            <p className="text-lg text-brand-primary-text/70 max-w-2xl mx-auto">
              A streamlined process designed to deliver maximum value and results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', description: 'Free 30-minute call to understand your needs and goals' },
              { step: '02', title: 'Custom Proposal', description: 'Detailed plan tailored to your specific requirements' },
              { step: '03', title: 'Implementation', description: 'Expert execution with regular progress updates' },
              { step: '04', title: 'Ongoing Support', description: 'Continued partnership and maintenance as needed' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand-accent-gold text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-brand-primary-text mb-2">{item.title}</h3>
                <p className="text-brand-primary-text/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-gold mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-brand-primary-text/70 max-w-2xl mx-auto">
              Real results from real clients who trusted us with their financial and business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-accent-gold fill-current" />
                  ))}
                </div>
                <p className="text-brand-primary-text/70 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-brand-primary-text">{testimonial.name}</div>
                  <div className="text-sm text-brand-border">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-brand-primary-text text-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-accent-gold">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-brand-secondary-bg mb-8">
                Let's discuss how I can help you achieve your financial and business goals. 
                Book a free consultation today.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-button-hover rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-brand-secondary-bg" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone Consultation</div>
                    <div className="text-brand-secondary-bg">Schedule a call at your convenience</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-button-hover rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-brand-secondary-bg" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Response</div>
                    <div className="text-brand-secondary-bg">Get detailed answers within 24 hours</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-button-hover rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-brand-secondary-bg" />
                  </div>
                  <div>
                    <div className="font-semibold">Instant Messaging</div>
                    <div className="text-brand-secondary-bg">Quick questions via WhatsApp or Discord</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
              <h3 className="text-2xl font-bold text-brand-primary-text mb-6">
                Free Consultation Request
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-primary-text mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-brand-primary-text mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Service Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                  >
                    <option value="">Select a service</option>
                    <option value="Tax Preparation & Planning">Tax Preparation & Planning</option>
                    <option value="Business Consulting">Business Consulting</option>
                    <option value="AI Business Automation">AI Business Automation</option>
                    <option value="Multiple Services">Multiple Services</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-primary-text mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your needs and goals..."
                    className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-brand-accent-gold hover:bg-brand-button-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
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