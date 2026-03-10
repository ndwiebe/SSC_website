import React from 'react';
import { ComingSoon } from '../components/ComingSoon';

export const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ssc-ivory">
      <ComingSoon
        title="CHECKOUT COMING SOON"
        message="Online payments are being set up. Contact me directly to purchase cards."
      />
    </div>
  );
};