// import { useState } from 'react'
// import Navbar from './components/Navbar.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import HomePage from './components/HomePage.jsx';

// function App() {

//   return (
//     <div style={{height:'100vh'}}>
//      <div style={{height:'10%'}}>
//       <Navbar/>
//      </div>
//      <div style={{height:'90%'}}>
//      <HomePage/>
//      </div>
//     </div>
//   )
// }

// export default App

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <MainPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
