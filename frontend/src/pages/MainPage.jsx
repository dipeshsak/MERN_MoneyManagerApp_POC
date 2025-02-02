import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from '../components/HomePage.jsx';

function MainPage() {

  return (
    <div style={{height:'100vh'}}>
     <div style={{height:'10%'}}>
      <Navbar/>
     </div>
     <div style={{height:'90%'}}>
     <HomePage/>
     </div>
    </div>
  )
}

export default MainPage

