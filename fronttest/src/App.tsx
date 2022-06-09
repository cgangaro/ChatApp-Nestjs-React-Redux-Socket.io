import React from 'react';
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
import Connect from './Connect';
import { validateInput } from './Utils/logUtils';
import Test from './Components/Test';
import LoginPage from './Components/LoginPage';

function App() {

  const dispatch = useDispatch();

  const logData = useSelector((state: RootState) => state.log)

  const { depositMoney, withdrawMoney, bankrupt, msgAdd } = bindActionCreators(actionCreators, dispatch);

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
      <MainAff/>
      {/* <div className="container" id="test1">
      </div>
      <div className="container" id="test2">
      </div>
      <div className="container" id="test3">
      </div> */}
      {/* <FriendsList/>
      <AffMsg/>
      <HistoryList/> */}
      {/* <button onClick={() => msgAdd(newmsg)}>AddMsg Test</button>
      <button onClick={() => addMsg(newmsg)}>Add Message</button>
      <button onClick={() => depositMoney(1000)}>Deposit</button>
      <button onClick={() => withdrawMoney(1000)}>Withdraw</button>
      <button onClick={() => bankrupt()}>Bankrupt</button> */}
      {/* <Connect /> */}
    </div>
  );
}

export default App;