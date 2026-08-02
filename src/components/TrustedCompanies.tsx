import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const logos = ["Acme Corp", "Globex", "Soylent", "Initech", "Umbrella", "Massive", "Hooli", "Wayne"];

export function TrustedCompanies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-y border-slate-100 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-slate-400"
        >
          Trusted by fast-moving teams
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, filter: "grayscale(0)" }}
              className="cursor-pointer text-xl font-bold text-slate-300 grayscale transition-all duration-300 hover:text-slate-950"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}