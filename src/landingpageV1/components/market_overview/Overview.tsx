import { marketData } from "./data";
import chart from "../../assets/images/chart.png";

import "./overview.css";

const Overview = () => {
  return (
    <div className="overview_wrapper">


      <section className="card_wrapper">
      
        <section className="">
        <p className="overview_title">Market Overview</p>
        <div className="data_cards">
          {marketData.map((data) => {
            return (
              <div key={data.id} className="cards">
                <div>
                  <img src={data.marketIcon} alt="" />
                </div>
                <div className="ovr_card_text">
                  <p className="data_text">{data.marketText}</p>
                  <div>
                    <span>{data.marketData}</span>
                    <span>{data.dataDiff}</span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </section>
      </section>


      <section className="img_section">
        <img src={chart} alt="chart" className="chart_img" />
      </section>
    </div>
  );
};

export default Overview;
