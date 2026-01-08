"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useToast } from "./Toast";

export interface Comment {
  id: string;
  feedback_id: string;
  name: string;
  email?: string;
  comment: string;
  created_at: string;
}

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  feedbackId: string;
  feedbackTitle: string;
  onCommentAdded?: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  open,
  onClose,
  feedbackId,
  feedbackTitle,
  onCommentAdded,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && feedbackId) {
      fetchComments();
    }
  }, [open, feedbackId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments?feedback_id=${feedbackId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comment.trim()) {
      showToast({
        message: "Vui lòng nhập nội dung bình luận",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback_id: feedbackId,
          name: formData.name || "Anonymous",
          email: formData.email || undefined,
          comment: formData.comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      showToast({
        message: "Bình luận đã được thêm!",
        type: "success",
        duration: 3000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        comment: "",
      });

      // Refresh comments
      await fetchComments();
      onCommentAdded?.();
    } catch (error) {
      console.error("Error submitting comment:", error);
      showToast({
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        type: "error",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN");
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
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 max-w-2xl w-full max-h-[90vh] flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 shrink-0">
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">Bình luận</h2>
                  <p className="text-xs sm:text-sm text-text-secondary line-clamp-2">{feedbackTitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-white transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto mb-4 sm:mb-6 space-y-3 sm:space-y-4 min-h-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="material-symbols-outlined animate-spin text-primary text-2xl">
                      sync
                    </span>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 text-text-secondary">
                    <span className="material-symbols-outlined text-4xl mb-2 block">comment</span>
                    <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface-dark/30 rounded-xl p-3 sm:p-4 border border-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="size-7 sm:size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-primary text-xs sm:text-sm">
                            person
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{comment.name}</span>
                            <span className="text-[11px] sm:text-xs text-text-secondary">
                              {formatDate(comment.created_at)}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-white/90 leading-relaxed whitespace-pre-wrap">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Comment Form */}
              <form onSubmit={handleSubmit} className="space-y-3 shrink-0 border-t border-white/10 pt-3 sm:pt-4">
                <div className="flex gap-3 flex-col sm:flex-row">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tên của bạn"
                    className="flex-1 bg-surface-dark/50 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email (tùy chọn)"
                    className="flex-1 bg-surface-dark/50 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="flex gap-3">
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Viết bình luận..."
                    rows={3}
                    required
                    className="flex-1 bg-surface-dark/50 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.comment.trim()}
                    className="bg-primary hover:bg-primary/90 text-background-dark font-semibold py-2 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 self-end"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined animate-spin">sync</span>
                    ) : (
                      <span className="material-symbols-outlined">send</span>
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

