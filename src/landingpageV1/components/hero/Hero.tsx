import Navbar from "../navbar/Navbar";
import solana_img from "../../assets/images/sol_image.png"
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
                Get real-time insights, historical trends, and actionable tips to
                save on Solana gas fees. This helps you to optimize your Solana
                transactions and save money with Alpha's powerful tools.
              </p>
              <div className="hero_btn_wrapper">
                <button className="btn_dark_green" onClick={openWaitlist}>Join Waitlist</button>
                <button className="btn_light_green">Download the extension</button>
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