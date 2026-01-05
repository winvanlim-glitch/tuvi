import Link from 'next/link';

export const metadata = {
    title: 'Độ Tương Hợp - Astrology VN',
};

export default function Page() {
    return (
        <div className="flex items-center justify-center py-40">
            <div className="text-center">
                <span className="material-symbols-outlined text-6xl text-white/20 mb-4">favorite</span>
                <p className="text-text-secondary">Tính năng đang được phát triển...</p>
                <Link href="/" className="mt-6 inline-block text-primary font-bold hover:underline">
                    Quay lại Trang chủ
                </Link>
            </div>
        </div>
    );
}
