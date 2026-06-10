// ============================================================
// SEO.jsx — Drop this component into your React project
// Usage: import SEO from './SEO'; then <SEO page="home" /> 
// Install react-helmet-async first:
//   npm install react-helmet-async
// Wrap your App with <HelmetProvider> in main.jsx / index.jsx
// ============================================================

import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.codeycraft.africa';
const LOGO_URL = 'https://www.codeycraft.africa/CCA_Official_Logo.png';
const DEFAULT_IMAGE = LOGO_URL;

const pages = {
  home: {
    title: 'Codey Craft Africa | Software Development Agency in Nairobi, Kenya',
    description:
      'Codey Craft Africa builds custom software, professional websites, school management systems, and SaaS products for startups and SMEs across Africa. Based in Nairobi, Kenya.',
    keywords:
      'software development Kenya, website development Nairobi, school management software Kenya, custom software Africa, POS system Kenya, SaaS development Nairobi',
    url: BASE_URL,
    image: DEFAULT_IMAGE,
  },
  about: {
    title: 'About Us | Codey Craft Africa — We Build. You Grow.',
    description:
      'Learn about Codey Craft Africa, a Nairobi-based software agency helping African businesses automate operations, improve efficiency, and scale with technology.',
    keywords:
      'about Codey Craft Africa, software agency Nairobi, tech company Kenya, African software company',
    url: `${BASE_URL}/about`,
    image: DEFAULT_IMAGE,
  },
  services: {
    title: 'Our Services | Website & Software Development — Codey Craft Africa',
    description:
      'CCA offers website development, custom software, school management systems, POS systems, and API integrations tailored for African businesses.',
    keywords:
      'website development Kenya, software development services, school management system, POS system Africa, API integration Kenya',
    url: `${BASE_URL}/services`,
    image: DEFAULT_IMAGE,
  },
  products: {
    title: 'Products | School Management System & POS — Codey Craft Africa',
    description:
      'Explore CCA\'s flagship products including our School Management System with parent & admin portals, and our POS system built for African businesses.',
    keywords:
      'school management system Kenya, POS system Kenya, software products Africa, school portal Kenya',
    url: `${BASE_URL}/products`,
    image: DEFAULT_IMAGE,
  },
  careers: {
    title: 'Careers | Join Codey Craft Africa — Nairobi, Kenya',
    description:
      'We are hiring talented developers, designers, and sales professionals to help build the future of African tech. View open roles at Codey Craft Africa.',
    keywords:
      'tech jobs Kenya, software developer jobs Nairobi, careers Codey Craft Africa, hiring Kenya',
    url: `${BASE_URL}/careers`,
    image: DEFAULT_IMAGE,
  },
  blog: {
    title: 'Blog | Tech Insights for African Businesses — Codey Craft Africa',
    description:
      'Read the latest articles on software development, school technology, digital transformation, and business automation for SMEs in Africa.',
    keywords:
      'tech blog Kenya, software development articles, African tech blog, business automation tips',
    url: `${BASE_URL}/blog`,
    image: DEFAULT_IMAGE,
  },
  contact: {
    title: 'Contact Us | Codey Craft Africa — Nairobi, Kenya',
    description:
      'Get in touch with Codey Craft Africa. We build custom software, websites, and school management systems. Call +254 795 875 370 or email us today.',
    keywords:
      'contact Codey Craft Africa, software agency contact Nairobi, hire software developer Kenya',
    url: `${BASE_URL}/contact`,
    image: DEFAULT_IMAGE,
  },
};

export default function SEO({ page = 'home', customTitle, customDescription }) {
  const data = pages[page] || pages.home;
  const title = customTitle || data.title;
  const description = customDescription || data.description;

  return (
    <Helmet>
      {/* ── Primary Meta ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={data.keywords} />
      <meta name="author" content="Codey Craft Africa" />
      <link rel="canonical" href={data.url} />

      {/* ── Open Graph (Facebook, WhatsApp, LinkedIn) ── */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={data.url} />
      <meta property="og:image" content={data.image} />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta property="og:site_name" content="Codey Craft Africa" />
      <meta property="og:locale" content="en_KE" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={data.image} />
      <meta name="twitter:site" content="@codey_craft_africa" />

      {/* ── Geo / Regional ── */}
      <meta name="geo.region" content="KE-110" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
    </Helmet>
  );
}