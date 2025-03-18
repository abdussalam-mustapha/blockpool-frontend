import Navbar from "../navbar/Navbar";
import solana_img from "../../assets/images/sol_image.png"
import "./hero.css";

const Hero = () => {
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
                transactions and save money with Alpha’s powerful tools.
              </p>
              <div className="hero_btn_wrapper">
                <button className="btn_dark_green">Try it Now</button>
                <button className="btn_light_green">Download the extension</button>
              </div>
            </section>
            <section>
              <img src={solana_img} alt="" className="hero_img" />
            </section>
            </section>
          </div>
      </section>
    </div>
  );
};

export default Hero;
