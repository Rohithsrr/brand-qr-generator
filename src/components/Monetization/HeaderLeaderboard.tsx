'use client';

import React from 'react';
import { AdSlot } from './AdSlot';

export const HeaderLeaderboard: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-2">
      <AdSlot
        slotId="9876543210"
        format="horizontal"
        minHeight={90}
        label="SPONSORED PARTNER"
        className="max-w-4xl mx-auto"
      />
    </div>
  );
};
