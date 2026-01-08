/**
 * Utility functions for zodiac sign calculations
 */

import { signs } from '@/components/features/ZodiacGrid';

export interface ZodiacSignInfo {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

/**
 * Tính cung hoàng đạo từ ngày sinh
 * @param dateString - Ngày sinh dạng YYYY-MM-DD hoặc DD-MM-YYYY
 * @returns Thông tin cung hoàng đạo hoặc null nếu không hợp lệ
 */
export function getZodiacSignFromDate(dateString: string): ZodiacSignInfo | null {
  if (!dateString) return null;

  // Parse date - hỗ trợ cả YYYY-MM-DD và DD-MM-YYYY
  let month: number;
  let day: number;

  if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      // Kiểm tra format: nếu phần đầu > 31 thì là YYYY-MM-DD
      if (parseInt(parts[0]) > 31) {
        // Format: YYYY-MM-DD
        month = parseInt(parts[1]);
        day = parseInt(parts[2]);
      } else {
        // Format: DD-MM-YYYY
        day = parseInt(parts[0]);
        month = parseInt(parts[1]);
      }
    } else {
      return null;
    }
  } else {
    return null;
  }

  if (isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  // Xác định cung hoàng đạo dựa trên tháng và ngày
  // Xử lý các cung nằm giữa 2 tháng
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return signs.find(s => s.id === '1') || null; // Bạch Dương
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return signs.find(s => s.id === '2') || null; // Kim Ngưu
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return signs.find(s => s.id === '3') || null; // Song Tử
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return signs.find(s => s.id === '4') || null; // Cự Giải
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return signs.find(s => s.id === '5') || null; // Sư Tử
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return signs.find(s => s.id === '6') || null; // Xử Nữ
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return signs.find(s => s.id === '7') || null; // Thiên Bình
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return signs.find(s => s.id === '8') || null; // Bọ Cạp
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return signs.find(s => s.id === '9') || null; // Nhân Mã
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return signs.find(s => s.id === '10') || null; // Ma Kết
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return signs.find(s => s.id === '11') || null; // Bảo Bình
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return signs.find(s => s.id === '12') || null; // Song Ngư
  }

  return null;
}

/**
 * Tính thông số ngày mới dựa trên ngày hiện tại
 * Tạo các giá trị may mắn dựa trên ngày để có sự thay đổi hàng ngày
 */
export interface DailyStats {
  luckyNumbers: string[];
  luckyColor: {
    name: string;
    hex: string;
  };
  fengShui: {
    name: string;
    advice: string;
  };
}

const colors = [
  { name: 'Xanh Lục', hex: '#36E27B' },
  { name: 'Đỏ', hex: '#FF4D4D' },
  { name: 'Vàng', hex: '#FFD93D' },
  { name: 'Cam', hex: '#FF8C32' },
  { name: 'Tím', hex: '#8B5CF6' },
  { name: 'Hồng', hex: '#F472B6' },
  { name: 'Xanh Dương', hex: '#4D94FF' },
  { name: 'Xanh Lam', hex: '#06B6D4' },
  { name: 'Bạc', hex: '#C0C0C0' },
  { name: 'Vàng Ánh Kim', hex: '#FFD700' },
];

const directions = [
  { name: 'Đông', advice: 'Mang lại năng lượng tích cực và sự khởi đầu mới.' },
  { name: 'Nam', advice: 'Tăng cường danh tiếng và sự công nhận trong công việc.' },
  { name: 'Tây', advice: 'Hỗ trợ sự sáng tạo và các dự án nghệ thuật.' },
  { name: 'Bắc', advice: 'Mang lại sự ổn định và phát triển sự nghiệp lâu dài.' },
  { name: 'Đông Nam', advice: 'Mang lại tài lộc và sự hanh thông trong công việc.' },
  { name: 'Tây Nam', advice: 'Tăng cường các mối quan hệ và tình cảm gia đình.' },
  { name: 'Tây Bắc', advice: 'Hỗ trợ học tập và phát triển trí tuệ.' },
  { name: 'Đông Bắc', advice: 'Mang lại may mắn và cơ hội mới.' },
];

/**
 * Tính thông số ngày mới dựa trên ngày hiện tại
 * @param date - Ngày cần tính (mặc định là hôm nay)
 * @returns Thông tin thống kê ngày
 */
export function getDailyStats(date: Date = new Date()): DailyStats {
  // Sử dụng ngày để tạo seed ngẫu nhiên nhưng nhất quán
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const seed = dayOfYear + date.getFullYear();

  // Tính số may mắn (3 số) dựa trên seed
  const num1 = ((seed * 7) % 99) + 1;
  const num2 = ((seed * 13) % 99) + 1;
  const num3 = ((seed * 19) % 99) + 1;
  const luckyNumbers = [
    String(num1).padStart(2, '0'),
    String(num2).padStart(2, '0'),
    String(num3).padStart(2, '0'),
  ];

  // Chọn màu dựa trên seed
  const colorIndex = seed % colors.length;
  const luckyColor = colors[colorIndex];

  // Chọn hướng phong thủy dựa trên seed
  const directionIndex = (seed * 3) % directions.length;
  const fengShui = directions[directionIndex];

  return {
    luckyNumbers,
    luckyColor,
    fengShui,
  };
}

