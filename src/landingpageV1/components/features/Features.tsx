import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
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
              spaceBetween: 20 
            },
            768: { 
              slidesPerView: 2, 
              spaceBetween: 20 
            },
            0: { 
              slidesPerView: 1, 
              spaceBetween: 15 
            },
          }}
        >
          {featuresData.map((data, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="ft_cards"
                tabIndex={0} 
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 0px 20px rgba(20, 241, 149, 0.8)" 
                }}
                whileFocus={{ 
                  scale: 1.05, 
                  boxShadow: "0px 0px 20px rgba(20, 241, 149, 0.8)" 
                }} 
              >
                <motion.div
                  className="light-beam"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1, rotate: 360 }}
                  whileFocus={{ opacity: 1, scale: 1.1, rotate: 360 }}
                  transition={{ duration: 1, ease: "linear" }}
                />
                <img src={data.ftImg} alt="" className="ftImg" />
                <div className="ft_text">
                  <p className="ft_title">{data.ftText}</p>
                  <p className="ft_desc">{data.ftDesc}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Features;
