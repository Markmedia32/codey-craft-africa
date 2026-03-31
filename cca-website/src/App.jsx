import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Services from "./pages/Services"
import Portfolio from "./pages/Portfolio"
import Careers from "./pages/Careers"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Web from "./pages/web"
import Saas from "./pages/Saas"
import DigitalGrowth from "./pages/Digital Growth"
import BusinessAutomation from "./pages/Business Automation"
import PropertyFlow from "./pages/PropertyFlow"
import Bizara from "./pages/Bizara"
import RecruitAdmin from "./pages/RecruitmentAdmin"
import Apply from "./pages/Apply"
import Blog from "./pages/Blog"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Web" element={<Web />} />
        <Route path="/Saas" element={<Saas />} />
        <Route path="/DigitalGrowth" element={<DigitalGrowth />} />
        <Route path="/BusinessAutomation" element={<BusinessAutomation />} />
        <Route path="/PropertyFlow" element={<PropertyFlow />} />
        <Route path="/Bizara" element={<Bizara />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/RecruitAdmin" element={<RecruitAdmin />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App