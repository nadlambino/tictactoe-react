import './../styles/app.css';
import React, { useState } from 'react';
import Board from './Board.js';
import Form from './Form';

export default function App({socket}) {
  const [connected, setConnected] = useState(false)

  const createRoomCallback = (isConnected) => {
    setConnected(isConnected)
  }

  return (
    <div className='app'>
      {
        !connected ? 
        <Form 
          socket={socket}
          createRoomCallback={createRoomCallback} 
        /> 
        :
        <Board 
          socket={socket}
        />
      }
    </div>
  )
}
