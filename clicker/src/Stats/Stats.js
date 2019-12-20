import React from 'react';
import './Stats.css';

export default function Stats({ clickerPower, generatorsCount }) {
  return (
    <div className="stats">
      Clicker Power: {clickerPower} | Generators {generatorsCount}/10
    </div>
  );
}