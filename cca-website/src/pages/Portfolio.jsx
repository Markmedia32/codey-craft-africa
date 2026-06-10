import { Helmet } from 'react-helmet-async'

function Portfolio() {
  return (
    <>
    <Helmet>
  <title>Our Portfolio | Codey Craft Africa — Software Projects in Kenya</title>
  <meta name="description" content="View Codey Craft Africa's portfolio of software projects including school management systems, POS systems, websites, and SaaS products built for African businesses." />
  <meta property="og:title" content="Our Portfolio | Codey Craft Africa" />
  <meta property="og:description" content="View Codey Craft Africa's portfolio of software projects including school management systems, POS systems, websites, and SaaS products built for African businesses." />
  <meta property="og:url" content="https://www.codeycraft.africa/portfolio" />
  <meta property="og:image" content="https://www.codeycraft.africa/CCA_Official_Logo.png" />
</Helmet>
    <div>
      <h1>Portfolio</h1>
    </div>
    </>
  )
}

export default Portfolio;