import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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
});
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';
import SearchBar from '@/components/features/SearchBar';
import RightSidebar from '@/components/layout/RightSidebar';

export const metadata: Metadata = {
    title: 'Astrology VN - Tử vi & Cung hoàng đạo',
    description: 'Khám phá bí ẩn vũ trụ và bản thân',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
            </head>
            <body className={`${notoSans.variable} min-h-screen bg-background-dark font-display text-white selection:bg-primary/30 antialiased`}>
                {/* Mobile Header */}
                <div className="lg:hidden">
                    <Header />
                </div>

                <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-0 lg:gap-6 xl:gap-8 lg:px-6">
                    {/* Left Sidebar - Sticky PC */}
                    <aside className="hidden lg:block w-72 sticky top-8 py-0 self-start z-40 h-fit mb-8 flex-shrink-0">
                        <Sidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 w-full px-4 lg:px-0 py-4 lg:py-8 space-y-8 lg:space-y-12 min-h-screen">
                        {/* PC Search Navbar */}
                        <div className="hidden lg:block sticky top-0 z-50 bg-background-dark/90 backdrop-blur-xl -mx-4 px-4 py-4 mb-4 border-b border-white/5 transition-all shadow-2xl shadow-black/20">
                            <SearchBar />
                        </div>

                        {children}

                        <footer className="py-12 flex flex-col items-center gap-6 border-t border-white/5 opacity-40">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                <h3 className="font-bold text-lg">Astrology VN</h3>
                            </div>
                            <p className="text-xs text-text-secondary">© 2024 Astrology VN. Tối ưu cho trải nghiệm đa nền tảng.</p>
                        </footer>
                    </main>

                    {/* Right Sidebar - Sticky PC */}
                    <RightSidebar />
                </div>

                <div className="lg:hidden">
                    <BottomNav />
                </div>
            </body>
        </html>
    );
}
