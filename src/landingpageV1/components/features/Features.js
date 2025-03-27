import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { featuresData } from './data';
import 'swiper/css';
import 'swiper/css/pagination';
import './features.css';
const Features = () => {
    return (_jsxs("div", { className: "ft_section", children: [_jsx("section", { className: "ft_header_wrapper", children: _jsxs("div", { children: [_jsx("h2", { children: "Key Features" }), _jsx("p", { children: "Discover how blockpool can help you" }), _jsx("button", { children: "Learn More" })] }) }), _jsx("section", { className: "ft_cards_wrapper swiper-container", children: _jsx(Swiper, { slidesPerView: 3, spaceBetween: 20, pagination: { clickable: true }, modules: [Pagination], className: "featuresSwiper", breakpoints: {
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
                    }, children: featuresData.map((data, index) => (_jsx(SwiperSlide, { children: _jsxs(motion.div, { className: "ft_cards", tabIndex: 0, whileHover: {
                                scale: 1.05,
                                boxShadow: "0px 0px 20px rgba(20, 241, 149, 0.8)"
                            }, whileFocus: {
                                scale: 1.05,
                                boxShadow: "0px 0px 20px rgba(20, 241, 149, 0.8)"
                            }, whileTap: {
                                scale: 0.95,
                                boxShadow: "0px 0px 30px rgba(20, 241, 149, 0.9)"
                            }, onClick: () => { }, children: [_jsx(motion.div, { className: "light-beam", initial: { opacity: 0, scale: 0.8 }, whileHover: { opacity: 1, scale: 1.1, rotate: 360 }, whileFocus: { opacity: 1, scale: 1.1, rotate: 360 }, whileTap: { opacity: 1, scale: 1.2, rotate: 180 }, transition: { duration: 0.5, ease: "easeOut" } }), _jsx("img", { src: data.ftImg, alt: "", className: "ftImg" }), _jsxs("div", { className: "ft_text", children: [_jsx("p", { className: "ft_title", children: data.ftText }), _jsx("p", { className: "ft_desc", children: data.ftDesc })] })] }) }, index))) }) })] }));
};
export default Features;
