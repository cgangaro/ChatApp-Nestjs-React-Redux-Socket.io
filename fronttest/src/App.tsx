import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './State/Reducers';
import { validateInput } from './Utils/logUtils';
import LoginPage from './Components/LoginPage';
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