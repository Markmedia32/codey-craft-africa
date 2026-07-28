import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowDown, FaArrowUpRight, FaCode, FaLayerGroup,
  FaMobileAlt, FaShieldAlt, FaChartLine, FaBolt
} from "react-icons/fa";
import SEO from "../components/SEO";
import SchemaOrg from "../components/SchemaOrg";

import propertyFlow from "../assets/PF1.png";
import proTrans from "../assets/Pro-Trans Ltd.png";
import mbakes from "../assets/M-Bakes.png";
import bizara from "../assets/hero1-img.png";

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const capabilities = [
  {
    number: "01",
    icon: <FaLayerGroup />,
    title: "Digital Products",
    text: "We turn complex business ideas into elegant, scalable web platforms people genuinely want to use."
  },
  {
    number: "02",
    icon: <FaCode />,
    title: "Enterprise Systems",
    text: "ERP, workflow, property, CRM and operational systems built around the real mechanics of your business."
  },
  {
    number: "03",
    icon: <FaMobileAlt />,
    title: "Experience Design",
    text: "High-conversion interfaces and unmistakable digital identities that make your company feel category-leading."
  },
  {
    number: "04",
    icon: <FaChartLine />,
    title: "Growth Engineering",
    text: "Fast, discoverable and measurable digital foundations designed to turn attention into commercial momentum."
  },
];

const sectors = [
  "Real Estate & Property", "Logistics & Transport", "Retail & Commerce",
  "Professional Services", "Education", "Hospitality & Food"
];

const projects = [
  {
    tag: "PROPERTY TECHNOLOGY",
    title: "Property Flow",
    description: "A connected property-management system designed to simplify listings, tenants, rental payments and day-to-day operations.",
    image: propertyFlow,
    accent: "orange"
  },
  {
    tag: "LOGISTICS",
    title: "Kusini Pro Trans",
    description: "A sharp digital presence for a logistics business that needs to inspire confidence before the first conversation.",
    image: proTrans,
    accent: "lime"
  },
  {
    tag: "COMMERCE",
    title: "M-Bakes",
    description: "A customer-first digital experience crafted to make discovery, trust and conversion feel effortless.",
    image: mbakes,
    accent: "violet"
  },
  {
    tag: "BUSINESS OPERATIONS",
    title: "Bizara ERP",
    description: "A modern operational backbone built for businesses that have outgrown spreadsheets and disconnected workflows.",
    image: bizara,
    accent: "blue"
  },
];

