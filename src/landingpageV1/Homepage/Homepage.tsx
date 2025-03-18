import Features from "../components/features/Features"
import Footer from "../components/footer/Footer"
import Hero from "../components/hero/Hero"
import Insight from "../components/insights/Insight"
import Overview from "../components/market_overview/Overview"



const Homepage = () => {
  return (
    <div>
      <Hero />
      <Overview />
      <Features />
      <Insight />
      <Footer />
    </div>
  )
}

export default Homepage
