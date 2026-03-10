import React from 'react';
import { ComingSoon } from '../components/ComingSoon';

export const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ssc-ivory">
      <ComingSoon
        title="ADMIN PANEL"
        message="The admin dashboard is under development."
        showHomeLink={true}
      />
    </div>
  );
};