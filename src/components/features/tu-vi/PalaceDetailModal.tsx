import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PalaceDefinition } from '@/data/tuvi-rules';
import { fadeInScale, spring } from '@/lib/animations';
import { MenhType } from '@/data/tuvi-interpretations';
import { getFullPalaceInterpretation, getPalaceContent } from '@/lib/tuvi-interpretation-helper';
import { ChartData } from '@/lib/tuvi/chart-calculation';
import AIInterpretationModal from './AIInterpretationModal';

interface PalaceDetailModalProps {
    palace: PalaceDefinition | null;
    menh: MenhType;
    chartData?: ChartData;
    fullName?: string;
    onClose: () => void;
}

const PalaceDetailModal: React.FC<PalaceDetailModalProps> = ({ palace, menh, chartData, fullName, onClose }) => {
    if (!palace) return null;

    // Generate cache key from chart data + palace
    const getCacheKey = () => {
        if (!chartData || !fullName || !palace) return null;
        return `ai_interpretation_${fullName}_${palace.id}_${chartData.birth_info.canChiYear}`;
    };

    // Load from cache on mount
    React.useEffect(() => {
        const cacheKey = getCacheKey();
        if (cacheKey) {
            try {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    setAiInterpretation(cached);
                }
            } catch (e) {
                console.error('Failed to load from cache:', e);
            }
        }
    }, [palace?.id, fullName, chartData?.birth_info.canChiYear]);

    const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Handle scroll to show/hide scroll to top button
    React.useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                setShowScrollTop(contentRef.current.scrollTop > 300);
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
            return () => contentElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToTop = () => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copyToClipboard = async () => {
        const textToCopy = aiInterpretation || content;
        try {
            await navigator.clipboard.writeText(textToCopy);
            // Show toast notification (simple alert for now)
            alert('Đã sao chép vào clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const interpretation = getFullPalaceInterpretation(menh, palace.id);
    const content = interpretation?.detailed || interpretation?.summary || getPalaceContent(menh, palace.id);
    const displayContent = aiInterpretation || content;

    const handleGenerateAI = async () => {
        if (!chartData || !fullName) {
            setAiError('Thiếu thông tin để tạo luận giải AI');
            return;
        }

        setIsLoadingAI(true);
        setIsStreaming(true);
        setAiError(null);
        setAiInterpretation(''); // Reset để bắt đầu streaming

        try {
            const response = await fetch('/api/interpret/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chartData,
                    palaceId: palace.id,
                    fullName,
                }),
            });

            if (!response.ok) {
                throw new Error('Không thể tạo luận giải AI');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            if (!reader) {
                throw new Error('Không thể đọc stream');
            }

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                    setIsStreaming(false);
                    setIsLoadingAI(false);
                    break;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            
                            if (data.error) {
                                throw new Error(data.error);
                            }
                            
                            if (data.text) {
                                setAiInterpretation(prev => {
                                    const newText = (prev || '') + data.text;
                                    // Save to cache as we stream
                                    const cacheKey = getCacheKey();
                                    if (cacheKey) {
                                        try {
                                            localStorage.setItem(cacheKey, newText);
                                        } catch (e) {
                                            console.error('Failed to save to cache:', e);
                                        }
                                    }
                                    return newText;
                                });
                            }
                            
                            if (data.done) {
                                setIsStreaming(false);
                                setIsLoadingAI(false);
                                // Open AI modal when done
                                setShowAIModal(true);
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }
            }
        } catch (error: any) {
            setAiError(error.message || 'Có lỗi xảy ra khi tạo luận giải AI');
            setIsLoadingAI(false);
            setIsStreaming(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* Modal Content */}
                <motion.div
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden glass rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-primary/20 shadow-xl"
                    variants={fadeInScale}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={spring.bouncy}
                >
                    {/* Header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent p-4 sm:p-6 lg:p-8 border-b border-white/10">
                        <motion.div
                            className="absolute top-0 right-0 size-48 sm:size-56 lg:size-64 bg-primary/20 blur-[80px] sm:blur-[100px] rounded-full -mr-24 sm:-mr-28 lg:-mr-32 -mt-24 sm:-mt-28 lg:-mt-32"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="relative z-10 flex items-start justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                <motion.div
                                    className="size-12 sm:size-14 lg:size-16 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0"
                                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                                    transition={spring.bouncy}
                                >
                                    <span className="material-symbols-outlined text-2xl sm:text-3xl lg:text-4xl">{palace.icon}</span>
                                </motion.div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-1">{palace.name}</h2>
                                    <p className="text-xs sm:text-sm text-text-secondary">{palace.description}</p>
                                </div>
                            </div>

                            <motion.button
                                onClick={onClose}
                                className="size-8 sm:size-9 lg:size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 shrink-0"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={spring.snappy}
                                aria-label="Đóng"
                            >
                                <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div 
                        ref={contentRef}
                        className="overflow-y-auto max-h-[calc(85vh-180px)] p-4 sm:p-6 lg:p-8 custom-scrollbar relative"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* AI Generate Button - Prominent */}
                            {chartData && fullName && !aiInterpretation && (
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <motion.button
                                        onClick={handleGenerateAI}
                                        disabled={isLoadingAI}
                                        className="w-full p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 border-2 border-primary/40 hover:border-primary/60 transition-all flex flex-col items-center justify-center gap-3 text-primary font-black disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-lg shadow-primary/20"
                                        whileHover={{ scale: isLoadingAI ? 1 : 1.02, y: -2 }}
                                        whileTap={{ scale: isLoadingAI ? 1 : 0.98 }}
                                    >
                                        {isLoadingAI ? (
                                            <>
                                                <motion.span
                                                    className="material-symbols-outlined text-2xl"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    auto_awesome
                                                </motion.span>
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-base sm:text-lg">Đang tạo luận giải AI...</span>
                                                    {isStreaming && (
                                                        <span className="text-xs text-primary/70">Đang xử lý nội dung</span>
                                                    )}
                                                </div>
                                                {isStreaming && (
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary/40"
                                                        initial={{ width: '0%' }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <motion.span
                                                    className="material-symbols-outlined text-3xl sm:text-4xl"
                                                    animate={{ 
                                                        scale: [1, 1.1, 1],
                                                        rotate: [0, 5, -5, 0]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    auto_awesome
                                                </motion.span>
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-base sm:text-lg">Tạo Luận Giải AI Cá Nhân Hóa</span>
                                                    <span className="text-xs text-primary/70 font-normal">Nhận phân tích chi tiết 200-300 từ</span>
                                                    <span className="text-xs text-amber-400/80 font-normal mt-1">⏱️ Quá trình luận giải có thể mất khoảng 30 giây, vui lòng kiên nhẫn</span>
                                                </div>
                                            </>
                                        )}
                                    </motion.button>
                                    {aiError && (
                                        <motion.p
                                            className="mt-3 text-xs text-red-400 text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {aiError}
                                        </motion.p>
                                    )}
                                </motion.div>
                            )}
                            
                            {/* Streaming Indicator */}
                            {isStreaming && aiInterpretation && (
                                <motion.div
                                    className="mb-4 flex items-center gap-2 text-primary text-xs"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.span
                                        className="material-symbols-outlined text-sm"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        auto_awesome
                                    </motion.span>
                                    <span>Đang tạo nội dung...</span>
                                </motion.div>
                            )}

                            {/* AI Content Preview */}
                            {aiInterpretation && (
                                <motion.div
                                    className="mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 relative overflow-hidden cursor-pointer group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => setShowAIModal(true)}
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(54, 226, 123, 0.5)' }}
                                >
                                    {/* Glow effect */}
                                    <div className="absolute top-0 right-0 size-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />
                                    
                                    {/* Badge */}
                                    <div className="relative z-10 flex items-center justify-between mb-3">
                                        <motion.div
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/30 border border-primary/50 text-primary text-xs font-bold"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <motion.span
                                                className="material-symbols-outlined text-sm"
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                auto_awesome
                                            </motion.span>
                                            <span>Luận Giải AI Cá Nhân Hóa</span>
                                        </motion.div>
                                        <motion.span
                                            className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                            whileHover={{ x: 4 }}
                                        >
                                            open_in_new
                                        </motion.span>
                                    </div>

                                    {/* Preview Content (first 200 chars) */}
                                    <div className="relative z-10">
                                        <p className="text-text-secondary leading-relaxed text-sm sm:text-base line-clamp-3">
                                            {aiInterpretation.substring(0, 200)}...
                                        </p>
                                        <p className="mt-3 text-xs text-primary/70 font-medium">
                                            👆 Click để xem toàn bộ luận giải chi tiết
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Default Content (Collapsible if AI exists) */}
                            {(!aiInterpretation || interpretation) && (
                                <motion.div
                                    className="mb-6 sm:mb-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: aiInterpretation ? 0.3 : 0 }}
                                >
                                    {aiInterpretation && (
                                        <details className="group">
                                            <summary className="cursor-pointer text-xs sm:text-sm font-black uppercase tracking-widest text-text-secondary mb-3 flex items-center gap-2 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-sm sm:text-base transition-transform group-open:rotate-90">
                                                    chevron_right
                                                </span>
                                                Xem Luận Giải Mặc Định
                                            </summary>
                                            <div className="mt-3 text-text-secondary leading-relaxed text-sm sm:text-base whitespace-pre-line opacity-70">
                                                {content}
                                            </div>
                                        </details>
                                    )}
                                    {!aiInterpretation && (
                                        <>
                                <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm sm:text-base">auto_stories</span>
                                    Giải Mã Chi Tiết
                                </h3>
                                            <div className="text-text-secondary leading-relaxed text-sm sm:text-base whitespace-pre-line">
                                    {content}
                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {/* Strengths */}
                            {interpretation?.strengths && interpretation.strengths.length > 0 && (
                                <motion.div
                                    className="mb-6 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-green-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">trending_up</span>
                                        Điểm Mạnh
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.strengths.map((strength, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-green-400 mt-0.5">•</span>
                                                <span>{strength}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Advice */}
                            {interpretation?.advice && interpretation.advice.length > 0 && (
                                <motion.div
                                    className="mb-6 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">lightbulb</span>
                                        Lời Khuyên
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.advice.map((advice, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-blue-400 mt-0.5">•</span>
                                                <span>{advice}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Warnings */}
                            {interpretation?.warnings && interpretation.warnings.length > 0 && (
                                <motion.div
                                    className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">warning</span>
                                        Lưu Ý
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.warnings.map((warning, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-amber-400 mt-0.5">•</span>
                                                <span>{warning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Weaknesses */}
                            {interpretation?.weaknesses && interpretation.weaknesses.length > 0 && (
                                <motion.div
                                    className="mt-6 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm sm:text-base">info</span>
                                        Điểm Cần Cải Thiện
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                                        {interpretation.weaknesses.map((weakness, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-purple-400 mt-0.5">•</span>
                                                <span>{weakness}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Scroll to Top Button */}
                    <AnimatePresence>
                        {showScrollTop && (
                            <motion.button
                                onClick={scrollToTop}
                                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 size-12 sm:size-14 rounded-full bg-primary/20 hover:bg-primary/30 border-2 border-primary/40 flex items-center justify-center text-primary shadow-lg shadow-primary/20 z-10"
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                title="Lên đầu trang"
                            >
                                <span className="material-symbols-outlined text-xl sm:text-2xl">arrow_upward</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* AI Interpretation Modal */}
            {aiInterpretation && (
                <AIInterpretationModal
                    content={aiInterpretation}
                    palaceName={palace.name}
                    fullName={fullName || ''}
                    isOpen={showAIModal}
                    onClose={() => setShowAIModal(false)}
                />
            )}
        </AnimatePresence>
    );
};

export default PalaceDetailModal;
