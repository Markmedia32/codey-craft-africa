import { Link } from "react-router-dom";
import { FaArrowUpRight, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/Logo - White Canvas Version.png";

export default function Footer() {
  return (
    <footer className="premium-footer">
      <div className="footer-top">
        <p className="eyebrow">THE NEXT CATEGORY-LEADING PRODUCT STARTS HERE</p>
        <h2>Built for the<br /><span>ambitious.</span></h2>
        <Link to="/contact" className="footer-main-cta">
          Tell us what you are building <FaArrowUpRight />
        </Link>
      </div>

      <div className="footer-grid">
        <div>
          <img className="footer-logo" src={logo} alt="Codey Craft Africa" />
          <p className="footer-description">
            A Nairobi software studio building intelligent systems, digital products,
            and high-conviction brand experiences for Africa’s next leaders.
          </p>
        </div>

        <div>
          <p className="footer-label">EXPLORE</p>
          <Link to="/about">About CCA</Link>
          <Link to="/portfolio">Our work</Link>
          <Link to="/services">Capabilities</Link>
          <Link to="/careers">Careers</Link>
        </div>

        <div>
          <p className="footer-label">CONNECT</p>
          <a href="mailto:CodeyCraftAfrica@gmail.com">CodeyCraftAfrica@gmail.com</a>
          <a href="tel:+254795875370">+254 795 875 370</a>
          <p>Nairobi, Kenya</p>
          <div className="footer-socials">
            <a href="https://linkedin.com/company/codey-craft-africa" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://instagram.com/codey_craft_africa" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} CODEY CRAFT AFRICA</span>
        <span>DESIGNED IN NAIROBI · BUILT FOR EVERYWHERE</span>
      </div>
    </footer>
  );
}