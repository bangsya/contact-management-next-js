"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function MenuItems({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  // VARIANTS UNTUK MENU CONTAINER
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        staggerChildren: 0.07,
        staggerDirection: -1,
      },
    },
  };

  // VARIANTS UNTUK ITEM MENU
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 10 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-mobile"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="
        flex flex-col
        absolute top-20 left-0 w-full
        bg-white px-6 py-6 shadow-lg border-t border-gray-100
        lg:hidden
        z-[60]
      "
        >
          <motion.div variants={itemVariants}>
            <Link
              href={`/`}
              onClick={() => setIsOpen(false)}
              className="text-blue-950 font-semibold text-lg hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </motion.div>
          {["Add Contact"].map((item) => (
            <motion.div key={item} variants={itemVariants}>
              <Link
                href={`/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-blue-950 font-semibold text-lg hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Menu versi desktop */}
      <div className="hidden lg:flex lg:flex-row gap-8 justify-center">
        <Link
          href={`/`}
          className="text-blue-950 font-semibold text-lg hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        {["Add Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
            className="text-blue-950 font-semibold text-lg hover:text-blue-600 transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
    </AnimatePresence>
  );
}
