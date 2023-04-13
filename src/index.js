import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SERVER_URL;

export const socket = io(URL, {
  autoConnect: false
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App socket={socket} />
);
