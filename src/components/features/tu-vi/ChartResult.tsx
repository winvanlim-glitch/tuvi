import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PALACES, PalaceDefinition } from '@/data/tuvi-rules';
import { CalculatedData } from '@/hooks/useTuViCalculation';
import IdentityHeader from './IdentityHeader';
import PalaceCard from './PalaceCard';
import PalaceGridItem from './PalaceGridItem';
import PalaceDetailModal from './PalaceDetailModal';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { getPalaceContent } from '@/lib/tuvi-interpretation-helper';

interface ChartResultProps {
    data: CalculatedData;
    onReset: () => void;
}

const ChartResult: React.FC<ChartResultProps> = ({ data, onReset }) => {
    const [selectedPalace, setSelectedPalace] = useState<PalaceDefinition | null>(null);
    const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(false);

    // Separate High priority and Normal priority palaces
    const highlights = PALACES.filter(p => p.priority === 'high');
    const otherPalaces = PALACES.filter(p => p.priority === 'normal');

    const handlePalaceClick = (palace: PalaceDefinition) => {
        setSelectedPalace(palace);
    };

    const handleCloseModal = () => {
        setSelectedPalace(null);
    };

    const toggleHighlights = () => {
        setIsHighlightsExpanded(!isHighlightsExpanded);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="space-y-6 lg:space-y-8"
            >
                {/* Identity Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <IdentityHeader data={data} onReset={onReset} />
                </motion.div>

                {/* SECTION 1: HIGHLIGHTS (Mệnh - Tài - Quan) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden relative"
                >
                    {/* Header with click to expand */}
                    <motion.button
                        onClick={toggleHighlights}
                        className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-white/5 transition-colors group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <div className="flex items-center gap-2 sm:gap-3">
                        <motion.span
                                className="material-symbols-outlined text-primary text-lg sm:text-xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            stars
                        </motion.span>
                            <h2 className="text-base sm:text-lg font-black uppercase tracking-widest">Tâm Điểm Lá Số</h2>
                        </div>
                        <motion.span
                            className="material-symbols-outlined text-text-secondary transition-transform"
                            animate={{ rotate: isHighlightsExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            expand_more
                        </motion.span>
                    </motion.button>

                    {/* Content with fixed height when collapsed */}
                    <div className="relative">
                        <motion.div
                            className="overflow-hidden"
                            initial={false}
                            animate={{
                                height: isHighlightsExpanded ? 'auto' : '280px',
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="p-4 sm:p-5 pt-0">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                        {highlights.map((palace, i) => (
                            <PalaceCard
                                key={palace.id}
                                palace={palace}
                                            content={getPalaceContent(data.menh as any, palace.id)}
                                index={i}
                                onClick={() => handlePalaceClick(palace)}
                            />
                        ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Gradient overlay when collapsed */}
                        {!isHighlightsExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none" />
                        )}
                    </div>
                </motion.div>

                {/* SECTION 2: ALL PALACES (Grid) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.div
                        className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6 px-2 mt-8 sm:mt-12 lg:mt-16"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <motion.span
                            className="material-symbols-outlined text-text-secondary text-lg sm:text-xl"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            grid_view
                        </motion.span>
                        <h2 className="text-lg sm:text-xl font-black uppercase tracking-widest text-text-secondary">Các Cung Khác</h2>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {otherPalaces.map((palace, i) => (
                            <PalaceGridItem
                                key={palace.id}
                                palace={palace}
                                content={getPalaceContent(data.menh as any, palace.id)}
                                index={i}
                                onClick={() => handlePalaceClick(palace)}
                            />
                        ))}
                    </motion.div>
                </motion.div>

            </motion.div>

            {/* Palace Detail Modal */}
            {selectedPalace && (
                <PalaceDetailModal
                    palace={selectedPalace}
                    menh={data.menh as any}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ChartResult;
