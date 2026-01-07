'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { signs } from '@/components/features/ZodiacGrid';
import SignsPage from '@/components/pages/SignsPage';

export default function ZodiacDetailPage() {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params?.cung === 'string' ? params.cung : '';
  const matchedSign = signs.find((s) => s.slug === slug);

  // Nếu slug không hợp lệ thì quay lại trang tổng
  if (!matchedSign) {
    if (typeof window !== 'undefined') {
      router.replace('/cung-hoang-dao');
    }
    return null;
  }

  // Tạm thời dùng lại SignsPage (trang chi tiết nhiều cung) cho trải nghiệm phong phú,
  // sau này có thể tách riêng component chi tiết cho từng cung.
  return (
    <article>
      <header className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-black tracking-tighter mb-2">
          {matchedSign.name}
        </h1>
        <p className="text-text-secondary text-sm lg:text-base">
          Khám phá tính cách, tình yêu và chỉ số năng lượng chuyên sâu của cung {matchedSign.name}.
        </p>
      </header>
      <SignsPage />
    </article>
  );
}


