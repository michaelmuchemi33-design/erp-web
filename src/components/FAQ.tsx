import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long is the free trial?",
    answer:
      "You get a full 2 months (60 days) of unrestricted access to every Unity ERP module and feature — the same experience as a paying customer.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. You can start your free trial without entering any payment information. Payment is only required when you choose to continue after the trial.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no long-term contracts. You can cancel your subscription at any time from your account settings.",
  },
  {
    question: "What happens after the trial ends?",
    answer:
      "Choose either KES 3,000/month or KES 33,000/year (1 month free) to keep using Unity ERP. Your data stays safe and ready — nothing is deleted.",
  },
  {
    question: "Will my data be deleted if I don’t continue?",
    answer:
      "No. Your data remains available if you subscribe later. We give you a reasonable window to recover or export everything.",
  },
  {
    question: "Is there a limit on users or transactions?",
    answer:
      "No. Every plan includes unlimited users and unlimited transactions. Scale without worrying about per-seat or usage fees.",
  },
  {
    question: "Which industries does Unity ERP support?",
    answer:
      "Manufacturing, Construction, Hospital, Retail & POS, Education, Agriculture, Hospitality, Logistics, Finance & Accounting — all included in one plan.",
  },
  {
    question: "How do I pay?",
    answer:
      "Click the Pay Now button to complete payment securely via Swypt. You can also contact us to arrange alternative payment methods.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to know before starting your free trial.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <h3 className="text-base font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-slate-50 px-6 pb-5 pt-1 leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
