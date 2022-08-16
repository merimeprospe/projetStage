import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../contexts/Auth';
import Home from '../pages/Home';

const AuthenticatedRoute = ({path, component}) => {
   const { isAuthenticated } = useContext(Auth); 

   return isAuthenticated ?(
        console.log('component', component, 'path', path),  
        <component />,  
        <Routes>  
            <Route path={path} component = {component} />
        </Routes>  
   ) : (
        <Home /> 
   )
};

export default AuthenticatedRoute;