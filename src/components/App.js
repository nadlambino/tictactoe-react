import './../styles/app.css';
import React, { useEffect, useState } from 'react';
import Board from './Board.js';
import Form from './Form';

export default function App({socket}) {
  const [connected, setConnected] = useState(false)

  const createRoomCallback = async ({username, room, type}) => {
    socket.connect()
    setConnected(true)
    socket.emit('join_game', {username, room, type})
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
