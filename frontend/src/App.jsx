import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Install: npm install jwt-decode
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard.jsx";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import { useEffect, useState } from 'react';

// 👇 Create a Protected Route component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    
    // If a specific role is required, check for it
    if (requiredRole && decodedToken.role !== requiredRole) {
      return <div>Access denied. {requiredRole} role required.</div>;
    }
    
    return children;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

function App() {
  const [user, setUser] = useState(null);

  // Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.email} ({user.role})</span>
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          </>
        )}
      </nav>

      <Routes>
        {/* Redirect root to appropriate dashboard based on role */}
        <Route path="/" element={
          user ? (
            user.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> :
            user.role === 'store_owner' ? <Navigate to="/store-owner-dashboard" replace /> :
            <Navigate to="/user-dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Each with role-specific access */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/user-dashboard" element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/store-owner-dashboard" element={
          <ProtectedRoute requiredRole="store_owner">
            <StoreOwnerDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback for old /dashboard route */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
