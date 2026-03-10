import React from 'react';
import { ComingSoon } from '../components/ComingSoon';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ssc-black">
      <ComingSoon
        title="ACCOUNTS COMING SOON"
        message="User accounts, wishlists, and order tracking are on the way. For now, browse the catalog or reach out through the contact page."
      />
    </div>
  );
};