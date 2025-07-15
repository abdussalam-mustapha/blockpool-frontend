import './App.css';
import Homepage from './landingpageV1/Homepage/Homepage';
import Home from './modules/home/App';
import Notification from './modules/notification/App';
import Transaction from './modules/transaction/App';
import Documentation from './pages/documentation/Documentation';
import AuthPage from './pages/Auth/Auth';
import HeliusDemo from './pages/HeliusDemo/HeliusDemo';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="background">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/helius-demo" element={<HeliusDemo />} />
        
        {/* Auth routes - redirect to dashboard if already logged in */}
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />
        
        {/* Protected routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
