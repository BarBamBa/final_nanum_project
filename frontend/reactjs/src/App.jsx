import {Route, Routes} from 'react-router-dom';
import About from './pages/about/About';
import Board from './pages/board/Board';
import Login from './pages/login/Login';
import Manager from './pages/manager/Manager';
import MyPage from './pages/myPage/MyPage';
import Qna from './pages/qna/Qna';
import SignUp from './pages/signUp/SignUp';
import Volunteer from './pages/volunteer/Volunteer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/about" element={<About/>} /> 
        <Route path="/volunteer/*" element={<Board/>} />
        <Route path="/board/*" element={<Login/>} />
        <Route path="/mypage/*" element={<Manager/>} />
        <Route path="/qna/*" element={<MyPage/>} />
        <Route path="/login/*" element={<Qna/>} />
        <Route path="/signup/*" element={<SignUp/>} />
        <Route path="/manager/*" element={<Volunteer/>} />
      </Routes>
    </div>
  );
}

export default App;
