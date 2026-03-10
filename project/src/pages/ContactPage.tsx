import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, Send, Instagram, Youtube, Facebook } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Thanks for reaching out. I will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Response within 24 hours',
      value: 'hello@slabsavvycpa.com',
      action: 'mailto:hello@slabsavvycpa.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Monday to Friday, 9 AM to 5 PM MST',
      value: 'Schedule a Call',
      action: '#'
    },
    {
      icon: Facebook,
      title: 'Facebook DM',
      description: 'Find me in the collector groups',
      value: 'Slab Savvy CPA',
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-ssc-ivory">
      {/* Hero Section */}
      <div className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-ssc-gold tracking-wide mb-6">
              GET IN TOUCH
            </h1>
            <p className="font-body text-xl text-ssc-chrome max-w-3xl mx-auto">
              Got a question about your card taxes? Need help with your books? Or just want to talk about
              a card you pulled? I'm around.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.action}
                className="bg-ssc-white border border-ssc-border p-8 text-center hover:shadow-card-hover hover:border-ssc-gold transition-all group hover-lift"
              >
                <div className="w-14 h-14 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-7 h-7 text-ssc-gold" />
                </div>
                <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-2">{method.title.toUpperCase()}</h3>
                <p className="font-body text-ssc-text-secondary mb-4">{method.description}</p>
                <div className="font-body font-semibold text-ssc-gold">{method.value}</div>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-ssc-white border border-ssc-border p-8">
            <h2 className="font-headline text-2xl text-ssc-text tracking-wide mb-6">SEND A MESSAGE</h2>

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
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-ssc-text mb-2">What's this about?</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData(prev => ({ ...prev, inquiryType: e.target.value }))}
                  className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                >
                  <option value="general">General Question</option>
                  <option value="cards">Cards & Trading</option>
                  <option value="tax">Tax Preparation</option>
                  <option value="consulting">Business Consulting</option>
                  <option value="playbook">Tax Playbook</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-ssc-text mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                  placeholder="Brief subject"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-ssc-text mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                  placeholder="What can I help with?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ssc-gold hover:bg-ssc-gold-dark disabled:bg-ssc-chrome-dark text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info sidebar */}
          <div className="space-y-8">
            <div className="bg-ssc-white border border-ssc-border p-8">
              <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-6">HOURS</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-ssc-gold flex-shrink-0" />
                  <div>
                    <div className="font-body font-medium text-ssc-text">Monday - Friday</div>
                    <div className="font-body text-ssc-text-secondary">9:00 AM - 5:00 PM MST</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-ssc-gold flex-shrink-0" />
                  <div>
                    <div className="font-body font-medium text-ssc-text">Saturday</div>
                    <div className="font-body text-ssc-text-secondary">By appointment</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-ssc-chrome-dark flex-shrink-0" />
                  <div>
                    <div className="font-body font-medium text-ssc-text">Sunday</div>
                    <div className="font-body text-ssc-text-secondary">Closed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-ssc-white border border-ssc-border p-8">
              <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-6">LOCATION</h3>
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-ssc-gold flex-shrink-0 mt-1" />
                <div>
                  <div className="font-body font-medium text-ssc-text">Sherwood Park, Alberta</div>
                  <div className="font-body text-ssc-text-secondary">
                    Serving clients across Canada. All consultations available remotely.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-ssc-white border border-ssc-border p-8">
              <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-6">FIND ME</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center space-x-4 p-3 border border-ssc-border hover:border-ssc-gold transition-colors">
                  <Facebook className="w-5 h-5 text-ssc-gold" />
                  <div>
                    <div className="font-body font-medium text-ssc-text">Facebook Groups</div>
                    <div className="font-body text-sm text-ssc-text-secondary">Slab Savvy CPA in 15+ collector groups</div>
                  </div>
                </a>
                <a href="#" className="flex items-center space-x-4 p-3 border border-ssc-border hover:border-ssc-gold transition-colors">
                  <Instagram className="w-5 h-5 text-ssc-gold" />
                  <div>
                    <div className="font-body font-medium text-ssc-text">Instagram</div>
                    <div className="font-body text-sm text-ssc-text-secondary">@slabsavvycpa</div>
                  </div>
                </a>
                <a href="#" className="flex items-center space-x-4 p-3 border border-ssc-border hover:border-ssc-gold transition-colors">
                  <Youtube className="w-5 h-5 text-ssc-gold" />
                  <div>
                    <div className="font-body font-medium text-ssc-text">YouTube</div>
                    <div className="font-body text-sm text-ssc-text-secondary">Slab Savvy CPA</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-ssc-white border-t border-ssc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl text-ssc-gold tracking-wide mb-4">
              COMMON QUESTIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How do I buy a card from you?',
                answer: 'Browse the catalog, add to cart, and check out. Every card is graded and ships insured.'
              },
              {
                question: 'Are all cards authenticated?',
                answer: 'Yes. Every card is professionally graded by PSA, BGS, or SGC before I list it.'
              },
              {
                question: 'Do you handle card business taxes?',
                answer: 'That is literally my specialty. CPA who collects cards. I get the hobby and the tax code.'
              },
              {
                question: 'How fast do you respond?',
                answer: 'Usually within a few hours during business hours. 24 hours max on weekends.'
              },
              {
                question: 'Do you accept trades?',
                answer: 'Sometimes. Send me what you have through the Sell/Trade page and we can figure it out.'
              },
              {
                question: 'What is the Tax Playbook?',
                answer: 'A $29 digital guide covering everything Canadian collectors need to know about taxes on card sales. Written by me.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-ssc-ivory border border-ssc-border p-6">
                <h3 className="font-body font-bold text-ssc-text mb-3">{faq.question}</h3>
                <p className="font-body text-ssc-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};