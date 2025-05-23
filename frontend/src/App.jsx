import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import "leaflet/dist/leaflet.css";
import { AddConnectionPage } from './pages/AddConnectionPage';
import ProfilePage from './pages/ProfilePage';
import { BusinessViewPage } from './pages/BusinessViewPage';
import { ConnectionListPage } from './pages/ConnectionListPage';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './context/AuthContext';


function App() {

  return (

    <Routes>
      <Route path='/homemessage' element={<ProtectedRoute><h1>Hi I am home</h1></ProtectedRoute>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path='/addconnection' element={<ProtectedRoute><AddConnectionPage /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path='/businessview/:business_id' element={<ProtectedRoute><BusinessViewPage /></ProtectedRoute>} />
      <Route path='/connectionlistpage' element={<ProtectedRoute><ConnectionListPage /></ProtectedRoute>} />
    </Routes>

  )
}

export default App
