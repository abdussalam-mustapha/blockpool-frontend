import './App.css';
import Homepage from './landingpageV1/Homepage/Homepage';
import Home from './modules/home/App';
import Notification from './modules/notification/App';
import Transaction from './modules/transaction/App';
import Documentation from './pages/documentation/Documentation';
import AuthPage from './pages/Auth/Auth';
import HeliusDemo from './pages/HeliusDemo/HeliusDemo';
import Dashboard from './pages/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="background">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/helius-demo" element={<HeliusDemo />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
