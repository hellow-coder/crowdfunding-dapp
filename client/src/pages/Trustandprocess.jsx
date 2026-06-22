import { Wallet, Rocket, HandCoins, ShieldCheck, ArrowRight } from "lucide-react";

const stats = [
  { value: "$14.9M+", label: "Raised on-chain" },
  { value: "1,840", label: "Active backers" },
  { value: "97%", label: "Funds delivered" },
  { value: "0%", label: "Platform fee" },
];

const steps = [
  {
    icon: Wallet,
    title: "Connect your wallet",
    desc: "Link MetaMask in one click. No sign-up, no email, no password to remember.",
  },
  {
    icon: Rocket,
    title: "Create or browse",
    desc: "Launch a campaign with a goal and deadline, or explore ones already live.",
  },
  {
    icon: HandCoins,
    title: "Donate in ETH",
    desc: "Send funds straight to the contract. Every contribution is recorded on-chain.",
  },
  {
    icon: ShieldCheck,
    title: "Funds release automatically",
    desc: "Goal met, the creator withdraws. Goal missed, backers are refunded. No one decides but the code.",
  },
];

export default function TrustAndProcess() {
  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 bg-transparent px-4 py-7 text-center"
            >
              <span className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 md:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              How it works
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              From wallet to withdrawal,
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {" "}
                four steps.
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              No middleman approves a thing. The contract is the process.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* connecting line for desktop */}
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="group relative flex flex-col items-start">
                  <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.85)]">
                    <Icon className="h-7 w-7 text-violet-300" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-base font-bold text-white md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {step.desc}
                  </p>

                  {i < steps.length - 1 && (
                    <ArrowRight
                      className="absolute -right-3 top-7 hidden h-5 w-5 text-white/20 md:block"
                      strokeWidth={2}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}