import React from 'react'
import './../styles/form.css'

export default function Form({socket, createRoomCallback}) {

  const handleCreateRoom = () => {
    const { connected } = socket.connect()
    createRoomCallback(connected)
  }

  return (
    <>
      <div className='form-container'>
        <input type='text' placeholder='Username' />
        <input type='text' placeholder='Room Name' />
        <div className='btn-container'>
          <button onClick={handleCreateRoom}>CREATE</button>
          <button>JOIN</button>
        </div>
      </div>
    </>
  )
}
