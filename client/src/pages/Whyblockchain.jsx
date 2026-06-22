import { Lock, Eye, Zap, Ban } from "lucide-react";

const features = [
  {
    icon: Ban,
    title: "No middleman",
    desc: "No platform sits between you and your backers. The contract moves funds directly, creator to donor and back.",
  },
  {
    icon: Lock,
    title: "Trustless by design",
    desc: "You don't have to trust a team, a company, or a promise. The rules are written in code and run exactly as deployed.",
  },
  {
    icon: Eye,
    title: "Fully transparent",
    desc: "Every donation, withdrawal, and refund is recorded on-chain. Anyone can verify it on Etherscan, anytime.",
  },
  {
    icon: Zap,
    title: "Instant refunds",
    desc: "Goal not met by the deadline? Refunds aren't requested, they're claimed — straight from the contract, no approval needed.",
  },
];

export default function WhyBlockchain() {
  return (
    <section className="relative w-full px-6 ">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Why blockchain
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
            Built on code,
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              not on promises.
            </span>
          </h2>
          <p className="mt-4 text-slate-400">
            Traditional crowdfunding asks you to trust a platform. We removed the
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/40 hover:bg-white/[0.07]"
              >
                {/* ambient glow on hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-500/20" />

                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)]">
                  <Icon className="h-6 w-6 text-violet-300" strokeWidth={1.8} />
                </div>

                <h3 className="relative z-10 text-lg font-bold text-white">
                  {f.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}