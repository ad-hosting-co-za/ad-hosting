import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title = 'A&D Studios - Professional Web Hosting Services',
  description = 'Professional web hosting and migration services by A&D Studios. Seamlessly migrate and host your web applications with our expert solutions.',
  keywords = 'web hosting, migration services, cloud hosting, web development, A&D Studios',
  image = '/og-image.png',
  url = window.location.href,
  type = 'website'
}: SEOProps) => {
  const baseUrl = window.location.origin;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "A&D Studios",
          "url": baseUrl,
          "logo": `${baseUrl}/A&D-Studios33.png`,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://twitter.com/adstudios",
            "https://facebook.com/adstudios",
            "https://linkedin.com/company/adstudios"
          ]
        })}
      </script>
    </Helmet>
  );
}; 