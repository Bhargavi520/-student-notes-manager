import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import UploadNotes from './pages/UploadNotes';
import MyNotes from './pages/MyNotes';
import SearchNotes from './pages/SearchNotes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/upload" element={<ProtectedRoute><UploadNotes/></ProtectedRoute>}/>
      <Route path="/my-notes" element={<ProtectedRoute><MyNotes/></ProtectedRoute>}/>
      <Route path="/search" element={<SearchNotes/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile />} />
      
    </Routes>
    </BrowserRouter>
  );  
}

export default App;
