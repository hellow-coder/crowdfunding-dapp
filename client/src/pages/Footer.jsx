import { Globe, MessageCircle, Code2, ArrowUpRight, Send } from "lucide-react";

const links = {
  Product: ["Explore", "Campaigns", "Create", "Dashboard"],
  Resources: ["How it works", "Smart contract", "Docs", "FAQs"],
  Community: ["Twitter / X", "Discord", "GitHub", "Blog"],
};

const socials = [
  { icon: Globe, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Send, href: "#", label: "Telegram" },
];

export default function Footer() {
  return (
    <footer className="relative w-full px-6 pt-20">
      <div className="mx-auto max-w-6xl">
        {/* Top CTA strip */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:flex-row md:items-center md:p-10">
          <div>
            <h3 className="text-2xl font-extrabold text-white md:text-3xl">
              Have an idea worth funding?
            </h3>
            <p className="mt-2 text-slate-400">
              Launch your campaign in minutes. No approval queue, no platform fee.
            </p>
          </div>
          <button className="group flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            Start a campaign
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-extrabold text-white">
                H
              </div>
              <span className="text-lg font-extrabold tracking-wide text-white">
                HISSA
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Decentralized crowdfunding. Smart contracts handle every donation,
              withdrawal, and refund — no bank, no middleman.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-violet-400/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white">{heading}</h4>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} HISSA. All funds, all rules, on-chain.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#"
              className="font-mono text-slate-400 transition-colors hover:text-white"
            >
              Contract: 0x71C7...976F ↗
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}