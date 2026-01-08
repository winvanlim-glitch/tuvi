"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

export const DevelopmentToast: React.FC = () => {
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Chỉ hiển thị toast một lần khi vào trang (dùng sessionStorage)
    const hasSeenToast = sessionStorage.getItem("hasSeenDevelopmentToast");
    
    if (!hasSeenToast) {
      // Delay một chút để trang load xong
      const timer = setTimeout(() => {
        showToast({
          message: "Sản phẩm đang trong quá trình phát triển. Chúng tôi rất mong nhận được góp ý từ bạn để cải thiện chất lượng dịch vụ!",
          type: "info",
          duration: 8000,
          action: {
            label: "Góp ý ngay",
            onClick: () => {
              router.push("/gop-y");
            },
          },
        });
        sessionStorage.setItem("hasSeenDevelopmentToast", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showToast, router]);

  return null;
};

