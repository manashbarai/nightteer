import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Dashboard from './page/Dashboard';
import HomePage from './page/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
       
       
      </Routes>

       
    </Router>
  )
}

export default App
