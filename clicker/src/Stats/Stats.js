import React from 'react';
import './Stats.css';

export default function Stats({ clickerPower }) {
  return (
    <div className="stats">
      Clicker Power: {clickerPower}
    </div>
  );
}