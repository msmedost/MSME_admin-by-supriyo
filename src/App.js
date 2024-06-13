import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Approve from './pages/Approve';
import Admin from './pages/Admin';
// import Login from './pages/Login';
import Login from "./pages/login";
import Mancat from "./pages/Mancat";
// import { UserProvider } from './context/UserContext'; // Import UserProvider
import { UserProvider } from "./inc/UserContext";
// import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ProtectedRoute from "./pages/ProtectedRoute";

import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/approve" element={<Approve />} /> */}
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/approve" element={<ProtectedRoute element={<Approve />} />} />
          <Route path="/cat_manage" element={<ProtectedRoute element={<Mancat />} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
