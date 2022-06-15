import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, store } from './State';
import { RootState } from './State/Reducers';
import AffMsg from './Components/AffMsg';
import FriendsList from './Components/FriendsList';
import HistoryList from './Components/HistoryList';
import { validateInput } from './Utils/logUtils';
import Test from './Components/Test';
import LoginPage from './Components/LoginPage';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Test1 from './Tests/Test1';
import Test2 from './Tests/Test2';
import Chat from './Components/Chat';

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
        <Chat />
          {/* <FriendsList />
          <AffMsg /> */}
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