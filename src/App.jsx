import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import Navbar from './components/Navbar'
import Results from './components/Results'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/results/:id' element={<Results />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App