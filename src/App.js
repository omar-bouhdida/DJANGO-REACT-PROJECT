import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { authService } from './services/api';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<div className="home">
              <h1>Welcome to Django-React App</h1>
              <p>This is a simple CRUD application using Django REST Framework and React.</p>
            </div>} />
            
            <Route path="/items" element={<ItemList />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            
            <Route path="/items/create" element={
              <ProtectedRoute>
                <ItemForm />
              </ProtectedRoute>
            } />
            
            <Route path="/items/edit/:id" element={
              <ProtectedRoute>
                <ItemForm />
              </ProtectedRoute>
            } />
            
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="*" element={<div>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Django-React App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;