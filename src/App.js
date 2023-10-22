import logo from './logo.svg';
import Login from './Pages/Login'
import {SignUp} from './Pages/SignUp'
import './App.css';
import {Routes, Route ,Navigate} from 'react-router-dom'
import LearningVideos from './Pages/LearningVideos';
import NotFound from './Pages/NotFound';
import Home  from './Pages/Home';

import Footer from './components/Footer';
import { Header } from './components/Header';
import ContentPage from './Pages/ContentPage';
function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route exact path='/sign-up' element={<SignUp/>}/>
      <Route exact  path='/login' element={<Login/>}/>
      <Route exact path='/learning-videos' element={<LearningVideos/>}/>
      <Route exact path='/notfound' element={<NotFound/>}/>
      <Route exact path='/home' element={<Home/>}/>
      <Route exact path='/learn' element={<ContentPage/>}></Route>
      <Route path="*" element={<Navigate to="/notfound"/>} />
     </Routes>
     <Footer/>
     </>
  );
}

export default App;
