import { Clock, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const campaigns = [
  {
    id: 1,
    title: "Mera Chai Ka Thela",
    creator: "0xVikas...4F2a",
    image:
      "https://images.unsplash.com/photo-1597318181409-1c1f9d1c2b1a?q=80&w=800&auto=format&fit=crop",
    raised: 0.32,
    goal: 0.5,
    daysLeft: 15,
    category: "Small Business",
  },
  {
    id: 2,
    title: "Rahul's Bookshop Revival",
    creator: "0xRahul...9C31",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
    raised: 0.78,
    goal: 1,
    daysLeft: 6,
    category: "Retail",
  },
  {
    id: 3,
    title: "Open-Source Dev Bootcamp",
    creator: "0xPriya...7B88",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    raised: 1.4,
    goal: 2,
    daysLeft: 22,
    category: "Education",
  },
  {
    id: 4,
    title: "Flood Relief — Assam",
    creator: "0xAman...2E60",
    image:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop",
    raised: 3.1,
    goal: 3,
    daysLeft: 0,
    category: "Relief",
  },
  {
    id: 5,
    title: "Indie Game: Pixel Yatra",
    creator: "0xSara...A914",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    raised: 0.15,
    goal: 1.5,
    daysLeft: 40,
    category: "Creative",
  },
  {
    id: 6,
    title: "Solar Panels for Village School",
    creator: "0xMeera...5D77",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    raised: 0.9,
    goal: 1.2,
    daysLeft: 9,
    category: "Social Good",
  },
];

function ProgressBar({ raised, goal }) {
  const pct = Math.min((raised / goal) * 100, 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}




export default function FeaturedCampaigns() {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
  navigate(`/campaign/${id}`);
};
  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Live right now
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              Featured campaigns
            </h2>
            <p className="mt-3 max-w-xl text-slate-400">
              Real goals, real deadlines, funded directly by people like you — no
              platform sitting in between.
            </p>
          </div>

          <button className="group flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            View all campaigns
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => {
            const pct = Math.min((c.raised / c.goal) * 100, 100);
            const funded = pct >= 100;

            return (
              <div
                key={c.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_0_40px_-12px_rgba(168,85,247,0.5)]"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {c.category}
                  </span>

                  {funded && (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white">
                      Goal met
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">by {c.creator}</p>

                  <div className="mt-4">
                    <ProgressBar raised={c.raised} goal={c.goal} />
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-white">
                        {c.raised} <span className="text-slate-400">/ {c.goal} ETH</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {c.daysLeft > 0 ? `${c.daysLeft}d left` : "Ended"}
                      </span>
                    </div>
                  </div>

                  <button  onClick={()=>handleNavigate(c.id)} className="mt-5 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    View campaign
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}