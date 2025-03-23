import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { featuresData } from './data';
import 'swiper/css';
import 'swiper/css/pagination';
import './features.css';

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

      <section className="ft_cards_wrapper swiper-container">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="featuresSwiper"
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
          }}
        >
          {featuresData.map((data, index) => (
            <SwiperSlide 
             key={index}
            >
              <div className="ft_cards">
                <img src={data.ftImg} alt="" className="ftImg" />
                <div className="ft_text">
                  <p className="ft_title">{data.ftText}</p>
                  <p className="ft_desc">{data.ftDesc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Features;
