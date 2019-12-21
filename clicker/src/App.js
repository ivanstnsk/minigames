import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Scoreboard from './Scoreboard';
import Stats from './Stats';
import Generators from './Generators';
import Controlls from './Controlls';

import './App.css';

const GENERATOR_PRICE = 2;
const CONTROLL_GENERATOR_PRICE = 2;
const GENERATORS_DELAY_MS = 5000;
const GOLD_PRICE = 10000;

function App() {
  const [ balance, setBalance ] = useState(0);
  const [ goldBalance, setGoldBalance ] = useState(0);
  const [ clickerPower, setClickerPower ] = useState(1);
  const [ generators, setGenerators ] = useState([]);
  const [ controlls, setControlls ] = useState({});

  const handleClickerClick = useCallback(() => {
    setBalance(balance + clickerPower)
  }, [balance, clickerPower, setBalance]);

  const nextClickerPowerPrice = (clickerPower + 1) * 16;
  const canBuyGenerator = generators.length < 10 && balance >= GENERATOR_PRICE;
  const canBuyGold = balance >= GOLD_PRICE;
  const canBuyGeneratorControll = balance >= CONTROLL_GENERATOR_PRICE && !controlls.generator;
  const canSumGenerators = generators.some(it => it > 0);
  
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

  const handleBuyGoldClick = useCallback(() => {
    if (canBuyGold) {
      setBalance(balance - GOLD_PRICE);
      setGoldBalance(goldBalance + 1);
    }
  }, [ balance, goldBalance, canBuyGold ]);

  const handleControllClick = useCallback((controllId) => {
    if (controllId === 'generator') {
      let deltaBalance = 0;
      for (let i = 0; i < generators.length; i += 1) {
       deltaBalance += generators[i];
      }
      setBalance(balance + deltaBalance);
      setGenerators(generators.map(() => 0));
    }
  }, [ balance, generators, setBalance, setGenerators ]);


  const handleBuyGeneratorControllClick = useCallback(() => {
    if (canBuyGeneratorControll) {
      setBalance(balance - CONTROLL_GENERATOR_PRICE);
      setControlls({
        ...controlls,
        generator: {}
      });
    }
  }, [ balance, controlls, setBalance, setControlls, canBuyGeneratorControll ]);

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
        <Scoreboard
          goldBalance={goldBalance}
          balance={balance}
        />
      </div>
      <Stats
        clickerPower={clickerPower}
        generatorsCount={generators.length}
      />
      <Generators
        generators={generators}
        handleClick={handleGeneratorClick}
      />
      <Controlls
        controlls={controlls}
        clickerPower={clickerPower}
        onClickerClick={handleClickerClick}
        onControllClick={handleControllClick}
        canSumGenerators={canSumGenerators}
      />
      <div className="content-wrapper">
        <button
          onClick={handleBuyGoldClick}
          disabled={!canBuyGold}
        >
          Buy 1G<br />(${GOLD_PRICE})
        </button>

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
        <button
          onClick={handleBuyGeneratorControllClick}
          disabled={!canBuyGeneratorControll}
        >
          Buy Generator Controll<br />(${CONTROLL_GENERATOR_PRICE})
        </button>
      </div>
    </div>
  );
}

export default App;
