import React, { useState } from 'react'
import './../styles/form.css'

export default function Form({createRoomCallback}) {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const handleCreateRoom = () => {
    if (username.length === 0 || room.length === 0) {
      return alert('Please provide a username and a room id')
    }

    createRoomCallback({username, room})
  }

  const handleUsernameChange = (username) => {
    setUsername(username)
  }

  const handleRoomChange = (room) => {
    setRoom(room)
  }

  return (
    <>
      <div className='form-container'>
        <input type='text' placeholder='Username' value={username} onChange={(e) => handleUsernameChange(e.target.value)} />
        <input type='text' placeholder='Room Name' onChange={(e) => handleRoomChange(e.target.value)} />
        <div className='btn-container'>
          <button onClick={handleCreateRoom}>CREATE</button>
          <button>JOIN</button>
        </div>
      </div>
    </>
  )
}
