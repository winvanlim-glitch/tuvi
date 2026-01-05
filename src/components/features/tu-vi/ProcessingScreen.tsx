import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProcessingScreenProps {
    onComplete: () => void;
}

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Đang kết nối thiên hà...');

    useEffect(() => {
        const messages = [
            'Đang kết nối mạng lưới thiên hà...',
            'Xác định vị trí các hành tinh tại thời điểm sinh...',
            'Phân tích góc chiếu Nhật - Nguyệt...',
            'Tính toán âm dương ngũ hành...',
            'Hoàn tất bản đồ sao của bạn!'
        ];

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                const next = prev + 1.5;
                setStatus(messages[Math.floor((next / 100) * (messages.length - 1))]);
                return next > 100 ? 100 : next;
            });
        }, 40);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center py-24 text-center"
        >
            <div className="relative size-56 mb-12">
                {/* Outer rotating border */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
                />

                {/* Middle rotating border */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6 rounded-full border border-primary/20"
                />

                {/* Inner pulsing glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-12 rounded-full bg-primary/30 blur-2xl"
                />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        className="material-symbols-outlined text-7xl text-primary"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        explore
                    </motion.span>
                </div>

                {/* Progress circle */}
                <svg className="absolute inset-0 size-full -rotate-90">
                    <circle
                        cx="112"
                        cy="112"
                        r="108"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white/5"
                    />
                    <motion.circle
                        cx="112"
                        cy="112"
                        r="108"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="678"
                        initial={{ strokeDashoffset: 678 }}
                        animate={{ strokeDashoffset: 678 - (678 * progress) / 100 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-primary drop-shadow-[0_0_8px_rgba(54,226,123,0.5)]"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute size-2 rounded-full bg-primary/60"
                        style={{
                            left: '50%',
                            top: '50%',
                        }}
                        animate={{
                            x: [0, Math.cos((i * Math.PI * 2) / 8) * 80, 0],
                            y: [0, Math.sin((i * Math.PI * 2) / 8) * 80, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <motion.h3
                className="text-3xl font-black tracking-tight mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Hệ thống đang giải mã...
            </motion.h3>

            <motion.p
                className="text-primary font-mono text-sm tracking-widest mb-3"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                {Math.round(progress)}%
            </motion.p>

            <motion.p
                className="text-text-secondary italic text-sm max-w-md"
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {status}
            </motion.p>
        </motion.div>
    );
};

export default ProcessingScreen;
