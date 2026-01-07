import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ZodiacSign } from "@/types";

export const signs: (ZodiacSign & { slug: string })[] = [
  {
    id: "1",
    name: "Bạch Dương",
    icon: "wb_sunny",
    color: "#FF4D4D",
    slug: "bach-duong",
  },
  {
    id: "2",
    name: "Kim Ngưu",
    icon: "pets",
    color: "#36E27B",
    slug: "kim-nguu",
  },
  {
    id: "3",
    name: "Song Tử",
    icon: "group",
    color: "#4D94FF",
    slug: "song-tu",
  },
  {
    id: "4",
    name: "Cự Giải",
    icon: "nightlight",
    color: "#FFD93D",
    slug: "cu-giai",
  },
  {
    id: "5",
    name: "Sư Tử",
    icon: "emoji_nature",
    color: "#FF8C32",
    slug: "su-tu",
  },
  { id: "6", name: "Xử Nữ", icon: "spa", color: "#A78BFA", slug: "xu-nu" },
  {
    id: "7",
    name: "Thiên Bình",
    icon: "balance",
    color: "#F472B6",
    slug: "thien-binh",
  },
  {
    id: "8",
    name: "Bọ Cạp",
    icon: "scuba_diving",
    color: "#EF4444",
    slug: "bo-cap",
  },
  {
    id: "9",
    name: "Nhân Mã",
    icon: "near_me",
    color: "#8B5CF6",
    slug: "nhan-ma",
  },
  {
    id: "10",
    name: "Ma Kết",
    icon: "terrain",
    color: "#10B981",
    slug: "ma-ket",
  },
  {
    id: "11",
    name: "Bảo Bình",
    icon: "waves",
    color: "#06B6D4",
    slug: "bao-binh",
  },
  {
    id: "12",
    name: "Song Ngư",
    icon: "sailing",
    color: "#3B82F6",
    slug: "song-ngu",
  },
];

const ZodiacGrid: React.FC = () => {
  // Animation mới: đơn giản, mượt, không blur, vào nhanh + hover phản hồi tốt
  const container: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.045,
        delayChildren: 0.04,
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 18 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 18,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
    >
      {signs.map((sign) => (
        <Link
          key={sign.id}
          href={`/cung-hoang-dao/${sign.slug}`}
          className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 rounded-[24px]"
        >
          <motion.div
            variants={item}
            whileHover={{
              y: -6,
              scale: 1.03,
              background: `radial-gradient(120% 120% at 50% 35%, ${sign.color}18, transparent 60%), #050809`,
              boxShadow: `0 18px 45px ${sign.color}24`,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 22,
              mass: 0.7,
            }}
            className="relative aspect-square rounded-[24px] p-3 sm:p-4 lg:p-5 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all duration-500 border border-white/5 overflow-hidden will-change-transform"
            style={{
              background: "#050809",
            }}
          >
            <div
              className="relative size-12 sm:size-14 lg:size-16 rounded-[18px] flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{
                color: "#fefefe",
              }}
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl lg:text-3xl">
                {sign.icon}
              </span>
            </div>
            <span
              className="relative text-xs sm:text-sm lg:text-base font-black text-center leading-tight tracking-wide drop-shadow-md transition-all duration-500 opacity-60 group-hover:opacity-100"
              style={{ color: sign.color }}
            >
              {sign.name}
            </span>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default ZodiacGrid;
