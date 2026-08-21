import { Link } from "react-router-dom";
import { Shield, Vote, CheckCircle, Lock, BarChart3, ArrowRight } from "lucide-react";

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-xl">VoteSecure</span>
        </div>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl text-sm text-white border border-white/20 hover:bg-white/10 transition-colors font-medium"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-xl text-sm bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-8 py-16 gap-16 max-w-6xl mx-auto w-full">
        <div className="flex-1 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 border border-indigo-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Digital Voting Platform
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Elections Made <span className="text-indigo-400">Simple</span> &amp; Secure
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-4">
            A modern, transparent voting management system trusted by educational institutions.
          </p>
          <p className="text-indigo-300 font-display text-xl font-semibold mb-10">
            Secure. Transparent. Reliable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center px-7 py-3.5 rounded-xl text-white border border-white/20 hover:bg-white/10 font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6">
            {[
              { icon: CheckCircle, label: "One vote per election" },
              { icon: Lock, label: "Encrypted ballots" },
              { icon: BarChart3, label: "Real-time results" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon size={15} className="text-indigo-400" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="flex-1 max-w-md w-full">
          <div className="bg-[#1e293b] rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-slate-500 ml-2">Student Council Election 2025</span>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { name: "Aditya Sharma", party: "Student Progress Alliance", pct: 40 },
                { name: "Meera Krishnan", party: "United Students Front", pct: 32 },
                { name: "Vivek Reddy", party: "SPA – Vice President", pct: 27 },
              ].map((c) => (
                <div key={c.name} className="bg-[#0f172a] rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="text-white text-sm font-medium">{c.name}</div>
                      <div className="text-slate-500 text-xs">{c.party}</div>
                    </div>
                    <span className="text-indigo-400 font-bold font-display">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">612 votes cast</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Voting
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Total Voters", value: "2,400+" },
              { label: "Elections Run", value: "24" },
              { label: "Uptime", value: "99.9%" },
            ].map((s) => (
              <div key={s.label} className="bg-[#1e293b] border border-white/10 rounded-2xl p-4 text-center">
                <div className="font-display text-xl font-bold text-indigo-400">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-slate-600 text-sm">
        © 2025 VoteSecure. All rights reserved.
      </footer>
    </div>
  );
}
