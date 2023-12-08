import React from "react";
import "./Header.css";
import {Link,useNavigate}  from'react-router-dom';
import whiteLogo from '../images/whiteLogo.png'

export const Header = () => {
 let navigate=useNavigate()
  let token=localStorage.getItem('access_token')
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className="header">
    <nav>
      <img src={whiteLogo} alt="Your Logo Alt Text" />
  
      <div className="menu">
        <ul>
          <li><Link to={'/home'}>Home</Link></li>
          <li><Link to={'/learn'}>Learn</Link></li>
          <li><Link to={'/hang-man'}>Games</Link></li>
          <li><Link to={'/Quiz'}>Quizzes</Link></li>
          <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
          <li><Link to={'/learning-videos'}>Learning videos</Link></li>
          <li><Link to={'/accessibility-testing'}>Accessibility Testing</Link></li>
        </ul>
      </div>
  
      <div style={{ display: 'flex', gap: 20 }} className="container">
        {!token ?
          <>
            <Link to={'/sign-up'}>
              <button className="log">Register</button>
            </Link>
  
            <Link to={'/login'}>
              <button className="reg">Login</button>
            </Link>
          </> :
          <button className="reg" onClick={handleLogout}>Logout</button>
        }
      </div>
    </nav>
  
    {/* <div class="banner-text">
      <button style={{ width: 150, height: 50 }} type="button">Get Started</button>
    </div> */}
  </div>
  )
};