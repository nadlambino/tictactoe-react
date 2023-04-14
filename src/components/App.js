import './../styles/app.css';
import React, { useState } from 'react';
import Board from './Board.js';
import Form from './Form';

export default function App({socket}) {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')

  const createRoomCallback = async ({username, room}) => {
    socket.connect()
    setConnected(true)
    setUsername(username)
    socket.emit('join', {username, room})
  }

  return (
    <div className='app'>
      {
        !connected ? 
        <Form 
          createRoomCallback={createRoomCallback} 
        />
        :
        <Board 
          socket={socket}
          username={username}
        />
      }
    </div>
  )
}
