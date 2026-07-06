"use client";

import { motion } from "framer-motion";
import { careerScreens } from "@/data/career";

const roles = careerScreens.filter((s) => s.kind === "role");

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-white/10 bg-[#05070f] px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-center text-xs uppercase tracking-[0.4em] text-amber-300/80"
        >
          Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Where the work has taken me
        </motion.h2>

        <div className="relative border-l border-white/10 pl-8 sm:pl-10">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative mb-12 last:mb-0"
            >
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full sm:-left-[calc(2.5rem+5px)]"
                style={{ backgroundColor: role.accent, boxShadow: `0 0 12px ${role.accent}` }}
              />
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: role.accent }}
              >
                {role.eyebrow}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">{role.title}</h3>
              {role.subtitle && (
                <p className="mt-0.5 text-sm text-white/50">{role.subtitle}</p>
              )}
              <ul className="mt-3 space-y-1.5">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-white/70 sm:text-base">
                    <span className="mr-2 text-white/30">&mdash;</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
