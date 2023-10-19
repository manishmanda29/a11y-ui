import logo from './logo.svg';
import {Home} from  './Pages/Home';
import Login from './Pages/Login'
import {SignUp} from './Pages/SignUp'
import './App.css';
import {Routes, Route ,Navigate} from 'react-router-dom'
import LearningVideos from './Pages/LearningVideos';
import NotFound from './Pages/NotFound';

import Footer from './components/Footer';
function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route exact  path='/login' element={<Login/>}/>
      <Route exact path='/learning-videos' element={<LearningVideos/>}/>
      <Route exact path='/notfound' element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/notfound"/>} />
     </Routes>
     <Footer/>
     </>
  );
}

export default App;
