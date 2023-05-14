import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from "react";
import Login from "./Auth/Login";
import Home from "./Page/Home";
import About from "./Page/About";
import Location from "./Page/Location";
const theme = createTheme({
  palette:{
    primary:{
      main:"#008C95"
    }
  },
  typography:{
    fontFamily:"Quicksand",
    fontWeightLight:400,
    fontWeightRegular:500,
    fontWeightMedium:600,
    fontWeightBold:700,
  }
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

  const handleLogin = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    }
   
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
           
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn && (
              <>
                <Route path="/about" element={<About />} />
                <Route path="/location" element={<Location/>} />
                <Route path="/home" element={<Home onLogout={handleLogout} />} />
              </>
            )}
            <Route path="*/*" element={<Navigate to="/home" />} />
            
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
