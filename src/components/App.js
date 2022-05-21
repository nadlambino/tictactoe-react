import './../styles/app.css';
import React from 'react';
import Board from './Board.js';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Board />
      </div>
    );
  }
}

export default App;
