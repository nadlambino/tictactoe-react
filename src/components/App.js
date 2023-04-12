import './../styles/app.css';
import React, { useState } from 'react';
import Board from './Board.js';
import Form from './Form';

export default function App() {
  const [connected, setConnected] = useState(false)

  return (
    <div className='app'>
      {
        !connected ? <Form /> : <Board />
      }
    </div>
  )
}
