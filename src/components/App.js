import './../styles/app.css';
import React, { useEffect, useState } from 'react';
import Board from './Board.js';
import Form from './Form';

export default function App({socket}) {
  const [connected, setConnected] = useState(false)
  const [room, setRoom] = useState('')

  const createRoomCallback = async ({username, room}) => {
    socket.connect()
    setConnected(true)
    setRoom(room)
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
          room={room}
        />
      }
    </div>
  )
}
