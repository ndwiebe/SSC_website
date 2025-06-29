import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, Send, Instagram, Youtube } from 'lucide-react';

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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get a response within 24 hours',
      value: 'hello@slabsavvy.com',
      action: 'mailto:hello@slabsavvy.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Monday to Friday, 9 AM to 6 PM EST',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us on WhatsApp',
      value: 'WhatsApp',
      action: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@slabsavvycpa',
      url: '#',
      color: 'text-pink-600'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: 'Slab Savvy CPA',
      url: '#',
      color: 'text-red-600'
    },
    {
      icon: MessageCircle,
      name: 'Discord',
      handle: 'Join our server',
      url: '#',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-primary-bg">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-primary-text via-brand-button-hover to-brand-primary-bg text-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-accent-gold">
              Get in Touch
            </h1>
            <p className="text-xl text-brand-secondary-bg max-w-3xl mx-auto">
              Have questions about our cards or need professional accounting services? 
              We're here to help you succeed in both your hobby and business.
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
                className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 text-center hover:shadow-brand-xl transition-shadow group border border-brand-border hover-lift"
              >
                <div className="w-16 h-16 bg-brand-secondary-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-accent-gold/10 transition-colors">
                  <Icon className="w-8 h-8 text-brand-accent-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-primary-text mb-2">{method.title}</h3>
                <p className="text-brand-primary-text/70 mb-4">{method.description}</p>
                <div className="text-brand-accent-gold font-semibold">{method.value}</div>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
            <h2 className="text-2xl font-bold text-brand-primary-text mb-6">Send us a Message</h2>
            
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
                    placeholder="Your full name"
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
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Inquiry Type
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData(prev => ({ ...prev, inquiryType: e.target.value }))}
                  className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                >
                  <option value="general">General Question</option>
                  <option value="cards">Cards & Trading</option>
                  <option value="consulting">Consulting Services</option>
                  <option value="tax">Tax Preparation</option>
                  <option value="business">Business Consulting</option>
                  <option value="ai">AI Automation</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                  placeholder="Brief subject line"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-accent-gold hover:bg-brand-button-hover disabled:bg-brand-border text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
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

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
              <h3 className="text-xl font-bold text-brand-primary-text mb-6">Business Hours</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-brand-accent-gold flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-primary-text">Monday - Friday</div>
                    <div className="text-brand-primary-text/70">9:00 AM - 6:00 PM EST</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-brand-accent-gold flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-primary-text">Saturday</div>
                    <div className="text-brand-primary-text/70">10:00 AM - 4:00 PM EST</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-brand-border flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-primary-text">Sunday</div>
                    <div className="text-brand-primary-text/70">Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
              <h3 className="text-xl font-bold text-brand-primary-text mb-6">Office Location</h3>
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-brand-accent-gold flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium text-brand-primary-text">Virtual Office</div>
                  <div className="text-brand-primary-text/70">
                    Serving clients across Canada<br />
                    Remote consultations available
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 border border-brand-border">
              <h3 className="text-xl font-bold text-brand-primary-text mb-6">Follow Us</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-brand-secondary-bg transition-colors group"
                    >
                      <Icon className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform`} />
                      <div>
                        <div className="font-medium text-brand-primary-text">{social.name}</div>
                        <div className="text-brand-primary-text/70 text-sm">{social.handle}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
              <h3 className="text-xl font-bold text-brand-success mb-4">Quick Response Guarantee</h3>
              <p className="text-green-800">
                We typically respond to all inquiries within 2-4 hours during business hours, 
                and within 24 hours on weekends. For urgent matters, please call directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-accent-gold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-brand-primary-text/70">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I purchase a card?",
                answer: "Create an account, browse our catalog, and click 'Buy Now' or 'Claim' on any available card. We'll guide you through the secure checkout process."
              },
              {
                question: "Are all cards authenticated?",
                answer: "Yes, every card in our catalog has been professionally authenticated and graded by reputable services like PSA, BGS, or SGC."
              },
              {
                question: "What consulting services do you offer?",
                answer: "We provide tax preparation, business consulting, and AI automation services. Each service is tailored to your specific needs and goals."
              },
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We typically respond within 2-4 hours during business hours and within 24 hours on weekends. Urgent matters receive priority response."
              },
              {
                question: "Do you offer payment plans?",
                answer: "For high-value cards, we may offer payment plans on a case-by-case basis. Contact us to discuss your specific situation."
              },
              {
                question: "Can I trade cards instead of buying?",
                answer: "Absolutely! We accept trades for cards of equal or greater value. Submit an offer through our contact form with details about your cards."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-brand-secondary-bg rounded-lg p-6 border border-brand-border">
                <h3 className="font-bold text-brand-primary-text mb-3">{faq.question}</h3>
                <p className="text-brand-primary-text/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};