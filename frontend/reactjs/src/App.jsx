import {Route, Routes} from 'react-router-dom';
import About from './pages/about/About';
import Board from './pages/board/Board';
import Login from './pages/login/Login';
import Manager from './pages/manager/Manager';
import MyPage from './pages/myPage/MyPage';
import Qna from './pages/qna/Qna';
import SignUp from './pages/signUp/SignUp';
import Volunteer from './pages/volunteer/Volunteer';
import BoardDetail from './pages/board/BoardDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/about" element={<About/>} /> 
        <Route path="/volunteer/*" element={<Volunteer/>} />
        <Route path="/board/*" element={<Board/>} />
        <Route path="/mypage/*" element={<MyPage/>} />
        <Route path="/qna/*" element={<Qna/>} />
        <Route path="/login/*" element={<Login/>} />
        <Route path="/signup/*" element={<SignUp/>} />
        <Route path="/manager/*" element={<Manager/>} /> 
        <Route path='/board/detail/:id' element={<BoardDetail />} />
      </Routes>
    </div>
  );
}

export default App;
