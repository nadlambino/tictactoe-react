import './../styles/app.css';
import React, { useState } from 'react';
import Board from './Board.js';
import Form from './Form';

export default function App({socket}) {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [error, setError] = useState('')
  const [serverMessage, setServerMessage] = useState('')

  socket.on('joined', (hasJoined, username) => {
    if (hasJoined) {
      setConnected(true)
      setServerMessage(`Player ${username} has joined the game.`)
    } else {
      setConnected(false)
      setError('Room is already full.')
    }
  })

  const createRoomCallback = async ({username, room}) => {
    socket.connect()
    setUsername(username)
    setRoom(room)
    socket.emit('join', {username, room})
  }

  return (
    <div className='app'>
      {
        !connected ? 
        <Form 
          createRoomCallback={createRoomCallback} 
          error={error}
        />
        :
        <Board 
          socket={socket}
          username={username}
          room={room}
          message={serverMessage}
        />
      }
    </div>
  )
}
