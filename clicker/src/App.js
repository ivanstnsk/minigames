import React, { useState, useEffect, useCallback } from 'react';
import Scoreboard from './Scoreboard';
import Stats from './Stats';
import Generators from './Generators';
import './App.css';

const GENERATOR_PRICE = 2;
const GENERATORS_DELAY_MS = 5000;

function App() {
  const [ balance, setBalance ] = useState(0);
  const [ clickerPower, setClickerPower ] = useState(1);
  const [ generators, setGenerators ] = useState([]);

  const handleClickerClick = useCallback(() => {
    setBalance(balance + clickerPower)
  }, [balance, clickerPower, setBalance]);

  const nextClickerPowerPrice = (clickerPower + 1) * 16;
  const canBuyGenerator = generators.length < 10 && balance >= GENERATOR_PRICE;

  const handleBuyClickerPower = useCallback(() => {
    if (balance >= nextClickerPowerPrice) {
      setBalance(balance - nextClickerPowerPrice);
      setClickerPower(clickerPower + 1);
    }
  });

  const handleBuyGeneratorClick = useCallback(() => {
      if (canBuyGenerator) {
        setBalance(balance - GENERATOR_PRICE);
        setGenerators([...generators, 1]);
      }
  });

  const handleGeneratorClick = useCallback((generatorIndex) => {
    setBalance(balance + generators[generatorIndex]);
    const nextGenerators = Array.from(generators);
    nextGenerators[generatorIndex] = 0;
    setGenerators(nextGenerators)
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (generators) {
        const nextGenerators = generators.map(it => {
          if (it + 1 > 999) {
            return 999;
          }
          return it + 1;
        });
        setGenerators(nextGenerators);
      }
    }, GENERATORS_DELAY_MS);
    return () => clearTimeout(timer);
  }, [generators]);

  return (
    <div className="App">
      <div className="score-wrapper">
        <div className="score-title">Balance</div>
        <Scoreboard balance={balance} />
      </div>
      <Stats
        clickerPower={clickerPower}
        generatorsCount={generators.length}
      />
      <Generators
        generators={generators}
        handleClick={handleGeneratorClick}
      />
      <div className="content-wrapper">
        <button onClick={handleClickerClick}>Get ${clickerPower}</button>
        <button
          onClick={handleBuyClickerPower}
          disabled={balance <= nextClickerPowerPrice}
        >
          Buy +1<br />(${nextClickerPowerPrice})
        </button>
        <button
          onClick={handleBuyGeneratorClick}
          disabled={!canBuyGenerator}
        >
          Buy Generator<br />(${GENERATOR_PRICE})
        </button>
      </div>
    </div>
  );
}

export default App;
