import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SpreadsheetPage } from './pages/SpreadsheetPage';
import { TaxReadyPage } from './pages/TaxReadyPage';
import { WaitlistPage } from './pages/WaitlistPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ssc-bg flex flex-col font-body">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spreadsheet" element={<SpreadsheetPage />} />
            <Route path="/taxready" element={<TaxReadyPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
