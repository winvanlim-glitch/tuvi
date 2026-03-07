/**
 * Visual representation of the 12 palaces in a circular layout
 * This component displays the Tử Vi chart in a traditional circular format
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChartData, PALACE_IDS } from '@/lib/tuvi/chart-calculation';
import { PALACES } from '@/data/tuvi-rules';

interface PalaceChartProps {
    chartData: ChartData;
    menh: string;
    onPalaceClick?: (palaceId: string) => void;
}

const PALACE_NAMES_VI: Record<string, string> = {
    'menh': 'Mệnh',
    'phu_mau': 'Phụ Mẫu',
    'phuc_duc': 'Phúc Đức',
    'dien_trach': 'Điền Trạch',
    'quan_loc': 'Quan Lộc',
    'no_boc': 'Nô Bộc',
    'tat_ach': 'Tật Ách',
    'tai_bach': 'Tài Bạch',
    'tu_tuc': 'Tử Tức',
    'phu_the': 'Phu Thê',
    'huynh_de': 'Huynh Đệ',
    'thien_di': 'Thiên Di'
};

const PalaceChart: React.FC<PalaceChartProps> = ({ chartData, menh, onPalaceClick }) => {
    // Get palace order for circular layout (starting from top)
    const palaceOrder = [
        'quan_loc',   // Top
        'phu_mau',    // Top-right
        'huynh_de',   // Right
        'thien_di',    // Bottom-right
        'tat_ach',     // Bottom
        'no_boc',      // Bottom-left
        'phuc_duc',    // Left
        'phu_the',     // Top-left
        'dien_trach',  // Inner top-right
        'tai_bach',    // Inner right
        'tu_tuc',      // Inner bottom-left
        'menh'         // Center
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Miếu':
                return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white';
            case 'Vượng':
                return 'bg-gradient-to-br from-green-400 to-emerald-500 text-white';
            case 'Đắc Địa':
                return 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white';
            case 'Hãm Địa':
                return 'bg-gradient-to-br from-red-400 to-rose-500 text-white';
            default:
                return 'bg-gradient-to-br from-gray-400 to-slate-500 text-white';
        }
    };

    const getStarNames = (palaceId: string) => {
        const palace = (chartData as any)[palaceId];
        if (!palace?.stars) return [];
        
        // Get main stars first
        const mainStars = palace.stars
            .filter((s: any) => s.type === 'major')
            .map((s: any) => s.starName)
            .slice(0, 2);
        
        return mainStars;
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto aspect-square">
            {/* Outer Circle */}
            <div className="absolute inset-0 rounded-full border-4 border-gradient-to-br from-amber-500 to-orange-600 shadow-2xl"></div>
            
            {/* Inner Circle */}
            <div className="absolute inset-8 rounded-full border-2 border-dashed border-amber-300/50"></div>
            
            {/* Center Circle - Mệnh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                <motion.div
                    className={`w-full h-full rounded-full flex flex-col items-center justify-center shadow-xl cursor-pointer ${getStatusColor(chartData.menh?.status || 'Bình')}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => onPalaceClick?.('menh')}
                >
                    <span className="text-xs font-bold">MỆNH</span>
                    <span className="text-[10px] opacity-90">{getStarNames('menh')[0] || ''}</span>
                    <span className="text-[10px] opacity-75">{chartData.menh?.status || ''}</span>
                </motion.div>
            </div>

            {/* 8 Outer Palaces */}
            {palaceOrder.slice(0, 8).map((palaceId, index) => {
                const palace = (chartData as any)[palaceId];
                const stars = getStarNames(palaceId);
                const status = palace?.status || 'Bình';
                
                // Calculate position on circle
                const angle = (index * 45 - 90) * (Math.PI / 180);
                const radius = 38; // percentage
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                    <div
                        key={palaceId}
                        className="absolute"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <motion.div
                            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl flex flex-col items-center justify-center shadow-lg cursor-pointer ${getStatusColor(status)}`}
                            whileHover={{ scale: 1.15, zIndex: 50 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => onPalaceClick?.(palaceId)}
                        >
                            <span className="text-[10px] sm:text-xs font-bold">{PALACE_NAMES_VI[palaceId]}</span>
                            <span className="text-[8px] sm:text-[10px] opacity-90 truncate max-w-full px-1">
                                {stars[0] || ''}
                            </span>
                            <span className="text-[8px] opacity-75">{status}</span>
                        </motion.div>
                    </div>
                );
            })}

            {/* 4 Inner Palaces (between center and outer) */}
            {palaceOrder.slice(8, 12).map((palaceId, index) => {
                const palace = (chartData as any)[palaceId];
                const stars = getStarNames(palaceId);
                const status = palace?.status || 'Bình';
                
                const angle = ((index * 90 + 45) - 90) * (Math.PI / 180);
                const radius = 18;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                    <div
                        key={palaceId}
                        className="absolute"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <motion.div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex flex-col items-center justify-center shadow-md cursor-pointer ${getStatusColor(status)}`}
                            whileHover={{ scale: 1.15, zIndex: 50 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => onPalaceClick?.(palaceId)}
                        >
                            <span className="text-[8px] sm:text-[10px] font-bold">{PALACE_NAMES_VI[palaceId]}</span>
                            <span className="text-[6px] sm:text-[8px] opacity-90 truncate max-w-full px-1">
                                {stars[0] || ''}
                            </span>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};

export default PalaceChart;
