import Login from './Pages/Login'
import {SignUp} from './Pages/SignUp'
import './App.css';
import {Routes, Route ,Navigate} from 'react-router-dom'
import LearningVideos from './Pages/LearningVideos';
import NotFound from './Pages/NotFound';
import Home  from './Pages/Home';
import Footer from './components/Footer';
import ContentPage from './Pages/ContentPage';
import ProtectedRoutes from './ProtectedRoutes'
import CourseCompletion from './Pages/CourseCompletion';
import Accessibility from './Pages/Accessibility';
import HangMan from './Pages/HangMan'
import Leaderboard from './Pages/Leaderboard';
import Quiz from './Pages/Quiz'
function App() {
  return (
    <>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/sign-up' element={<SignUp/>}/>
      <Route exact  path='/login' element={<Login/>}/>
      <Route exact path='/learning-videos' element={<ProtectedRoutes><LearningVideos/></ProtectedRoutes>}/>
      <Route exact path='/notfound' element={<NotFound/>}/>
      <Route exact path='/home' element={<Home/>}/>
      <Route exact path='/learn' element={<ContentPage/>}></Route>
      <Route exact path="/certificate" element={<CourseCompletion/>}></Route>
      <Route path="/accessibility-testing" element={<Accessibility/>} />
      <Route exact path="/hang-man" element={<HangMan/>} />
      <Route exact path="/Leaderboard" element={<Leaderboard/>} />
      <Route exact path="/quiz" element={<Quiz/>} />
      <Route path="*" element={<Navigate to="/notfound"/>} />
     </Routes>
     <Footer/>
     </>
  );
}

export default App;
