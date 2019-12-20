import React from 'react';
import './Scoreboard.css';

function pad(num, size) {
  var s = "000000000" + num;
  const str = s.substr(s.length-size);
  return str.split('');
}

function renderCells(score) {
  return score.map((it, index) => (
    <div key={`scoreChunk${index}`} className="scoreboard-cell">{it}</div>
  ));
}

export default function Scoreboard({ balance }) {
  const balanceCells = pad(balance, 10);
  return (
    <div className="scoreboard">
      {renderCells(balanceCells)}
    </div>
  );
}