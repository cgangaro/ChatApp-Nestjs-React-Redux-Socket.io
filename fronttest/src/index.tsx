
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './State/index';
import {SocketContext, socket} from './Context/socketContext'

ReactDOM.render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider> */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);