/**
 * Hệ thống luận giải dựa trên sao thực tế trong lá số
 * Phân tích các sao trong mỗi cung để đưa ra luận giải chính xác hơn
 */

import { STAR_BY_ID, StarDefinition } from '@/data/tuvi-stars';
import { ChartData, PALACE_IDS, PalaceId } from '@/lib/tuvi/chart-calculation';

export interface StarInterpretation {
    summary: string;
    analysis: string;
    starEffects: {
        starName: string;
        effect: string;
        isPositive: boolean;
    }[];
    overall: {
        strength: 'strong' | 'moderate' | 'weak';
        advice: string;
    };
}

/**
 * Phân tích ảnh hưởng của một sao trong cung
 */
function analyzeStarInPalace(
    starId: string,
    status: string,
    palaceId: string
): { effect: string; isPositive: boolean } {
    const star = STAR_BY_ID[starId];
    if (!star) {
        return { effect: 'Sao không xác định', isPositive: false };
    }

    let effect = '';
    let isPositive = true;

    // Phân tích dựa trên trạng thái
    switch (status) {
        case 'Miếu':
            effect = `${star.vietnameseName} ở cung Mạnh nhất (Miếu), mang lại may mắn và quyền lực`;
            isPositive = true;
            break;
        case 'Vượng':
            effect = `${star.vietnameseName} ở cung Tốt (Vượng), phát huy tốt đặc tính của sao`;
            isPositive = true;
            break;
        case 'Đắc Địa':
            effect = `${star.vietnameseName} ở cung Tốt (Đắc Địa), có cơ hội phát triển`;
            isPositive = true;
            break;
        case 'Hãm Địa':
            effect = `${star.vietnameseName} ở cung Yếu (Hãm Địa), gặp khó khăn và trở ngại`;
            isPositive = false;
            break;
        case 'Bình':
        default:
            effect = `${star.vietnameseName} ở cung Bình thường, tác động trung bình`;
            isPositive = true;
            break;
    }

    // Thêm ý nghĩa của sao
    effect += `. ${star.meaning}`;

    return { effect, isPositive };
}

/**
 * Phân tích tổng thể một cung dựa trên các sao có trong cung
 */
export function analyzePalaceStars(
    chart: ChartData,
    palaceId: PalaceId
): StarInterpretation {
    const palace = (chart as any)[palaceId];
    if (!palace || !palace.stars) {
        return {
            summary: 'Không có dữ liệu cung',
            analysis: 'Cung không có thông tin sao',
            starEffects: [],
            overall: { strength: 'weak', advice: 'Cần kiểm tra lại dữ liệu' }
        };
    }

    const stars = palace.stars;
    const starEffects: { starName: string; effect: string; isPositive: boolean }[] = [];
    let positiveCount = 0;
    let strongCount = 0;

    // Phân tích từng sao
    stars.forEach((starPlacement: any) => {
        const { effect, isPositive } = analyzeStarInPalace(
            starPlacement.starId,
            starPlacement.status || 'Bình',
            palaceId
        );
        
        starEffects.push({
            starName: starPlacement.starName,
            effect,
            isPositive
        });

        if (isPositive) positiveCount++;
        if (starPlacement.status === 'Miếu' || starPlacement.status === 'Vượng') {
            strongCount++;
        }
    });

    // Xác định sức mạnh tổng thể
    let strength: 'strong' | 'moderate' | 'weak';
    let summary: string;
    let advice: string;

    if (strongCount >= 2 || positiveCount >= 4) {
        strength = 'strong';
        summary = 'Cung có nhiều sao tốt, vận mệnh tốt';
        advice = 'Hãy tận dụng vận may để phát triển. Đây là thời điểm thuận lợi cho các hoạt động liên quan đến cung này.';
    } else if (positiveCount >= 2 || strongCount >= 1) {
        strength = 'moderate';
        summary = 'Cung có sự cân bằng giữa sao tốt và xấu';
        advice = 'Cần cẩn trọng trong các quyết định. Hãy nắm bắt cơ hội nhưng cũng chú ý đến rủi ro.';
    } else {
        strength = 'weak';
        summary = 'Cung gặp nhiều khó khăn, cần vượt qua thử thách';
        advice = 'Đây là giai đoạn thử thách. Hãy kiên nhẫn, nỗ lực và tránh những quyết định vội vàng.';
    }

    // Tạo phân tích chi tiết
    let analysis = '';
    if (starEffects.length > 0) {
        analysis = `Trong cung này có ${starEffects.length} sao: `;
        analysis += starEffects.map(s => s.starName).join(', ');
        analysis += '. ';
        
        const majorStars = stars.filter((s: any) => s.type === 'major');
        if (majorStars.length > 0) {
            analysis += `Các sao chính gồm: ${majorStars.map((s: any) => s.starName).join(', ')}. `;
        }

        const minorStars = stars.filter((s: any) => s.type === 'minor');
        if (minorStars.length > 0) {
            analysis += `Các sao phụ gồm: ${minorStars.map((s: any) => s.starName).join(', ')}. `;
        }
    }

    return {
        summary,
        analysis,
        starEffects,
        overall: { strength, advice }
    };
}

