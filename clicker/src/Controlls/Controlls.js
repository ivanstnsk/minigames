import React from 'react';
import './Controlls.css';

export default function Controlls(props) {
  const {
    clickerPower,
    onClickerClick,
    onControllClick,
    controlls,
    canSumGenerators,
  } = props;

  return (
    <div className="controlls">
      <button
        className="controlls-button"
        onClick={onClickerClick}
      >
        Get ${clickerPower}
      </button>
      {controlls.generator && (
        <button
          className="controlls-button"
          disabled={!canSumGenerators}
          onClick={() => onControllClick('generator')}
        >
          Sum generators
        </button>
      )}
    </div>
  );
}
