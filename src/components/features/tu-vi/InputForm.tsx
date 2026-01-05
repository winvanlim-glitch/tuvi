import React from 'react';
import { motion } from 'framer-motion';
import BirthDatePicker from './BirthDatePicker';
import BirthTimePicker from './BirthTimePicker';
import { FormData } from '@/hooks/useFormState';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface InputFormProps {
    formData: FormData;
    onChange: (data: Partial<FormData>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isValid: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ formData, onChange, onSubmit, isValid }) => {
    return (
        <motion.div
            key="input-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative overflow-hidden glass rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 lg:p-8 xl:p-10 border border-white/10 shadow-xl"
        >
            {/* Mystic Background Decor */}
            <div className="absolute top-0 right-0 size-64 sm:size-80 lg:size-96 bg-primary/10 blur-[100px] sm:blur-[120px] rounded-full -mr-16 sm:-mr-24 lg:-mr-32 -mt-16 sm:-mt-24 lg:-mt-32 pointer-events-none" />

            <div className="relative z-10 text-center mb-6 sm:mb-8 lg:mb-10">
                <motion.div
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4 sm:mb-5 lg:mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <span className="material-symbols-outlined text-xs sm:text-sm">stars</span>
                    Khởi tạo bản mệnh
                </motion.div>
                <motion.h1
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-3 sm:mb-4 tracking-tighter"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                >
                    Giải Mã Lá Số Tử Vi
                </motion.h1>
                <motion.p
                    className="text-text-secondary text-sm sm:text-base max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Kết nối dữ liệu ngày giờ sinh với các vì sao để nhận bản phân tích vận mệnh độc bản.
                </motion.p>
            </div>

            <motion.form
                onSubmit={onSubmit}
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Full Name Field */}
                <motion.div className="space-y-2 sm:space-y-2.5" variants={fadeInUp}>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Họ và tên chủ mệnh</label>
                    <motion.div
                        className="flex items-center bg-background-dark/60 border border-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 gap-3 sm:gap-4 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <span className="material-symbols-outlined text-text-secondary text-lg sm:text-xl">person</span>
                        <input
                            required
                            type="text"
                            placeholder="Ví dụ: Nguyễn Minh Anh"
                            className="bg-transparent border-none outline-none flex-1 text-sm sm:text-base text-white placeholder:opacity-30"
                            value={formData.fullName}
                            onChange={(e) => onChange({ fullName: e.target.value })}
                        />
                    </motion.div>
                </motion.div>

                {/* Gender Selection */}
                <motion.div className="space-y-2 sm:space-y-2.5" variants={fadeInUp}>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">GIỚI TÍNH</label>
                    <div className="flex bg-surface-dark border border-white/5 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 gap-1 sm:gap-1.5 h-[52px] sm:h-[60px] lg:h-[68px]">
                        {['Nam', 'Nữ', 'Khác'].map((g) => (
                            <motion.button
                                key={g}
                                type="button"
                                onClick={() => onChange({ gender: g })}
                                className={`flex-1 h-full rounded-lg sm:rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center ${formData.gender === g ? 'bg-primary text-background-dark shadow-xl' : 'text-text-secondary hover:text-white hover:bg-white/5'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                {g}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Date of Birth */}
                <motion.div className="md:col-span-2 space-y-2 sm:space-y-2.5" variants={fadeInUp}>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 block text-center md:text-left">NGÀY THÁNG NĂM SINH</label>
                    <div className="bg-background-dark/60 border border-white/5 rounded-xl sm:rounded-2xl p-2 sm:p-3 focus-within:border-primary/50 transition-all">
                            <BirthDatePicker value={formData.dob} onChange={(date) => onChange({ dob: date })} />
                    </div>
                </motion.div>

                {/* Time of Birth */}
                <motion.div className="md:col-span-2 space-y-2 sm:space-y-2.5" variants={fadeInUp}>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Giờ sinh chi tiết</label>
                    <div className="flex items-center bg-background-dark/60 border border-white/5 rounded-xl sm:rounded-2xl p-1 gap-3 sm:gap-4 focus-within:border-primary/50 transition-all">
                        <div className="w-full">
                            <BirthTimePicker value={formData.tob} onChange={(time) => onChange({ tob: time })} />
                        </div>
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={!isValid}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="md:col-span-2 mt-4 sm:mt-5 lg:mt-6 group relative bg-primary text-background-dark font-black py-3.5 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(54,226,123,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                        GIẢI MÃ BẢN MỆNH NGAY
                        <motion.span
                            className="material-symbols-outlined text-lg sm:text-xl"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                            bolt
                        </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default InputForm;
