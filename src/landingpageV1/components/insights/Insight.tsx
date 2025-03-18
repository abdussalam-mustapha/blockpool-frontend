import insight_img from "../../assets/images/Insight_img.png"
import review_one from "../../assets/images/review1.png"
import review_two from "../../assets/images/review2.png"
import "./insight.css"

const Insight = () => {
  return (
    <div>


      <div className="section_one_wrapper">
        <section className="section_one">
            <div>
                <img src={insight_img} alt="insights" />
            </div>
            <div className="col_2">
                <p className="insight_title">Insights and Tips</p>
                <p className="insight_desc">Stay informed and optimize your transactions</p>
                <button className="insight_button">Read More</button>
            </div>
        </section>
      </div>


      <section className="dt_section">
        <div className="dt_col">
            <div>
                <img src={insight_img} alt="insights" className="dt_img" />
            </div>
            <div>
                <p className="dt_col_title">Transaction Optimization</p>
                <p className="insight_desc">Learn how to reduce gas fees</p>
                <button>Gas Optimization</button>
            </div>
        </div>
        <div className="dt_col">
            <div>
                <img src={insight_img} alt="insights" className="dt_img" />
            </div>
            <div>
                <p className="dt_col_title">Real Time updates</p>
                <p className="insight_desc">recieve instant notifications</p>
                <button>Notifications</button>
            </div>
        </div>
      </section>
      <section className="section_3_wrapper">
         <div className="section_3">
            <div>
                <p className="insight_title">User Review</p>
                <p className="insight_desc">See what our users are saying</p>
                <button className="insight_button">Write a Review</button>
            </div>
            <div className="review_section">
                <img src={review_one} alt="user review" className="review_card" />
                <img src={review_two} alt="user review" className="review_card" />
            </div>
         </div>
      </section>
    </div>
  )
}

export default Insight
