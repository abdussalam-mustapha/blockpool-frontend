import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./waitlistPopup.css";

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistPopup = ({ isOpen, onClose }: WaitlistPopupProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("You've been added to our waitlist. We'll be in touch soon!");
      onClose(); // Close the popup after submission
      setEmail("");
      setName("");
    }, 1500);
  };

  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="waitlist-overlay" onClick={onClose}> {/* Close on overlay click */}
      <div 
        ref={popupRef} 
        className="waitlist-popup"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        
        <div className="waitlist-content">
          <div className="waitlist-header">
            <span className="waitlist-chip">Join the Revolution</span>
            <h2>Get Early Access</h2>
            <p>Be among the first to experience Blockpool's powerful tools for optimizing your Solana transactions.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="waitlist-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="waitlist-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="loading-spinner"></div>
              ) : (
                "Join Waitlist"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPopup;