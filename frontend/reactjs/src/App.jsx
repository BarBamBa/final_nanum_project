import './App.css';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/about" element="" /> 
        <Route path="/volunteer/*" element="" />
        <Route path="/board/*" element="" />
        <Route path="/mypage/*" element="" />
        <Route path="/qna/*" element="" />
        <Route path="/login/*" element="" />
        <Route path="/signup/*" element="" />
        <Route path="/manager/*" element="" />
      </Routes>
    </div>
  );
}

export default App;
