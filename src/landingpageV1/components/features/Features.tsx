import { featuresData } from "./data"
import "./features.css"

const Features = () => {
  return (
    <div className="ft_section">
      <section className="ft_header_wrapper">
        <div>
          <h2>Key Features</h2>
          <p>Discover how blockpool can help you</p>
          <button>Learn More</button>
        </div>
      </section>
      <section className="ft_cards_wrapper">
          {
            featuresData.map(data => {
                return (
                    <div className="ft_cards">
                        <img src={data.ftImg} alt="" className="ftImg" />
                        <div className="ft_text">
                          <p className="ft_title">{data.ftText}</p>
                          <p className="ft_desc">{data.ftDesc}</p>
                        </div>
                    </div>
                )
            })
          }
      </section>
    </div>
  )
}

export default Features
