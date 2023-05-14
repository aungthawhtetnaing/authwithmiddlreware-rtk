import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, logoutUsers} from '../Redux/Components/logoutSlice'
import About from './About';

const Home = ({ onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define state to hold the token
  const [token, setToken] = useState('');

  // Get the token from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser({token:token}))
    // navigate('/login');
    // localStorage.removeItem("token");
    onLogout()
    navigate('/login')
  }

  return (
    <div>
      <Button onClick={handleLogout} sx={{ marginLeft: "800px" }} variant="outlined">Logout</Button>
      {/* <About/> */}
      <Link to='/about'><Button >About</Button></Link>
      <Link to='/location'><Button >Location</Button></Link>
      <h1>Hello World</h1>
    </div>
  )
}



export default Home;
