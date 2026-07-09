"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/10 bg-[#05070f] px-6 py-28 sm:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-amber-300/80"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Let&apos;s build something
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-md text-white/60"
        >
          Open to conversations about defense tech, cloud architecture, or
          anything at the edge of AI and systems engineering.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href={`mailto:${siteConfig.email}`}
          className="mt-8 rounded-full border border-amber-300/40 bg-amber-300/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-200 transition-colors hover:bg-amber-300/20"
        >
          {siteConfig.email}
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-xs text-white/30"
        >
          {`© ${new Date().getFullYear()} ${siteConfig.name} — ${siteConfig.brandShort}`}
        </motion.p>
      </div>
    </section>
  );
}
