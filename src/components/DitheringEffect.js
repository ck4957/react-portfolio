import React from 'react';
import './DitheringEffect.scss';

const DitheringEffect = ({ children, intensity = 'medium' }) => {
  return (
    <div className={`dithering-container dithering-${intensity}`}>
      {children}
    </div>
  );
};

export default DitheringEffect;
