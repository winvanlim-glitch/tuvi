import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './material-symbols.css';
import { generateMetadata as generateSEOMetadata, generateStructuredData } from '@/lib/seo';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';
import SearchBar from '@/components/features/SearchBar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ToastProvider } from '@/components/common/Toast';
import { DevelopmentToast } from '@/components/common/DevelopmentToast';

const notoSans = localFont({
    src: [
        {
            path: '../assets/fonts/NotoSans-Thin.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../assets/fonts/NotoSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/NotoSans-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/NotoSans-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/NotoSans-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../assets/fonts/NotoSans-Black.ttf',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../assets/fonts/NotoSans-Italic.ttf',
            weight: '400',
            style: 'italic',
        },
    ],
    variable: '--font-noto-sans',
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = generateSEOMetadata();

const GTM_ID = 'GTM-K8WZ86LZ';
const GA_ID = 'G-RTQPPQ7GYM';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const websiteStructuredData = generateStructuredData('WebSite');
    const organizationStructuredData = generateStructuredData('Organization');

    return (
        <html lang="vi">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
                    }}
                />
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `,
                    }}
                />
                <link
                    rel="preload"
                    href="/fonts/material-symbols/material-symbols-outlined.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                {/* Favicons - Multiple sizes for better Google indexing */}
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta name="theme-color" content="#111714" />
                {/* Site icon for Google Search */}
                <meta name="msapplication-TileColor" content="#111714" />
                <meta name="msapplication-TileImage" content="/icon-192.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
                />
            </head>
            <body className={`${notoSans.variable} min-h-screen bg-background-dark font-display text-white selection:bg-primary/30 antialiased`}>
                <ToastProvider>
                    <DevelopmentToast />
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                    {/* Mobile Header */}
                    <header className="lg:hidden">
                        <Header />
                    </header>

                <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-0 lg:gap-4 xl:gap-6 lg:px-4 xl:px-6">
                    {/* Left Sidebar - Sticky PC */}
                    <aside className="hidden lg:block w-72 sticky top-6 py-0 self-start z-40 h-fit mb-6 flex-shrink-0">
                        <Sidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 w-full px-4 lg:px-0 py-4 lg:py-6 space-y-6 lg:space-y-8 min-h-screen">
                        {/* PC Search Navbar */}
                        <div className="hidden lg:block sticky top-0 z-50 bg-background-dark/90 backdrop-blur-xl -mx-4 px-4 py-3 mb-3 border-b border-white/5 transition-all shadow-lg shadow-black/20">
                            <SearchBar />
                        </div>

                        {children}

                        <footer className="py-8 lg:py-10 flex flex-col items-center gap-4 border-t border-white/5 opacity-40">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                <h3 className="font-bold text-base lg:text-lg">Tử Vi VN</h3>
                            </div>
                            <p className="text-xs text-text-secondary text-center">© 2024 Tử Vi VN. Tối ưu cho trải nghiệm đa nền tảng.</p>
                        </footer>
                    </main>

                    {/* Right Sidebar - Sticky PC */}
                    <RightSidebar />
                </div>

                <nav className="lg:hidden" aria-label="Bottom navigation">
                    <BottomNav />
                </nav>
                </ToastProvider>
            </body>
        </html>
    );
}
