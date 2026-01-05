'use client';

import React from 'react';

const TuViBlog = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold mb-2">Dự báo tháng này</h3>
                <p className="text-text-secondary text-sm">Những biến động năng lượng quan trọng bạn cần lưu ý.</p>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold mb-2">Sao Thủy nghịch hành</h3>
                <p className="text-text-secondary text-sm">Cách vượt qua giai đoạn khó khăn này một cách nhẹ nhàng.</p>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold mb-2">Tình yêu 12 cung hoàng đạo</h3>
                <p className="text-text-secondary text-sm">Dấu hiệu nhận biết người ấy có thực sự thích bạn.</p>
            </div>
        </div>
    );
};

export default TuViBlog;
