import React from 'react';
import './FloatingPumpkins.css';

const FloatingPumpkins = () => {
  const pumpkins = Array.from({ length: 20 }).map((_, i) => (
    <div key={i} className="pumpkin-container">
      <div className="pumpkin">🎃</div>
    </div>
  ));

  return <div className="pumpkins-wrapper">{pumpkins}</div>;
};

export default FloatingPumpkins;