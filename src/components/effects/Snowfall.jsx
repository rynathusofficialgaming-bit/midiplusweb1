import React from 'react';
import './Snowfall.css';

const Snowfall = () => {
  const snowflakes = Array.from({ length: 150 }).map((_, i) => (
    <div key={i} className="snowflake"></div>
  ));

  return <div className="snowfall-container">{snowflakes}</div>;
};

export default Snowfall;