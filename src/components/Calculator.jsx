/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import './Calculator.css';

const initialState = {
  input: '',
  result: ''
};

const ACTIONS = {
  ADD_INPUT: 'add-input',
  CLEAR: 'clear',
  DELETE: 'delete',
  CALCULATE: 'calculate'
};

const operators = ['+', '-', '*', '/'];
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_INPUT:
      const value = action.payload;
      const lastChar = state.input.slice(-1);

      if (operators.includes(value) && operators.includes(lastChar)) {
        return state; 
      }
      return { ...state, input: state.input + value };

    case ACTIONS.CLEAR:
      return { input: '', result: '' };

    case ACTIONS.DELETE:
      return { ...state, input: state.input.slice(0, -1) };

    case ACTIONS.CALCULATE:
      try {
        const result = eval(state.input);
        if (!Number.isFinite(result)) {
          throw new Error('Cannot divide by zero');
        }
        return { input: result.toString(), result: result.toString() };
      } catch (error) {
        console.error(error);
        return state;
      }
    default:
      return state;
  }
}

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInput = (value) => {
    dispatch({ type: ACTIONS.ADD_INPUT, payload: value });
  };

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE });
  };

  const handleCalculate = () => {
    dispatch({ type: ACTIONS.CALCULATE });
  };

  return (
    <div className="container-calculator">
      <div className="display">{state.input || '0'}</div>
      <div className="button-grid">
        <button onClick={handleClear}>AC</button>
        <button onClick={handleDelete}>DEL</button>
        <button onClick={() => handleInput('/')}>/</button>
        <button onClick={() => handleInput('*')}>*</button>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('-')}>-</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('+')}>+</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
      </div>
    </div>
  );
};
export default Calculator;
