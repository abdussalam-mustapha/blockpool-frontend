import footer_img from "../../assets/images/footer_img.png"
import "./footer.css"

const Footer = () => {
  return (
    <div>
      <section>
        <img src={footer_img} alt="gas optimization" className="footer_img" />
      </section>
      <section className="footer_text">
        <p> &copy; Blockpool Gas Fee Optimizer  </p>
        <p>Privacy policy</p>
        <p>Terms of Service</p>
      </section>
    </div>
  )
}

export default Footer
