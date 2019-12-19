import React from 'react';
import Scoreboard from './Scoreboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="score-wrapper">
        <div className="score-title">Balance</div>
        <Scoreboard />
      </div>
      <div className="content-wrapper">
        content
      </div>
    </div>
  );
}

export default App;
