/**
 * Design System Constants
 * Standardized spacing, typography, and sizing values
 */

export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',   // 48px
} as const;

export const TYPOGRAPHY = {
  // Font sizes - Mobile first approach
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  // Responsive headings
  h1: {
    mobile: '1.875rem',  // 30px
    tablet: '2.25rem',   // 36px
    desktop: '2.5rem',   // 40px
  },
  h2: {
    mobile: '1.5rem',    // 24px
    tablet: '1.875rem',  // 30px
    desktop: '2rem',     // 32px
  },
  h3: {
    mobile: '1.25rem',   // 20px
    tablet: '1.5rem',    // 24px
    desktop: '1.75rem',  // 28px
  },
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const SITE_CONFIG = {
  name: 'Tử Vi VN AI',
  title: 'Tử Vi VN AI - Trợ lý tử vi & cung hoàng đạo',
  description: 'Trợ lý tử vi AI tiếng Việt: lập lá số, luận giải cung hoàng đạo, tarot và gợi ý cá nhân hóa dựa trên dữ liệu sinh.',
  url: 'https://tuvi-vn.com',
  ogImage: '/images/thumb.png',
  keywords: 'tử vi AI, trí tuệ nhân tạo, trợ lý tử vi, cung hoàng đạo AI, tarot AI, giải mã lá số AI, tử vi miễn phí, tử vi hàng ngày, astrology AI',
  locale: 'vi_VN',
  type: 'website',
} as const;

