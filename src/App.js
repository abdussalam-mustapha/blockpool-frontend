import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import Homepage from './landingpageV1/Homepage/Homepage';
import Home from './modules/home/App';
import Auth from './modules/auth/App.';
import Notification from './modules/notification/App';
import Transaction from './modules/transaction/App';
import Documentation from './pages/documentation';
import { Routes, Route } from "react-router-dom";
function App() {
    return (_jsx("div", { className: 'background', children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Homepage, {}) }), _jsx(Route, { path: "/home", element: _jsx(Home, {}) }), _jsx(Route, { path: "/auth", element: _jsx(Auth, {}) }), _jsx(Route, { path: "/notifications", element: _jsx(Notification, {}) }), _jsx(Route, { path: "/transactions", element: _jsx(Transaction, {}) }), _jsx(Route, { path: "/documentation", element: _jsx(Documentation, {}) })] }) }));
}
export default App;
