import Navbar from "../navbar/Navbar";
import solana_img from "../../assets/images/sol_image.png"
import "./hero.css";
import { useState } from "react";
import WaitlistPopup from "../waitlist/WaitlistPopup";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For debugging
const DEBUG = true;

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
    if (DEBUG) console.log('Navigating to /swap');
    navigate('/swap', { replace: true });
  };

  return (
    <div className="hero_section">
      <section>
        <Navbar />
   
        <div className="hero_row_wrapper">
          <section className="hero_row">
            <section className="hero_text_section">
              <p className="hero_header">
                Unlock <span>Solana's</span> Full Potential with Blockpool
              </p>
              <p className="hero_text">
              Access APIs for web3 auth, blockchain data, and on-chain analytics—with engaging training for Solana developers—and enjoy effortless transaction tracking with Blockpool’s cool features
              </p>
              <div className="hero_btn_wrapper">
                <button className="btn_dark_green" onClick={openWaitlist}>Join Waitlist</button>
                <button className="btn_light_green" onClick={handleTryNow}>Try Now</button>
              </div>
            </section>
            <section>
              <img src={solana_img} alt="" className="hero_img" />
            </section>
          </section>
        </div>
      </section>

      {/* Waitlist Popup */}
      <WaitlistPopup isOpen={isWaitlistOpen} onClose={closeWaitlist} />
     <ToastContainer />
    </div>
  );
};

export default Hero;