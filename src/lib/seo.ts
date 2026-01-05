import { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false,
  nofollow = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title 
    ? `${title} | ${SITE_CONFIG.name}` 
    : SITE_CONFIG.title;
  
  const fullDescription = description || SITE_CONFIG.description;
  const fullKeywords = keywords || SITE_CONFIG.keywords;
  const fullUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url;
  const fullImage = image || `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: '@tuvi_vn',
    },
    alternates: {
      canonical: fullUrl,
    },
    metadataBase: new URL(SITE_CONFIG.url),
  };
}

export function generateStructuredData(type: 'WebSite' | 'Article' | 'Organization', data?: Record<string, any>) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: 'vi-VN',
  };

  if (type === 'WebSite') {
    return {
      ...baseData,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      ...data,
    };
  }

  if (type === 'Organization') {
    return {
      ...baseData,
      logo: `${SITE_CONFIG.url}/images/logo.png`,
      sameAs: [
        // Add social media links here
      ],
      ...data,
    };
  }

  return { ...baseData, ...data };
}

