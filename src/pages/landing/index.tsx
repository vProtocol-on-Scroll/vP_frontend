import Features from "../../components/landing/Features"
import Footer from "../../components/landing/Footer"
import Hero from "../../components/landing/Hero"
import How from "../../components/landing/How"
import LandingHeader from "../../components/landing/LandingHeader"
import Manual from "../../components/landing/Manual"
import TopAssets from "../../components/landing/TopAssets"
// import FontsSample from "../../constants/config/fontsSample"

const Landing = () => {
  return (
    <div className="max-w-[1728px] mx-auto overflow-hidden">
      <LandingHeader />
      <Hero />
      <TopAssets />
      <How />
      <Features />
      <Manual />
      <Footer />


      {/* <FontsSample /> */}
    </div>
  )
}

export default Landing