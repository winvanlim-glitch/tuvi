import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { signs } from '@/components/features/ZodiacGrid';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticRoutes = [
    '',
    '/tu-vi',
    '/cung-hoang-dao',
    '/tarot',
    '/tuong-hop',
  ];

  // Dynamic routes cho các cung hoàng đạo
  const zodiacRoutes = signs.map((sign) => ({
    url: `${baseUrl}/cung-hoang-dao/${sign.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static routes
  const staticSitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticSitemap, ...zodiacRoutes];
}