/**
 * Lấy luận giải cho toàn bộ lá số
 */
export function getFullChartInterpretation(chart: ChartData): {
    palaceInterpretations: Record<string, StarInterpretation>;
    overallSummary: string;
} {
    const palaceInterpretations: Record<string, StarInterpretation> = {};
    let strongPalaces = 0;
    let weakPalaces = 0;

    PALACE_IDS.forEach((palaceId) => {
        const interpretation = analyzePalaceStars(chart, palaceId);
        palaceInterpretations[palaceId] = interpretation;
        
        if (interpretation.overall.strength === 'strong') strongPalaces++;
        if (interpretation.overall.strength === 'weak') weakPalaces++;
    });

    let overallSummary = '';
    if (strongPalaces >= 6) {
        overallSummary = 'Lá số tổng thể rất tốt, có nhiều cung mạnh. Bạn có vận mệnh thuận lợi, nên nắm bắt cơ hội để phát triển.';
    } else if (strongPalaces >= weakPalaces) {
        overallSummary = 'Lá số tổng thể ở mức trung bình khá. Có những cung mạnh và yếu, cần biết cách tận dụng điểm mạnh và khắc phục điểm yếu.';
    } else {
        overallSummary = 'Lá số gặp nhiều thử thách, nhưng đây cũng là cơ hội để rèn luyện bản lĩnh. Hãy kiên nhẫn vượt qua khó khăn.';
    }

    return { palaceInterpretations, overallSummary };
}

/**
 * Lấy danh sách sao tốt/xấu trong lá số
 */
export function getStarQualityList(chart: ChartData): {
    goodStars: string[];
    badStars: string[];
    neutralStars: string[];
} {
    const goodStars: string[] = [];
    const badStars: string[] = [];
    const neutralStars: string[] = [];

    const starCounts: Record<string, { count: number; status: string[] }> = {};

    PALACE_IDS.forEach((palaceId) => {
        const palace = (chart as any)[palaceId];
        if (palace?.stars) {
            palace.stars.forEach((star: any) => {
                if (!starCounts[star.starId]) {
                    starCounts[star.starId] = { count: 0, status: [] };
                }
                starCounts[star.starId].count++;
                starCounts[star.starId].status.push(star.status || 'Bình');
            });
        }
    });

    Object.entries(starCounts).forEach(([starId, data]) => {
        const star = STAR_BY_ID[starId];
        const starName = star?.vietnameseName || starId;
        
        const hasStrongStatus = data.status.some(
            s => s === 'Miếu' || s === 'Vượng'
        );
        const hasWeakStatus = data.status.includes('Hãm Địa');

        if (hasStrongStatus && !hasWeakStatus) {
            goodStars.push(starName);
        } else if (hasWeakStatus) {
            badStars.push(starName);
        } else {
            neutralStars.push(starName);
        }
    });

    return { goodStars, badStars, neutralStars };
}
