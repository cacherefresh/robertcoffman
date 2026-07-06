"use client";

import { motion } from "framer-motion";

export function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70"
      >
        <span className="font-semibold text-white">Robert Coffman</span>
        <div className="pointer-events-auto hidden items-center gap-8 sm:flex">
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#experience" className="transition-colors hover:text-white">
            Experience
          </a>
          <a href="#skills" className="transition-colors hover:text-white">
            Skills
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
        </div>
      </motion.nav>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-amber-300/80"
        >
          Software Engineer &middot; Systems Architect
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="max-w-3xl bg-gradient-to-b from-white via-white to-amber-200/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
        >
          The Oracle Chamber
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
          className="mt-5 max-w-xl text-balance text-sm text-white/60 sm:text-base"
        >
          A living archive of drone defense systems, cloud migrations, and enterprise
          platforms &mdash; orbiting in real time.
        </motion.p>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="pointer-events-auto flex justify-center pb-2 text-[11px] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white/70"
      >
        Scroll to explore
      </motion.a>
    </div>
  );
}
