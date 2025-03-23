import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { marketData } from "./data";
import chart from "../../assets/images/chart.png";
import "./overview.css";
const Overview = () => {
    return (_jsxs("div", { className: "overview_wrapper", children: [_jsx("section", { className: "card_wrapper", children: _jsxs("section", { className: "", children: [_jsx("p", { className: "overview_title", children: "Market Overview" }), _jsx("div", { className: "data_cards", children: marketData.map((data) => {
                                return (_jsxs("div", { className: "cards", children: [_jsx("div", { children: _jsx("img", { src: data.marketIcon, alt: "" }) }), _jsxs("div", { className: "ovr_card_text", children: [_jsx("p", { className: "data_text", children: data.marketText }), _jsxs("div", { children: [_jsx("span", { children: data.marketData }), _jsx("span", { children: data.dataDiff })] })] })] }, data.id));
                            }) })] }) }), _jsx("section", { className: "img_section", children: _jsx("img", { src: chart, alt: "chart", className: "chart_img" }) })] }));
};
export default Overview;
