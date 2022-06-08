import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './State';
import { RootState } from './State/Reducers';
import AffMsg from './Components/AffMsg';
import { msg } from './State/type';
import FriendsList from './Components/FriendsList';
import HistoryList from './Components/HistoryList';
import Connect from './Connect';

function App() {

  const dispatch = useDispatch();

  const { depositMoney, withdrawMoney, bankrupt, msgAdd } = bindActionCreators(actionCreators, dispatch);

  const newmsg: msg = {
    text: "ok1",
    sender: "ok2"
  }

  return (
    <div className="App">
      <FriendsList/>
      <AffMsg/>
      <HistoryList/>
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