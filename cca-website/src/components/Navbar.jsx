import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Logo - White Canvas Version.png";

const navigation = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Selected work", href: "/#work" },
  { label: "Sectors", href: "/#sectors" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  return (
    <header className="premium-nav">
      <Link to="/" className="brand-mark" aria-label="Codey Craft Africa home">
        <img src={logo} alt="Codey Craft Africa" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Link to="/contact" className="nav-cta">
        Start a project <FaArrowRight />
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
          >
            {navigation.map((item) => (
              <a key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <Link to="/contact" onClick={closeMenu} className="mobile-project-link">
              Start a project <FaArrowRight />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}