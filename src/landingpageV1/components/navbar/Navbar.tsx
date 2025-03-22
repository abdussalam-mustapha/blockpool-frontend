import "./navbar.css"
import NavIcon from "../../assets/icons/NavIcon.png"
import CaretDownIcon from "../../assets/icons/CaretDownIcon"
import { useState, useEffect, useRef } from "react";
import WaitlistPopup from "../waitlist/WaitlistPopup";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWaitlistOpen, setWaitlistOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null); // Reference for mobile nav

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
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
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

  return (
    <>
      <nav className="nav_wrapper">
        {/* NAV LOGO */}
        <div className="nav_icon"> 
          <img src={NavIcon} alt="nav_icon" />
        </div>

        <div className="nav_items">
            <button>
              <span>Products</span>
              <CaretDownIcon />
            </button>
            <button>
              <span>Use Cases</span>
              <CaretDownIcon />
            </button>
            <button>
              <span>Company</span>
              <CaretDownIcon />
            </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="mobile_menu" onClick={toggleMobileMenu}>
          ☰
        </div>

        {/* Desktop Get Started Button */}
        {!isMobileMenuOpen && (
          <div>
            <button className="get_started_btn" onClick={openWaitlist}>Join Waitlist</button>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`mobile_nav_items ${isMobileMenuOpen ? 'open' : ''}`} ref={mobileNavRef}>
            <button className="mobile_btn">
              <span>Products</span>
              <CaretDownIcon />
            </button>
            <button className="mobile_btn">
              <span>Use Cases</span>
              <CaretDownIcon />
            </button>
            <button className="mobile_btn">
              <span>Company</span>
              <CaretDownIcon />
            </button>
            {/* Mobile Get Started Button */}
            <button className="get_started_btn_mobile" onClick={openWaitlist}>Join Waitlist</button>
          </div>
        )}
      </nav>

      {/* Waitlist Popup */}
      <WaitlistPopup isOpen={isWaitlistOpen} onClose={closeWaitlist} />
    </>
  );
};

export default Navbar;

