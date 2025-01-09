import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';


function App() {


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoute><h1>Hi I am home</h1></ProtectedRoute>} />
          <Route path='/login' element={<h1>Hello</h1>} />
          <Route path='/home' element={<HomePage/>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
