"use client";

import { motion } from "framer-motion";
import { careerScreens } from "@/data/career";

const skillGroups = careerScreens.filter((s) => s.kind === "skills");

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-white/10 bg-[#040611] px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-center text-xs uppercase tracking-[0.4em] text-amber-300/80"
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Tools of the trade
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300/80">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.bullets.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
