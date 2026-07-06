"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-[#040611] px-6 py-28 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-amber-300/80"
        >
          About
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Engineering at the intersection of defense, cloud, and AI
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/60 sm:text-lg"
        >
          I&apos;m Robert Coffman, a software engineer and systems architect who has
          spent a career moving between mission-critical defense systems and
          large-scale enterprise platforms. From fusing radar and RF data for
          counter-drone systems to migrating global insurance infrastructure to
          the cloud, I build software that has to work under pressure &mdash;
          real-time, distributed, and resilient by design.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { label: "Focus", value: "Distributed Systems" },
            { label: "Domains", value: "Defense · Cloud · AI" },
            { label: "Stack", value: "Java · Python · AWS" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-5 text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium text-white/90">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
