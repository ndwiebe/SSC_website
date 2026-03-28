import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SpreadsheetPage } from './pages/SpreadsheetPage';
import { TaxReadyPage } from './pages/TaxReadyPage';
import { WaitlistPage } from './pages/WaitlistPage';
import { usePageviewTracking } from './hooks/usePageviewTracking';

const NotFound: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center px-4">
      <h1 className="font-headline text-6xl md:text-8xl text-ssc-gold tracking-wide mb-4">404</h1>
      <p className="font-body text-lg text-ssc-text-muted mb-8">Page not found.</p>
      <Link to="/" className="btn-shine inline-flex items-center min-h-[44px] px-8 py-3 bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark">
        Back to Home
      </Link>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  usePageviewTracking();

  return (
    <div className="min-h-screen bg-ssc-bg flex flex-col font-body overflow-x-hidden">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spreadsheet" element={<SpreadsheetPage />} />
          <Route path="/taxready" element={<TaxReadyPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
