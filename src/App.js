import { jsx as _jsx } from "react/jsx-runtime";
import './App.css';
import Homepage from './landingpageV1/Homepage/Homepage';
function App() {
    return (_jsx("div", { className: 'background', children: _jsx(Homepage, {}) }));
}
export default App;
