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
        <div className="rounded-xl bg-white/15 p-3 ring-1 ring-white/20">
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
        <div className="rounded-xl bg-white/15 p-3 ring-1 ring-white/20">
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
        <div className="rounded-xl bg-white/15 p-3 ring-1 ring-white/20">
          <div className="text-[10px] font-medium text-slate-400">Widget A</div>
          <div className="mt-0.5 text-lg font-bold text-amber-600">12 left</div>
        </div>
        <div className="rounded-xl bg-white/15 p-3 ring-1 ring-white/20">
          <div className="text-[10px] font-medium text-slate-400">Coil B</div>
          <div className="mt-0.5 text-lg font-bold text-rose-600">8 left</div>
        </div>
      </div>
    );
  }
  if (kind === "finance") {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/15 p-3 ring-1 ring-white/20">
          <div className="text-[10px] font-medium text-slate-400">Cash</div>
          <div className="mt-0.5 text-lg font-bold text-emerald-600">Strong</div>
        </div>
        <div className="rounded-xl bg-white/15 p-3 ring-1 ring-white/20">
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
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // Scroll only inside the chat panel — never the page
    el.scrollTop = el.scrollHeight;
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
    <div className="flex h-[520px] max-h-[520px] flex-col overflow-hidden overscroll-contain rounded-3xl border border-slate-100 bg-white/95 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl md:h-[540px] md:max-h-[540px] md:p-6">
      {/* Header */}
      <div className="mb-4 flex shrink-0 items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <AiAvatar size={32} />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Knight AI Assistant</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Powered by your ERP data</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
            title="Reset chat"
            className="rounded-lg p-1.5 transition-colors hover:bg-slate-100 hover:text-slate-700"
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
      <div
        ref={listRef}
        className="mb-3 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-y-contain pr-1"
        style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
      >
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
                    ? "rounded-tr-md bg-slate-950 text-white"
                    : "rounded-tl-md bg-black text-white"
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
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-black px-4 py-3">
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
        className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Knight AI anything…"
          className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={typing || !input.trim()}
          className="rounded-xl bg-slate-950 p-2 text-white transition hover:scale-105 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      {/* Quick prompts */}
      <div className="mt-3 flex shrink-0 flex-wrap gap-2">
        {QUICK.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={typing}
            onClick={(e) => {
              e.preventDefault();
              ask(prompt);
            }}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
