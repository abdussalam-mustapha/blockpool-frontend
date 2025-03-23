import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { featuresData } from './data';
import 'swiper/css';
import 'swiper/css/pagination';
import './features.css';
const Features = () => {
    return (_jsxs("div", { className: "ft_section", children: [_jsx("section", { className: "ft_header_wrapper", children: _jsxs("div", { children: [_jsx("h2", { children: "Key Features" }), _jsx("p", { children: "Discover how blockpool can help you" }), _jsx("button", { children: "Learn More" })] }) }), _jsx("section", { className: "ft_cards_wrapper swiper-container", children: _jsx(Swiper, { slidesPerView: 3, spaceBetween: 20, pagination: { clickable: true }, modules: [Pagination], className: "featuresSwiper", breakpoints: {
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
                    }, children: featuresData.map((data, index) => (_jsx(SwiperSlide, { children: _jsxs("div", { className: "ft_cards", children: [_jsx("img", { src: data.ftImg, alt: "", className: "ftImg" }), _jsxs("div", { className: "ft_text", children: [_jsx("p", { className: "ft_title", children: data.ftText }), _jsx("p", { className: "ft_desc", children: data.ftDesc })] })] }) }, index))) }) })] }));
};
export default Features;
