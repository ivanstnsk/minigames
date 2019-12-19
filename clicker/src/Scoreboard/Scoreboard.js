import React from 'react';
import './Scoreboard.css';

function renderCells(score) {
  return score.map(it => (
    <div className="scoreboard-cell">{it}</div>
  ));
}

export default function Scoreboard() {
  const score = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  return (
    <div className="scoreboard">
      {renderCells(score)}
    </div>
  );
}