import React from 'react';
import { ComingSoon } from '../components/ComingSoon';

export const AccountPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ssc-ivory">
      <ComingSoon
        title="ACCOUNTS COMING SOON"
        message="User accounts, wishlists, and order history are being built. Check back soon."
      />
    </div>
  );
};