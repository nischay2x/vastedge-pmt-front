import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { getUser } from './actions/auth';
import { Button, CircularProgress, Typography } from '@mui/material';

import Layout from './component/Layout';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import Employees from './pages/employees';
import Projects from './pages/projects';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [suspense, setSuspense] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if(user.isLoggedIn) {
      setSuspense(false);
      setLoggedIn(true);
      if(pathname) navigate(pathname)
    } 
    else {
      const token = localStorage.getItem("token");
      if(token){
        setSuspense(true);
        dispatch(getUser(token));
        if(pathname) navigate(pathname)
      } else {
        setSuspense(false);
        setLoggedIn(false);
        navigate("/login", { replace: true })
      }
    }
  }, [user, dispatch])

  return (
    suspense ? <Loading/> :
    <Routes>
      <Route path='/' element={<RequireAuth loggedIn={loggedIn}><Home/></RequireAuth>} />
      <Route path='/login' element={<Login loggedIn={loggedIn} />} />
      <Route path='/profile' element={<RequireAuth loggedIn={loggedIn}><Profile/></RequireAuth>} />
      <Route path='/employees' element={<RequireAuth loggedIn={loggedIn}><Employees/></RequireAuth>} />
      <Route path='/projects' element={<RequireAuth loggedIn={loggedIn}><Projects/></RequireAuth>} />
      <Route path='*' element={<Nothing/>}></Route>
    </Routes>
  )
}

export default App;


function RequireAuth({ loggedIn, children }) {
  return loggedIn ? <Layout>{children}</Layout> : <Navigate to="/login" replace />
}

function Nothing () {
  return(
    <div className="page d-flex">
      <div className="m-auto text-center">
        <Typography variant='h3' fontWeight="600">
          Nothing Here !!!
        </Typography>
        <br />
        <Link to="/">
          <Button variant='contained'>Back To Home</Button>
        </Link>
      </div>
    </div>
  )
}

function Loading () {
  return(
    <div className="page d-flex">
      <div className="m-auto text-center">
        <Typography variant='h3' fontWeight="600">
          Logging In ...
        </Typography>
        <br />
        <CircularProgress/>
      </div>
    </div>
  )
}