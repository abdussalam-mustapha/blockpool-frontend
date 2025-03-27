import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./navbar.css";
import NavIcon from "../../assets/icons/NavIcon.png";
import CaretDownIcon from "../../assets/icons/CaretDownIcon";
import { useState, useEffect, useRef } from "react";
import WaitlistPopup from "../waitlist/WaitlistPopup";
const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isWaitlistOpen, setWaitlistOpen] = useState(false);
    const mobileNavRef = useRef(null); // Reference for mobile nav
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    const openWaitlist = () => {
        setWaitlistOpen(true);
        // Close mobile menu if it's open
        if (isMobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    };
    const closeWaitlist = () => {
        setWaitlistOpen(false);
    };
    // Close mobile menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };
        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileNavRef]);
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: "nav_wrapper", children: [_jsx("div", { className: "nav_icon", children: _jsx("img", { src: NavIcon, alt: "nav_icon" }) }), _jsxs("div", { className: "nav_items", children: [_jsxs("button", { children: [_jsx("span", { children: "Products" }), _jsx(CaretDownIcon, {})] }), _jsxs("button", { children: [_jsx("span", { children: "Use Cases" }), _jsx(CaretDownIcon, {})] }), _jsxs("button", { children: [_jsx("span", { children: "Company" }), _jsx(CaretDownIcon, {})] })] }), _jsx("div", { className: `mobile_menu ${isMobileMenuOpen ? 'hidden' : ''}`, onClick: toggleMobileMenu, children: "\u2630" }), _jsx("div", { className: `overlay ${isMobileMenuOpen ? 'open' : ''}`, onClick: toggleMobileMenu }), !isMobileMenuOpen && (_jsx("div", { children: _jsx("button", { className: "get_started_btn", onClick: openWaitlist, children: "Join Waitlist" }) })), isMobileMenuOpen && (_jsxs("div", { className: `mobile_nav_items ${isMobileMenuOpen ? 'open' : ''}`, ref: mobileNavRef, children: [_jsx("button", { className: "close_icon", onClick: toggleMobileMenu, children: "\u2715" }), _jsxs("button", { className: "mobile_btn", children: [_jsx("span", { children: "Products" }), _jsx(CaretDownIcon, {})] }), _jsxs("button", { className: "mobile_btn", children: [_jsx("span", { children: "Use Cases" }), _jsx(CaretDownIcon, {})] }), _jsxs("button", { className: "mobile_btn", children: [_jsx("span", { children: "Company" }), _jsx(CaretDownIcon, {})] }), _jsx("button", { className: "get_started_btn_mobile", onClick: openWaitlist, children: "Join Waitlist" })] }))] }), _jsx(WaitlistPopup, { isOpen: isWaitlistOpen, onClose: closeWaitlist })] }));
};
export default Navbar;
