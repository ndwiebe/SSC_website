import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ConsultingPage } from './pages/ConsultingPage';
import { LoginPage } from './pages/LoginPage';
import { AccountPage } from './pages/AccountPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { CartPage } from './pages/CartPage';
import { PaymentPage } from './pages/PaymentPage';
import { ContentHubPage } from './pages/ContentHubPage';
import { SellTradePage } from './pages/SellTradePage';
import { CardProvider } from './contexts/CardContext';

function App() {
  return (
    <CardProvider>
      <Router>
        <div className="min-h-screen bg-ssc-ivory flex flex-col font-body">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/consulting" element={<ConsultingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/content" element={<ContentHubPage />} />
              <Route path="/sell-trade" element={<SellTradePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;