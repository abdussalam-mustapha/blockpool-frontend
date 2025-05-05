import './App.css'
import Homepage from './landingpageV1/Homepage/Homepage'
import Home from './modules/home/App'
import Auth from './modules/auth/App.'
import Notification from './modules/notification/App'
import SwapPage from './pages/Swap'
import Transaction from './modules/transaction/App'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='background'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/transactions" element={<Transaction />} />
      </Routes>
    </div>
  )
}

export default App
