"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FeedbackModal } from "@/components/common/FeedbackModal";
import { CommentModal, Comment } from "@/components/common/CommentModal";
import { useToast } from "@/components/common/Toast";

interface Feedback {
  id: string;
  name: string;
  email?: string;
  feedback: string;
  category: string;
  timestamp: string;
  created_at: string;
  comment_count?: number;
}

const categoryLabels: Record<string, string> = {
  general: "Góp ý chung",
  feature: "Đề xuất tính năng",
  bug: "Báo lỗi",
  ui: "Giao diện",
  content: "Nội dung",
};

export default function FeedbackPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string>("");
  const [selectedFeedbackTitle, setSelectedFeedbackTitle] = useState<string>("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/feedback");
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data.data || []);
      } else {
        showToast({
          message: "Không thể tải danh sách góp ý",
          type: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      showToast({
        message: "Có lỗi xảy ra khi tải dữ liệu",
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCommentModal = (feedbackId: string, feedbackTitle: string) => {
    setSelectedFeedbackId(feedbackId);
    setSelectedFeedbackTitle(feedbackTitle);
    setShowCommentModal(true);
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      feature: "bg-green-500/20 text-green-400 border-green-500/30",
      bug: "bg-red-500/20 text-red-400 border-red-500/30",
      ui: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      content: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };
    return colors[category] || colors.general;
  };

  return (
    <div className="max-w-4xl mx-auto py-6 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-4 lg:mb-6 text-sm"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm">Về trang chủ</span>
          </Link>
          <div className="flex items-center justify-between gap-3 mb-5 lg:mb-6">
            <div className="flex items-center gap-3">
              <div className="size-10 lg:size-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl lg:text-2xl">feedback</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-3xl font-bold leading-tight">Góp ý & Phản hồi</h1>
                <p className="text-text-secondary text-xs lg:text-sm mt-1">
                  Chia sẻ ý kiến và thảo luận cùng cộng đồng
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowFeedbackModal(true)}
              className="bg-primary hover:bg-primary/90 text-background-dark font-semibold py-2 px-4 lg:py-2.5 lg:px-5 rounded-xl transition-all flex items-center gap-2 text-sm lg:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span className="hidden sm:inline">Góp ý</span>
            </motion.button>
          </div>
        </div>

        {/* Feedbacks List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">
              sync
            </span>
          </div>
        ) : feedbacks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 glass rounded-2xl border border-white/10"
          >
            <span className="material-symbols-outlined text-6xl text-text-secondary mb-4 block">
              feedback
            </span>
            <h3 className="text-xl font-bold mb-2">Chưa có góp ý nào</h3>
            <p className="text-text-secondary mb-6">
              Hãy là người đầu tiên chia sẻ ý kiến của bạn!
            </p>
            <motion.button
              onClick={() => setShowFeedbackModal(true)}
              className="bg-primary hover:bg-primary/90 text-background-dark font-semibold py-2.5 px-6 rounded-xl transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-symbols-outlined">add</span>
              <span>Góp ý ngay</span>
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-3 lg:space-y-4">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 lg:gap-3 mb-2">
                      <span
                        className={`px-2 py-1 rounded-lg text-[11px] lg:text-xs font-semibold border ${getCategoryColor(
                          feedback.category
                        )}`}
                      >
                        {categoryLabels[feedback.category] || feedback.category}
                      </span>
                      <span className="text-[11px] lg:text-xs text-text-secondary">
                        {formatDate(feedback.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 lg:mb-3">
                      <div className="size-7 lg:size-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-xs lg:text-sm">
                          person
                        </span>
                      </div>
                      <span className="font-semibold text-sm lg:text-base">{feedback.name}</span>
                    </div>
                    <p className="text-white/90 leading-relaxed whitespace-pre-wrap text-sm lg:text-base">
                      {feedback.feedback}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-white/10">
                  <button
                    onClick={() =>
                      handleOpenCommentModal(
                        feedback.id,
                        feedback.feedback.substring(0, 50) + "..."
                      )
                    }
                    className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm lg:text-base"
                  >
                    <span className="material-symbols-outlined text-lg">comment</span>
                    <span className="text-sm font-medium hidden sm:inline">Bình luận</span>
                    <span className="text-sm font-medium sm:hidden">Bình luận</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <FeedbackModal
        open={showFeedbackModal}
        onClose={() => {
          setShowFeedbackModal(false);
        }}
        onSubmitted={() => {
          fetchFeedbacks();
        }}
      />
      <CommentModal
        open={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        feedbackId={selectedFeedbackId}
        feedbackTitle={selectedFeedbackTitle}
        onCommentAdded={() => {
          fetchFeedbacks();
        }}
      />
    </div>
  );
}
