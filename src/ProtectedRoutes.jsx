import {Routes, Route ,Navigate} from 'react-router-dom'

const ProtectedRoutes = ({children }) => {
    
    if (!localStorage.getItem('access_token')) {
      return <Navigate to="/Home" replace />;
    }
  
    return children;
  };

  export default ProtectedRoutes;