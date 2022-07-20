
import './App.css';
import ChatPage from './components/chatPage';
import HomePage from './components/homePage';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>REACT-CHAT-APP</h1>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/messages' element={<ChatPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
