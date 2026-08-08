import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ================= Navbar ================= */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/researchhub_logo.png"
              alt="ResearchHub AI Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />

            <div>
              <h1 className="text-xl font-bold">
                ResearchHub AI
              </h1>

              <p className="text-xs text-slate-500">
                Your Complete Research Workspace
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden items-center gap-8 font-medium text-slate-600 md:flex">

            <a
              href="#features"
              className="transition hover:text-violet-600"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-violet-600"
            >
              How it Works
            </a>

            <a
              href="#pricing"
              className="transition hover:text-violet-600"
            >
              Pricing
            </a>

            <a
              href="#about"
              className="transition hover:text-violet-600"
            >
              About
            </a>

            <Link
              href="/login"
              className="transition hover:text-violet-600"
            >
              Log In
            </Link>

          </div>

          {/* Get Started */}
          <Link
            href="/register"
            className="rounded-xl bg-violet-600 px-5 py-2 font-medium text-white transition hover:bg-violet-700"
          >
            Get Started
          </Link>

        </div>
      </nav>

      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-300 opacity-30 blur-3xl"></div>

        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-cyan-300 opacity-20 blur-3xl"></div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 py-24 lg:grid-cols-2">

          {/* Hero Text */}
          <div>

            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
              AI Powered Research Platform
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
              Build Better
              <span className="text-violet-600">
                {" "}Research
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Organize papers, track experiments, collaborate with your
              team, manage datasets, and chat with your research using
              AI—all in one platform.
            </p>

            {/* Hero Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/register"
                className="rounded-xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
              >
                Start Free
              </Link>

              <button
                type="button"
                className="rounded-xl border border-slate-300 px-8 py-4 text-lg font-semibold transition hover:bg-slate-100"
              >
                Watch Demo
              </button>

            </div>

            {/* Statistics */}
            <div className="mt-12 flex gap-10">

              <div>
                <h3 className="text-3xl font-bold">
                  10K+
                </h3>

                <p className="text-slate-500">
                  Research Papers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  250+
                </h3>

                <p className="text-slate-500">
                  Research Teams
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  98%
                </h3>

                <p className="text-slate-500">
                  User Satisfaction
                </p>
              </div>

            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Dashboard
              </h2>

              <div className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Online
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              {[
                ["Projects", "12"],
                ["Papers", "321"],
                ["Experiments", "48"],
                ["Tasks", "19"],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="rounded-xl bg-slate-100 p-5"
                >
                  <p className="text-sm text-slate-500">
                    {title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {value}
                  </h3>
                </div>
              ))}

            </div>

            {/* AI Assistant */}
            <div className="mt-6 rounded-xl bg-slate-100 p-5">

              <div className="mb-3 flex items-center justify-between">

                <h4 className="font-semibold">
                  AI Assistant
                </h4>

                <span className="text-sm text-violet-600">
                  Active
                </span>

              </div>

              <div className="rounded-lg bg-white p-4 text-sm shadow">
                Explain the Transformer architecture in simple terms.
              </div>

              <div className="mt-4 rounded-lg bg-violet-600 p-4 text-sm text-white">
                The Transformer processes all tokens simultaneously
                using self-attention...
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= Features ================= */}
      <section
        id="features"
        className="bg-slate-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Everything You Need For Research
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              A modern workspace designed for researchers and students.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "Paper Library",
                desc: "Organize and search research papers easily.",
              },
              {
                title: "AI Research Assistant",
                desc: "Ask questions directly from uploaded papers.",
              },
              {
                title: "Experiment Tracking",
                desc: "Monitor every experiment and compare results.",
              },
              {
                title: "Dataset Management",
                desc: "Store datasets with version control.",
              },
              {
                title: "Team Collaboration",
                desc: "Invite researchers and work together.",
              },
              {
                title: "Analytics",
                desc: "Visualize your research progress.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-2xl">
                  🚀
                </div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-violet-600 py-24 text-center text-white">

        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-5xl font-bold">
            Ready to Accelerate Your Research?
          </h2>

          <p className="mt-6 text-lg text-violet-100">
            Join researchers worldwide using AI to organize knowledge,
            collaborate efficiently, and publish faster.
          </p>

          <Link
            href="/register"
            className="mt-10 inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-violet-700 transition hover:scale-105"
          >
            Get Started Free
          </Link>

        </div>

      </section>

      {/* ================= Footer ================= */}
      <footer className="border-t bg-white py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

          <div>

            <h3 className="text-xl font-bold">
              ResearchHub AI
            </h3>

            <p className="text-slate-500">
              AI-powered research management platform.
            </p>

          </div>

          <div className="flex gap-6 text-slate-600">

            <a
              href="#"
              className="hover:text-violet-600"
            >
              Privacy
            </a>

            <a
              href="#"
              className="hover:text-violet-600"
            >
              Terms
            </a>

            <a
              href="#"
              className="hover:text-violet-600"
            >
              Contact
            </a>

            <a
              href="#"
              className="hover:text-violet-600"
            >
              GitHub
            </a>

          </div>

        </div>

      </footer>

    </main>
  );
}