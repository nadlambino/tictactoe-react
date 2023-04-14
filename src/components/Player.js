import React from 'react'
import { VscClose, VscCircleLargeOutline } from 'react-icons/vsc';

export default function Player({player}) {
  switch (player) {
    case '1':
      return (
        <span className='text'>
          Playing as &nbsp;
          <VscClose className='x-icon' />
        </span>
      );
    case '-1':
      return (
        <span className='text'>
          Playing as &nbsp;
          <VscCircleLargeOutline className='o-icon' />
        </span>
      )
    default:
      return '';
  }
}
