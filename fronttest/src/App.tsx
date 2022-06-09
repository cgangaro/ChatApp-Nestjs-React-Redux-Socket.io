import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './State';
import { RootState } from './State/Reducers';
import AffMsg from './Components/AffMsg';
import { msgList } from './State/type';
import FriendsList from './Components/FriendsList';
import HistoryList from './Components/HistoryList';
import { validateInput } from './Utils/logUtils';
import Test from './Components/Test';
import LoginPage from './Components/LoginPage';

function App() {

  const logData = useSelector((state: RootState) => state.log)
  const utilsData = useSelector((state: RootState) => state.utils)

  utilsData.socket.on('disconnect', function() {
    console.log('Disconnected');
  });

  function MainAff() {
    if (validateInput(logData.username))
      return (
        <>
          <FriendsList />
          <AffMsg />
          <HistoryList />
        </>
      )
    else
        return (
          <LoginPage />
        )
  }

  return (
    <div className="App">
      <MainAff />
    </div>
  );
}

export default App;