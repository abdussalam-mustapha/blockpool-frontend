import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, LoginCredentials, RegisterCredentials } from '../../services/auth';
import { useToast } from '../../context/ToastContext';
import Spinner from '../../components/Spinner/Spinner';
import './Auth.css';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (authService.isLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    setError(null);
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const credentials: LoginCredentials = { email, password };
        await authService.login(credentials);
        showToast('Successfully logged in!', 'success');
      } else {
        const credentials: RegisterCredentials = { email, password };
        await authService.register(credentials);
        showToast('Account created successfully!', 'success');
      }
      
      // Redirect to dashboard on successful authentication
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Sign In</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isLogin ? 'Sign In' : 'Create an Account'}</h2>
          {error && <p className="auth-error">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <span className="button-spinner">
                <Spinner size="small" color="#ffffff" />
                <span style={{ marginLeft: '10px' }}>{isLogin ? 'Signing In...' : 'Signing Up...'}</span>
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
