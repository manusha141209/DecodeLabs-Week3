import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interest Matcher" },
      { name: "description", content: "Find interest suggestions based on your activity preferences." },
      { property: "og:title", content: "Interest Matcher" },
      { property: "og:description", content: "A simple interactive interest matcher app." },
    ],
  }),
  component: Index,
});

type MatchResult = {
  title: string;
  description: string;
  category: string;
};

const defaultResults: MatchResult[] = [
  {
    title: "Creative Explorer",
    category: "creative",
    description: "Try painting, writing, design, or DIY projects that let you build something unique.",
  },
  {
    title: "Active Adventurer",
    category: "active",
    description: "Choose outdoor activities, sports, and movement-based hobbies to stay energized.",
  },
  {
    title: "Social Connector",
    category: "social",
    description: "Join groups, host meetups, or collaborate with others to build meaningful connections.",
  },
  {
    title: "Curious Learner",
    category: "learning",
    description: "Explore books, courses, and self-improvement interests for steady growth.",
  },
];

function Index() {
  const [favoriteThings, setFavoriteThings] = useState("");
  const [activityType, setActivityType] = useState("creative");
  const [energyLevel, setEnergyLevel] = useState("balanced");
  const [goal, setGoal] = useState("discover");
  const [submitted, setSubmitted] = useState(false);

  const matchedResults = useMemo(() => {
    const normalized = `${favoriteThings} ${activityType} ${energyLevel} ${goal}`.toLowerCase();

    const scored = defaultResults
      .map((result) => {
        const score = [
          normalized.includes(result.category),
          normalized.includes("art"),
          normalized.includes("create"),
          normalized.includes("design"),
          normalized.includes("paint"),
          normalized.includes("move"),
          normalized.includes("active"),
          normalized.includes("outdoor"),
          normalized.includes("learn"),
          normalized.includes("study"),
          normalized.includes("play"),
          normalized.includes("meet"),
          normalized.includes("social"),
          normalized.includes("relax"),
        ].filter(Boolean).length;

        return { result, score };
      })
      .sort((a, b) => b.score - a.score);

    if (scored.every((item) => item.score === 0)) {
      return [
        {
          title: "Balanced Explorer",
          category: "explore",
          description: "You enjoy a little bit of everything; try a mix of creative, active, and social activities.",
        },
      ];
    }

    return scored.filter((item) => item.score > 0).map((item) => item.result);
  }, [favoriteThings, activityType, energyLevel, goal]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFavoriteThings("");
    setActivityType("creative");
    setEnergyLevel("balanced");
    setGoal("discover");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="rounded-3xl border border-input bg-card p-8 shadow-sm sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
            <section>
              <span className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500 px-4 py-2 text-sm font-black uppercase tracking-[0.3em] text-white shadow-[0_10px_30px_-15px_rgba(139,92,246,0.8)] sm:text-base">
                INTEREST MATCHER
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Discover your next favorite interest.</h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Answer a few quick questions and receive interest suggestions tailored to your style.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="rounded-3xl border border-input bg-background p-6 shadow-sm">
                  <label className="block text-sm font-semibold text-foreground">What do you enjoy most?</label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Share one or two hobbies, activities, or interests that feel fun to you.
                  </p>
                  <input
                    value={favoriteThings}
                    onChange={(event) => setFavoriteThings(event.target.value)}
                    placeholder="e.g. painting, hiking, coding"
                    className="mt-4 w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-input bg-background p-6 shadow-sm">
                    <label className="block text-sm font-semibold text-foreground">Preferred activity type</label>
                    <select
                      value={activityType}
                      onChange={(event) => setActivityType(event.target.value)}
                      className="mt-4 w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                      <option value="creative">Creative</option>
                      <option value="active">Active</option>
                      <option value="social">Social</option>
                      <option value="learning">Learning</option>
                    </select>
                  </div>
                  <div className="rounded-3xl border border-input bg-background p-6 shadow-sm">
                    <label className="block text-sm font-semibold text-foreground">Energy level</label>
                    <select
                      value={energyLevel}
                      onChange={(event) => setEnergyLevel(event.target.value)}
                      className="mt-4 w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                      <option value="high">High energy</option>
                      <option value="balanced">Balanced</option>
                      <option value="low">Low energy</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-3xl border border-input bg-background p-6 shadow-sm">
                  <label className="block text-sm font-semibold text-foreground">What do you want from a new interest?</label>
                  <select
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                    className="mt-4 w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="discover">Discover something new</option>
                    <option value="grow">Learn and grow</option>
                    <option value="connect">Meet people</option>
                    <option value="relax">Relax and unwind</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Show matches
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-2xl border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-foreground"
                  >
                    Reset form
                  </button>
                </div>
              </form>
            </section>

            <aside className="space-y-6 rounded-3xl border border-input bg-surface p-6 text-sm text-muted-foreground shadow-sm">
              <div className="rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-50 to-fuchsia-500/10 p-5">
                <h2 className="text-2xl font-bold tracking-wide text-sky-700">How it works</h2>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  The matcher reviews your preferences and suggests interest categories that fit your style.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">What you can try</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>Creative hobbies like writing, art, or music.</li>
                    <li>Active interests like sports, hiking, or movement-based fun.</li>
                    <li>Social activities like clubs, events, or collaborative projects.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Next steps</p>
                  <p className="mt-2 leading-7">
                    Extend this page with real routes, saved profiles, or a backend recommendation API.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {submitted && (
            <section className="mt-10 rounded-3xl border border-input bg-background p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Your matched interest profile</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The matcher recommends categories based on what you entered.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {matchedResults.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-input bg-surface p-6">
                    <p className="text-sm font-medium text-primary-foreground">{item.category.toUpperCase()}</p>
                    <h3 className="mt-3 text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
