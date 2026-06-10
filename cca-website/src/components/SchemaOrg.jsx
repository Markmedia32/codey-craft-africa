// ============================================================
// SchemaOrg.jsx — Structured data for Google rich results
// Place <SchemaOrg /> once inside your HomePage component
// ============================================================

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.codeycraft.africa/#organization",
        "name": "Codey Craft Africa",
        "alternateName": "CCA",
        "url": "https://www.codeycraft.africa",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.codeycraft.africa/CCA_Official_Logo.png",
          "width": 500,
          "height": 500
        },
        "description": "Codey Craft Africa is a software development agency that builds custom software, professional websites, school management systems, and SaaS products for startups, SMEs, and growing businesses across Africa.",
        "slogan": "We Build. You Grow.",
        "foundingDate": "2024",
        "foundingLocation": "Nairobi, Kenya",
        "areaServed": {
          "@type": "Continent",
          "name": "Africa"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+254-795-875-370",
            "email": "codeycraftafrica@gmail.com",
            "contactType": "customer service",
            "availableLanguage": ["English", "Swahili"]
          }
        ],
        "sameAs": [
          "https://www.instagram.com/codey_craft_africa/",
          "https://ke.linkedin.com/in/markmutwiri"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.codeycraft.africa/#localbusiness",
        "name": "Codey Craft Africa",
        "image": "https://www.codeycraft.africa/CCA_Official_Logo.png",
        "url": "https://www.codeycraft.africa",
        "telephone": "+254795875370",
        "email": "codeycraftafrica@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi County",
          "addressCountry": "KE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -1.286389,
          "longitude": 36.817223
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website Development",
                "description": "Professional, responsive websites for businesses in Kenya and Africa."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software Development",
                "description": "Bespoke software solutions tailored to your business needs."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "School Management System",
                "description": "SMS with admin and parent portals for Kenyan schools — replacing fragmented multi-app operations."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "POS System",
                "description": "Point of sale software built for African retail and SME businesses."
              }
            }
          ]
        },
        "priceRange": "KSh",
        "currenciesAccepted": "KES",
        "paymentAccepted": "M-Pesa, Bank Transfer",
        "openingHours": "Mo-Fr 08:00-18:00"
      },
      {
        "@type": "WebSite",
        "@id": "https://www.codeycraft.africa/#website",
        "url": "https://www.codeycraft.africa",
        "name": "Codey Craft Africa",
        "description": "Custom software, websites, and school management systems for African businesses.",
        "publisher": {
          "@id": "https://www.codeycraft.africa/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.codeycraft.africa/blog?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}