/**
 * Helper functions để lấy luận giải động dựa trên mệnh và cung
 */

import { getPalaceInterpretation, getAllInterpretationsForMenh, MenhType } from '@/data/tuvi-interpretations';
import { MOCK_PALACE_CONTENT } from '@/data/tuvi-rules';

/**
 * Lấy nội dung luận giải cho một cung dựa trên mệnh
 * Nếu không có luận giải cụ thể, sẽ dùng nội dung mặc định
 */
export function getPalaceContent(menh: MenhType, palaceId: string): string {
    const interpretation = getPalaceInterpretation(menh, palaceId);
    
    if (interpretation) {
        return interpretation.detailed || interpretation.summary;
    }
    
    // Fallback về nội dung mặc định
    return MOCK_PALACE_CONTENT[palaceId] || 'Đang cập nhật nội dung luận giải...';
}

/**
 * Lấy summary cho một cung
 */
export function getPalaceSummary(menh: MenhType, palaceId: string): string {
    const interpretation = getPalaceInterpretation(menh, palaceId);
    return interpretation?.summary || '';
}

/**
 * Lấy đầy đủ thông tin luận giải cho một cung
 */
export function getFullPalaceInterpretation(menh: MenhType, palaceId: string) {
    return getPalaceInterpretation(menh, palaceId);
}

