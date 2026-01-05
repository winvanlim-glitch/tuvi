import React from 'react';
import { motion } from 'framer-motion';
import { PalaceDefinition } from '@/data/tuvi-rules';

interface PalaceGridItemProps {
    palace: PalaceDefinition;
    content: string;
    index: number;
    onClick: () => void;
}

const PalaceGridItem: React.FC<PalaceGridItemProps> = ({ palace, content, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay: 0.3 + (index * 0.05),
                type: 'spring',
                stiffness: 300,
                damping: 20
            }}
            whileHover={{
                scale: 1.03,
                y: -4,
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
            }}
            whileTap={{ scale: 0.97 }}
            className="glass rounded-3xl p-6 border border-white/5 transition-all cursor-pointer group"
            onClick={onClick}
        >
            <div className="flex items-start gap-4">
                <motion.div
                    className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary"
                    whileHover={{
                        scale: 1.15,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        color: 'rgba(255, 255, 255, 1)',
                        rotate: [0, -10, 10, 0]
                    }}
                    transition={{
                        scale: { type: 'spring', stiffness: 400, damping: 15 },
                        rotate: { duration: 0.4 }
                    }}
                >
                    <span className="material-symbols-outlined">{palace.icon}</span>
                </motion.div>
                <div className="flex-1">
                    <motion.h4
                        className="font-bold text-lg transition-colors"
                        whileHover={{ color: 'rgba(54, 226, 123, 1)' }}
                        transition={{ duration: 0.2 }}
                    >
                        {palace.name}
                    </motion.h4>
                    <motion.p
                        className="text-xs text-text-secondary mt-1 line-clamp-2"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {content}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default PalaceGridItem;
