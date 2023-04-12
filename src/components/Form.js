import React from 'react'
import './../styles/form.css'

export default function Form() {
  return (
    <>
      <div className='form-container'>
        <input type='text' placeholder='Username' />
        <input type='text' placeholder='Room Name' />
        <div className='btn-container'>
          <button>CREATE</button>
          <button>JOIN</button>
        </div>
      </div>
    </>
  )
}
