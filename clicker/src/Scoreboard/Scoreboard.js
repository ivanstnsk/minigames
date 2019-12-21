import React from 'react';
import './Scoreboard.css';

function pad(num, size) {
  var s = "000000000" + num;
  const str = s.substr(s.length-size);
  return str.split('');
}

function renderCells(label, score) {
  const rows = score.map((it, index) => (
    <div key={`scoreChunk${index}`} className="scoreboard-cell">{it}</div>
  ));
  return (
    <div className="scoreboard-row">
      <span className="scoreboard-label">{label}</span>
      {rows}
    </div>
  )
}

export default function Scoreboard({ balance, goldBalance }) {
  const goldCells = pad(goldBalance, 6);
  const balanceCells = pad(balance, 9);
  return (
    <div className="scoreboard">
      {renderCells('G', goldCells)}
      {renderCells('$', balanceCells)}
    </div>
  );
}