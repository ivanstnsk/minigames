import React from 'react';
import './Generators.css';

export default function Generators({ generators, handleClick, generatorsPower }) {
  return (
    <div className="generators">
      {generators && generators.map((it, index) => (
        <button
          key={`generator${index}`}
          className="generator-item"
          onClick={() => handleClick(index)}
          style={{
            backgroundColor: `rgba(0,${it < 256 ? it : 255},0)`
          }}
        >
          <div className="generator-item-level">
            Lvl: {generatorsPower > 10 ? 'Max' : generatorsPower}
          </div>
          ${it}
        </button>
      ))}
    </div>
  );
}