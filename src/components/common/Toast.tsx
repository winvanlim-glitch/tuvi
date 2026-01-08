"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "info" | "success" | "warning" | "error";

export interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      type: "info",
      duration: 5000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          icon: "check_circle",
          iconColor: "text-green-500",
        };
      case "warning":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          icon: "warning",
          iconColor: "text-yellow-500",
        };
      case "error":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: "error",
          iconColor: "text-red-500",
        };
      default:
        return {
          bg: "bg-primary/10",
          border: "border-primary/30",
          icon: "info",
          iconColor: "text-primary",
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {mounted &&
        createPortal(
          <div className="fixed top-4 right-4 z-[10000] flex flex-col gap-3 pointer-events-none max-w-md w-full sm:w-auto">
            <AnimatePresence mode="popLayout">
              {toasts.map((toast) => {
                const styles = getToastStyles(toast.type || "info");
                return (
                  <motion.div
                    key={toast.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                    className={`glass ${styles.bg} ${styles.border} rounded-xl p-4 border pointer-events-auto shadow-lg shadow-black/20`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`material-symbols-outlined ${styles.iconColor} shrink-0`}>
                        {styles.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white leading-relaxed break-words">
                          {toast.message}
                        </p>
                        {toast.action && (
                          <button
                            onClick={() => {
                              toast.action?.onClick();
                              hideToast(toast.id);
                            }}
                            className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors underline"
                          >
                            {toast.action.label}
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => hideToast(toast.id)}
                        className="text-text-secondary hover:text-white transition-colors shrink-0"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

