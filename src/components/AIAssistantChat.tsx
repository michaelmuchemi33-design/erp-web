import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Maximize2, MoreHorizontal, Send, Loader2 } from "lucide-react";

const AI_LOGO = "/ai-logo.jpg";

type Msg = {
  id: string;
  role: "ai" | "user";
  text?: string;
  kind?: "text" | "sales" | "inventory" | "finance" | "purchase";
};

const RESPONSES: Record<string, { text: string; kind?: Msg["kind"] }> = {
  "Sales summary": {
    kind: "sales",
    text: "Sales are up 18% this month versus last. Top channel is retail POS. Three products are driving 42% of revenue.",
  },
  "Inventory alerts": {
    kind: "inventory",
    text: "Two SKUs are below safety stock: Widget A (12 left) and Coil B (8 left). Reorder point will trigger in ~3 days at current velocity.",
  },
  "Finance insights": {
    kind: "finance",
    text: "Cash position is healthy. Receivables average 18 days. A bulk supplier deal this week could free about KES 1.2M in working capital.",
  },
  "Purchase recs": {
    kind: "purchase",
    text: "I recommend a consolidated PO for the two low-stock items. Estimated savings: KES 180K if ordered before Friday with your preferred vendor.",
  },
};

const QUICK = Object.keys(RESPONSES);

const welcome: Msg = {
  id: "welcome",
  role: "ai",
  text: "Hi — I am Knight AI. Ask about sales, inventory, finance, or purchases. Try a suggestion below.",
};

function AiAvatar({ size = 28 }: { size?: number }) {
  return (
    <img
      src={AI_LOGO}
      alt="Knight AI"
      width={size}
      height={size}
      className="shrink-0 rounded-full object-contain bg-white ring-1 ring-slate-100"
      style={{ width: size, height: size }}
    />
  );
}

function MetricCards({ kind }: { kind?: Msg["kind"] }) {
  if (kind === "sales") {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10">
          <div className="text-[10px] font-medium text-slate-400">Sales</div>
          <div className="mt-0.5 text-lg font-bold text-emerald-600">+18%</div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ duration: 0.7 }}
              className="h-1.5 rounded-full bg-emerald-500"
            />
          </div>
        </div>
        <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10">
          <div className="text-[10px] font-medium text-slate-400">Revenue</div>
          <div className="mt-0.5 text-lg font-bold text-white">KES 12.8M</div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="h-1.5 rounded-full bg-white/70"
            />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "inventory") {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10">
          <div className="text-[10px] font-medium text-slate-400">Widget A</div>
          <div className="mt-0.5 text-lg font-bold text-amber-600">12 left</div>
        </div>
        <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10">
          <div className="text-[10px] font-medium text-slate-400">Coil B</div>
          <div className="mt-0.5 text-lg font-bold text-rose-600">8 left</div>
        </div>
      </div>
    );
  }
  if (kind === "finance") {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10">
          <div className="text-[10px] font-medium text-slate-400">Cash</div>
          <div className="mt-0.5 text-lg font-bold text-emerald-600">Strong</div>
        </div>
        <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10">
          <div className="text-[10px] font-medium text-slate-400">AR days</div>
          <div className="mt-0.5 text-lg font-bold text-white">18</div>
        </div>
      </div>
    );
  }
  if (kind === "purchase") {
    return (
      <div className="mt-3 rounded-xl bg-white p-3 shadow-sm">
        <div className="text-[10px] font-medium text-slate-400">Suggested savings</div>
        <div className="mt-0.5 text-lg font-bold text-emerald-600">KES 180K</div>
      </div>
    );
  }
  return null;
}

export function AIAssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([welcome]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function reset() {
    setMessages([welcome]);
    setTyping(false);
    setInput("");
  }

  function ask(prompt: string) {
    if (typing) return;
    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: prompt,
    };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);
    setInput("");

    const preset = RESPONSES[prompt];
    const replyText =
      preset?.text ||
      "I can help with sales, inventory, finance, and purchase recommendations. Try one of the suggestions below.";
    const kind = preset?.kind;

    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "ai",
          text: replyText,
          kind,
        },
      ]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    // Match closest preset or free text
    const match = QUICK.find(
      (k) => k.toLowerCase() === q.toLowerCase() || q.toLowerCase().includes(k.toLowerCase().split(" ")[0])
    );
    ask(match || q);
  }

  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-5 shadow-[0_0_60px_rgba(16,185,129,0.15),0_25px_50px_rgba(0,0,0,0.35)] ring-1 ring-emerald-500/20 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <AiAvatar size={32} />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Knight AI Assistant</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Powered by your ERP data · Unity ERP</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            type="button"
            onClick={reset}
            title="Reset chat"
            className="rounded-lg p-1.5 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <span className="rounded-lg p-1.5">
            <Maximize2 className="h-4 w-4" />
          </span>
          <span className="rounded-lg p-1.5">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="mb-3 flex-1 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: 280 }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-2.5 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "ai" && <AiAvatar size={26} />}
              <div
                className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-md bg-emerald-500/20 text-emerald-50 ring-1 ring-emerald-400/30"
                    : "rounded-tl-md bg-black text-slate-100 shadow-[0_0_24px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/40"
                }`}
              >
                {msg.text}
                {msg.role === "ai" && <MetricCards kind={msg.kind} />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2.5"
          >
            <AiAvatar size={26} />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-black px-4 py-3 ring-1 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
              <span className="text-xs text-slate-300">Knight AI is thinking…</span>
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/30"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Knight AI anything…"
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={typing || !input.trim()}
          className="rounded-xl bg-emerald-500 p-2 text-white transition hover:scale-105 hover:bg-emerald-400 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      {/* Quick prompts */}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={typing}
            onClick={() => ask(prompt)}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-200 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
