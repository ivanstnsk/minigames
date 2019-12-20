import React, { useState, useEffect, useCallback } from 'react';
import Scoreboard from './Scoreboard';
import Stats from './Stats';
import './App.css';

function App() {
  const [ balance, increaseBalance ] = useState(0);
  const [ clickerPower, setClickerPower ] = useState(1);

  const handleSetClickerPower = useCallback(() => {
    setClickerPower(clickerPower + 1) 
  }, [ clickerPower, setClickerPower]);

  const handleClickerClick = useCallback(() => {
    increaseBalance(balance + clickerPower)
  }, [balance, clickerPower, increaseBalance]);

  console.log('refresh');

  return (
    <div className="App">
      <div className="score-wrapper">
        <div className="score-title">Balance</div>
        <Scoreboard balance={balance} />
      </div>
      <Stats
        clickerPower={clickerPower}
      />
      <div className="content-wrapper">
        <button onClick={handleClickerClick}>+++++</button>
        <button onClick={handleSetClickerPower}>Size {clickerPower}</button>
      </div>
    </div>
  );
}

export default App;
