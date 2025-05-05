import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "../navbar/Navbar";
import solana_img from "../../assets/images/sol_image.png";
import "./hero.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import WaitlistPopup from "../waitlist/WaitlistPopup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
const Hero = () => {
    const navigate = useNavigate();
    const [isWaitlistOpen, setWaitlistOpen] = useState(false);
    
    const openWaitlist = () => {
        setWaitlistOpen(true);
    };
    
    const closeWaitlist = () => {
        console.log("Closing waitlist popup"); // Debugging log
        setWaitlistOpen(false);
    };
    
    const handleTryNow = () => {
        navigate('/swap');
    };
    return (_jsxs("div", { className: "hero_section", children: [_jsxs("section", { children: [_jsx(Navbar, {}), _jsx("div", { className: "hero_row_wrapper", children: _jsxs("section", { className: "hero_row", children: [_jsxs("section", { className: "hero_text_section", children: [_jsxs("p", { className: "hero_header", children: ["Unlock ", _jsx("span", { children: "Solana's" }), " Full Potential with Blockpool"] }), _jsx("p", { className: "hero_text", children: "Access APIs for web3 auth, blockchain data, and on-chain analytics\u2014with engaging training for Solana developers\u2014and enjoy effortless transaction tracking with Blockpool\u2019s cool features" }), _jsxs("div", { className: "hero_btn_wrapper", children: [_jsx("button", { className: "btn_dark_green", onClick: openWaitlist, children: "Join Waitlist" }), _jsx("button", { className: "btn_light_green", onClick: handleTryNow, children: "Try Now" })] })] }), _jsx("section", { children: _jsx("img", { src: solana_img, alt: "", className: "hero_img" }) })] }) })] }), _jsx(WaitlistPopup, { isOpen: isWaitlistOpen, onClose: closeWaitlist }), _jsx(ToastContainer, {})] }));
};
export default Hero;