export default function Home() {
  return (
    <>
      <SEO page="home" />
      <SchemaOrg />

      <main className="premium-home">
        <section className="new-hero">
          <div className="hero-grid-lines" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="hero-copy">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              NAIROBI · KENYA · BUILDING WITHOUT LIMITS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 38 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              WE BUILD WHAT<br />
              <span>AFRICA RUNS ON.</span>
            </motion.h1>

            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
            >
              Codey Craft Africa engineers digital products, enterprise systems and
              unforgettable web experiences for businesses ready to lead their market.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link to="/contact" className="button-primary">
                Start a high-impact project <FaArrowUpRight />
              </Link>
              <a href="#work" className="button-text">
                See our work <FaArrowDown />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <div className="art-label top-label">CCA / SYSTEMS LAB</div>
            <div className="art-core">
              <div className="art-ring ring-a" />
              <div className="art-ring ring-b" />
              <div className="art-ring ring-c" />
              <div className="art-centre">CCA</div>
            </div>
            <div className="art-label bottom-label">DESIGN × ENGINEERING × IMPACT</div>
          </motion.div>

          <div className="hero-footer">
            <span>SCROLL TO EXPLORE</span>
            <span className="hero-footer-line" />
            <span>01 — 06</span>
          </div>
        </section>

        <section className="marquee-section" aria-label="Core services">
          <div className="marquee-track">
            <span>SOFTWARE THAT MOVES BUSINESS</span><i>✦</i>
            <span>DESIGN THAT EARNS ATTENTION</span><i>✦</i>
            <span>SYSTEMS THAT CREATE ADVANTAGE</span><i>✦</i>
            <span>SOFTWARE THAT MOVES BUSINESS</span><i>✦</i>
          </div>
        </section>

        <section className="intro-section section-shell">
          <motion.div
            className="intro-topline"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="eyebrow">01 / THE CCA STANDARD</span>
            <span>BUILT IN KENYA. READY FOR THE WORLD.</span>
          </motion.div>

          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            Not another agency.<br />
            <span>Your unfair advantage.</span>
          </motion.h2>

          <div className="intro-bottom">
            <p>
              Your digital presence should do more than look good. It should create trust,
              remove friction, make work faster and give your business a position competitors
              cannot copy.
            </p>
            <Link to="/about" className="text-link">Why CCA <FaArrowUpRight /></Link>
          </div>
        </section>

        <section id="capabilities" className="capabilities-section section-shell">
          <div className="section-heading">
            <span className="eyebrow">02 / WHAT WE CREATE</span>
            <h2>Built to become<br /><span>essential.</span></h2>
          </div>

          <div className="capability-grid">
            {capabilities.map((item, index) => (
              <motion.article
                className="capability-card"
                key={item.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="capability-top">
                  <span>{item.number}</span>
                  <span className="capability-icon">{item.icon}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link to="/services" aria-label={`Explore ${item.title}`}>
                  Explore <FaArrowUpRight />
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="work" className="work-section">
          <div className="section-shell">
            <div className="work-header">
              <div>
                <span className="eyebrow">03 / SELECTED WORK</span>
                <h2>Proof is a<br /><span>better promise.</span></h2>
              </div>
              <Link to="/portfolio" className="button-outline">View all work <FaArrowUpRight /></Link>
            </div>
          </div>

          <div className="projects-wrap">
            {projects.map((project, index) => (
              <motion.article
                className={`project-card ${project.accent}`}
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.65, delay: index % 2 ? 0.1 : 0 }}
              >
                <div className="project-visual">
                  <img src={project.image} alt={`${project.title} project preview`} />
                  <span className="project-number">0{index + 1}</span>
                </div>
                <div className="project-copy">
                  <span className="project-tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Link to="/portfolio">Explore case study <FaArrowUpRight /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="sectors" className="sectors-section section-shell">
          <div className="sectors-layout">
            <div>
              <span className="eyebrow">04 / INDUSTRIES</span>
              <h2>Complex business.<br /><span>Clear software.</span></h2>
            </div>
            <p>
              We partner with ambitious operators in sectors where the right technology
              changes how business is done—not simply how it looks.
            </p>
          </div>

          <div className="sector-list">
            {sectors.map((sector, index) => (
              <div className="sector-row" key={sector}>
                <span>0{index + 1}</span>
                <h3>{sector}</h3>
                <FaArrowUpRight />
              </div>
            ))}
          </div>
        </section>

        <section className="metrics-section">
          <div className="section-shell metrics-grid">
            <div><strong>30<span>+</span></strong><p>Digital products<br />and systems shaped</p></div>
            <div><strong>6<span>+</span></strong><p>Industries with<br />real operating context</p></div>
            <div><strong>01</strong><p>Standard: every detail<br />has to earn its place</p></div>
          </div>
        </section>

        <section className="final-cta section-shell">
          <div className="final-cta-panel">
            <div className="cta-glow" />
            <span className="eyebrow">05 / LET’S MAKE IT UNMISSABLE</span>
            <h2>Your next move<br />should look <span>expensive.</span></h2>
            <p>Bring the ambition. We will bring the product thinking, engineering and taste.</p>
            <Link to="/contact" className="button-primary">
              Start your project <FaArrowUpRight />
            </Link>
            <span className="cta-index">CCA<br />2026</span>
          </div>
        </section>
      </main>
    </>
  );
}