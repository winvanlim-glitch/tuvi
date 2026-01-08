"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useToast } from "./Toast";
import { useRouter } from "next/navigation";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

const categories = [
  { value: "general", label: "Góp ý chung" },
  { value: "feature", label: "Đề xuất tính năng" },
  { value: "bug", label: "Báo lỗi" },
  { value: "ui", label: "Giao diện" },
  { value: "content", label: "Nội dung" },
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  onSubmitted,
}) => {
  const { showToast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.feedback.trim()) {
      showToast({
        message: "Vui lòng nhập nội dung góp ý",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      showToast({
        message: "Cảm ơn bạn đã góp ý!",
        type: "success",
        duration: 3000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        feedback: "",
        category: "general",
      });

      onSubmitted?.();
      onClose();
      
      // Refresh page to show new feedback
      router.refresh();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      showToast({
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        type: "error",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-9 sm:size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">feedback</span>
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Góp ý</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Category */}
                <div>
                  <label htmlFor="modal-category" className="block text-sm font-medium mb-2">
                    Loại góp ý
                  </label>
                  <select
                    id="modal-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-surface-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium mb-2">
                    Tên của bạn <span className="text-text-secondary text-xs">(tùy chọn)</span>
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập tên của bạn"
                    className="w-full bg-surface-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium mb-2">
                    Email <span className="text-text-secondary text-xs">(tùy chọn)</span>
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-surface-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Feedback */}
                <div>
                  <label htmlFor="modal-feedback" className="block text-sm font-medium mb-2">
                    Nội dung góp ý <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="modal-feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Chia sẻ suy nghĩ, đề xuất hoặc phản hồi của bạn..."
                    rows={6}
                    required
                    className="w-full bg-surface-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-surface-dark/50 hover:bg-surface-dark border border-white/10 text-white font-medium py-2.5 px-4 rounded-xl transition-all"
                  >
                    Hủy
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.feedback.trim()}
                    className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-semibold py-2.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">send</span>
                        <span>Gửi</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

