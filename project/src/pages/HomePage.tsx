import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, TrendingUp, BookOpen, Star, Shield, Users } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CardGrid } from '../components/CardGrid';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide">
            FEATURED CARDS
          </h2>
          <p className="font-body text-ssc-text-secondary mt-3 max-w-2xl mx-auto">
            Hand-selected graded cards from my collection. Authenticated, graded, and ready for serious collectors.
          </p>
        </div>

        <CardGrid showFeaturedOnly={true} limit={6} />

        <div className="text-center mt-8">
          <Link
            to="/catalog"
            className="inline-flex items-center px-8 py-3 bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark transition-colors shadow-gold hover-lift"
          >
            View Full Catalog
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-ssc-white border-y border-ssc-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide">
              WHAT I DO
            </h2>
            <p className="font-body text-ssc-text-secondary mt-3 max-w-3xl mx-auto">
              I'm a CPA who collects cards. That means I actually understand what you're dealing with
              when tax season rolls around and your eBay sales are all over the place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tax Help */}
            <div className="bg-ssc-ivory border border-ssc-border p-8 hover:shadow-card-hover transition-shadow group hover-lift">
              <div className="w-12 h-12 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6 text-ssc-gold" />
              </div>
              <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-4">TAX PREP & PLANNING</h3>
              <p className="font-body text-ssc-text-secondary mb-6">
                Personal and corporate tax returns, CRA audit support, and planning strategies that actually
                make sense for collectors and small business owners.
              </p>
              <Link
                to="/consulting"
                className="text-ssc-gold font-body font-semibold hover:text-ssc-gold-dark transition-colors inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Business Consulting */}
            <div className="bg-ssc-ivory border border-ssc-border p-8 hover:shadow-card-hover transition-shadow group hover-lift">
              <div className="w-12 h-12 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-ssc-gold" />
              </div>
              <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-4">BUSINESS CONSULTING</h3>
              <p className="font-body text-ssc-text-secondary mb-6">
                Financial analysis, cash flow management, and growth strategy. Whether you're flipping
                cards full-time or running a side hustle, I can help you get organized.
              </p>
              <Link
                to="/consulting"
                className="text-ssc-gold font-body font-semibold hover:text-ssc-gold-dark transition-colors inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Tax Playbook */}
            <div className="bg-ssc-ivory border border-ssc-border p-8 hover:shadow-card-hover transition-shadow group hover-lift">
              <div className="w-12 h-12 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-ssc-gold" />
              </div>
              <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-4">THE TAX PLAYBOOK</h3>
              <p className="font-body text-ssc-text-secondary mb-6">
                The Card Collector's Tax Playbook. Everything Canadian collectors need to know about taxes
                when you sell cards. Written by a CPA who actually rips packs.
              </p>
              <Link
                to="/content"
                className="text-ssc-gold font-body font-semibold hover:text-ssc-gold-dark transition-colors inline-flex items-center"
              >
                Get the Playbook <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/consulting"
              className="inline-flex items-center px-8 py-4 bg-ssc-gold text-white font-body font-semibold text-lg hover:bg-ssc-gold-dark transition-colors shadow-gold hover-lift"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Trust Me Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-6">
              WHY WORK WITH ME
            </h2>
            <p className="font-body text-lg text-ssc-text-secondary mb-8">
              Most CPAs don't know what a YG is. Most card dealers don't know what an adjusted cost base is.
              I'm both. That's the whole point.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-ssc-gold" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-ssc-text mb-1">CPA + Collector</h3>
                  <p className="font-body text-ssc-text-secondary">I understand both the tax code and the hobby. You don't have to explain what a slab is.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-ssc-gold" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-ssc-text mb-1">Authenticated Everything</h3>
                  <p className="font-body text-ssc-text-secondary">Every card I sell is professionally graded. Every tax return I file is done right.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-ssc-gold" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-ssc-text mb-1">Active in the Community</h3>
                  <p className="font-body text-ssc-text-secondary">I post in 15+ Facebook collector groups daily. You've probably seen me around.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ecosystem showcase */}
          <div className="bg-ssc-white border border-ssc-border p-8">
            <h3 className="font-headline text-xl text-ssc-gold tracking-wide mb-6">THE SLAB SAVVY ECOSYSTEM</h3>
            <div className="space-y-4">
              <a
                href="https://displaymycard.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-ssc-border p-4 hover:border-ssc-gold hover:shadow-gold transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body font-semibold text-ssc-text">DisplayMyCard</div>
                    <div className="font-body text-sm text-ssc-text-secondary">AI photo enhancement for your cards</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ssc-chrome" />
                </div>
              </a>

              <Link
                to="/content"
                className="block border border-ssc-border p-4 hover:border-ssc-gold hover:shadow-gold transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body font-semibold text-ssc-text">The Tax Playbook</div>
                    <div className="font-body text-sm text-ssc-text-secondary">Canadian tax guide for card collectors</div>
                  </div>
                  <div className="font-mono text-sm font-bold text-ssc-gold">$29</div>
                </div>
              </Link>

              <Link
                to="/consulting"
                className="block border border-ssc-border p-4 hover:border-ssc-gold hover:shadow-gold transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body font-semibold text-ssc-text">CPA Consulting</div>
                    <div className="font-body text-sm text-ssc-text-secondary">Tax prep, business advice, the works</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ssc-chrome" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-ssc-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-4">
              FIND ME IN THE GROUPS
            </h2>
            <p className="font-body text-lg text-ssc-chrome max-w-2xl mx-auto mb-8">
              I'm active in 15+ Facebook collector groups, mostly hockey. If you've got a tax question
              about your card sales, drop it in the comments or send me a DM. Happy to point you in the right direction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/content"
                className="border-2 border-ssc-chrome/30 hover:border-ssc-gold hover:text-ssc-gold text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center"
              >
                Read the Content Hub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};