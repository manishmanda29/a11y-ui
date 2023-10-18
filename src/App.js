import logo from './logo.svg';
import {Home} from  './Pages/Home';
import Login from './Pages/Login'
import {SignUp} from './Pages/SignUp'
import './App.css';
import {Routes, Route } from 'react-router-dom'
function App() {
  return (
     <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route exact  path='/login' element={<Login/>}/>
     </Routes>
  );
}

export default App;
