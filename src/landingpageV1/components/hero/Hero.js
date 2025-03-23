import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "../navbar/Navbar";
import solana_img from "../../assets/images/sol_image.png";
import "./hero.css";
import { useState } from "react";
import WaitlistPopup from "../waitlist/WaitlistPopup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
const Hero = () => {
    const [isWaitlistOpen, setWaitlistOpen] = useState(false);
    const openWaitlist = () => {
        setWaitlistOpen(true);
    };
    const closeWaitlist = () => {
        console.log("Closing waitlist popup"); // Debugging log
        setWaitlistOpen(false);
    };
    return (_jsxs("div", { className: "hero_section", children: [_jsxs("section", { children: [_jsx(Navbar, {}), _jsx("div", { className: "hero_row_wrapper", children: _jsxs("section", { className: "hero_row", children: [_jsxs("section", { className: "hero_text_section", children: [_jsxs("p", { className: "hero_header", children: ["Unlock ", _jsx("span", { children: "Solana's" }), " Full Potential with Blockpool"] }), _jsx("p", { className: "hero_text", children: "Get real-time insights, historical trends, and actionable tips to save on Solana gas fees. This helps you to optimize your Solana transactions and save money with Alpha's powerful tools." }), _jsxs("div", { className: "hero_btn_wrapper", children: [_jsx("button", { className: "btn_dark_green", onClick: openWaitlist, children: "Join Waitlist" }), _jsx("button", { className: "btn_light_green", children: "Download the extension" })] })] }), _jsx("section", { children: _jsx("img", { src: solana_img, alt: "", className: "hero_img" }) })] }) })] }), _jsx(WaitlistPopup, { isOpen: isWaitlistOpen, onClose: closeWaitlist }), _jsx(ToastContainer, {})] }));
};
export default Hero;
