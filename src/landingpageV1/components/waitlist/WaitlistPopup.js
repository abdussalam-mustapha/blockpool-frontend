var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./waitlistPopup.css";
const WaitlistPopup = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const popupRef = useRef(null);
    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose(); // Close the popup if clicking outside
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden"; // Prevent scrolling when popup is open
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto"; // Restore scrolling when popup is closed
        };
    }, [isOpen, onClose]);
    // Animation classes
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("popup-open");
        }
        else {
            document.body.classList.remove("popup-open");
        }
    }, [isOpen]);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = yield fetch('https://blockpool-backend-2.onrender.com/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            if (response.ok) {
                toast.success("You've been added to our waitlist. We'll be in touch soon!");
                onClose(); // Close the popup after submission
                setEmail("");
                setName("");
            }
            else {
                throw new Error('Failed to add to waitlist');
            }
        }
        catch (error) {
            toast.error("There was an error adding you to the waitlist.");
        }
        finally {
            setIsSubmitting(false);
        }
    });
    if (!isOpen)
        return null; // Do not render if not open
    return (_jsxs("div", { className: "waitlist-overlay", onClick: onClose, children: [" ", _jsxs("div", { ref: popupRef, className: "waitlist-popup", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "close-button", onClick: onClose, children: "\u00D7" }), _jsxs("div", { className: "waitlist-content", children: [_jsxs("div", { className: "waitlist-header", children: [_jsx("span", { className: "waitlist-chip", children: "Join the Revolution" }), _jsx("h2", { children: "Get Early Access" }), _jsx("p", { children: "Be among the first to experience Blockpool's powerful tools for optimizing your Solana transactions." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "waitlist-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "Full Name" }), _jsx("input", { id: "name", type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Enter your name", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email Address" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email", required: true })] }), _jsx("button", { type: "submit", className: "waitlist-submit-btn", disabled: isSubmitting, children: isSubmitting ? (_jsx("div", { className: "loading-spinner" })) : ("Join Waitlist") })] })] })] })] }));
};
export default WaitlistPopup;
