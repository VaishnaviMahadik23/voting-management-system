import { useState } from "react";
import { Trophy, TrendingUp } from "lucide-react";
import { elections, candidates } from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import Badge from "../../components/ui/Badge";

const completedOrOngoing = elections.filter((e) => ["COMPLETED", "ONGOING"].includes(e.status));

export default function ResultsPage() {
  const [selectedId, setSelectedId] = useState(completedOrOngoing[0]?.id ?? "");
  const election = elections.find((e) => e.id === selectedId);
  const elCandidates = candidates.filter((c) => c.electionId === selectedId).sort((a, b) => b.votes - a.votes);
  const totalVotes = elCandidates.reduce((s, c) => s + c.votes, 0);
  const winner = elCandidates[0];

  const barData = elCandidates.map((c) => ({ name: c.name.split(" ")[0], votes: c.votes }));
  const pieData = elCandidates.map((c, i) => ({
    name: c.name.split(" ")[0],
    value: c.votes,
    color: ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"][i % 6],
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Results</h1>
        <p className="text-slate-500 text-sm mt-0.5">View and analyse election outcomes</p>
      </div>

      {/* Election selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Select Election</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {completedOrOngoing.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      </div>

      {election && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Votes", value: election.votesCast },
              { label: "Eligible Voters", value: election.totalVoters },
              { label: "Voter Turnout", value: `${Math.round((election.votesCast / election.totalVoters) * 100)}%` },
              { label: "Candidates", value: elCandidates.length },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200 text-center">
                <div className="font-display text-2xl font-bold text-slate-800">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Winner */}
          {winner && winner.votes > 0 && (
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3 text-indigo-200 text-sm font-medium">
                <Trophy size={16} />
                Leading Candidate
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  {candidates.find((c) => c.id === winner.id)?.symbol ?? "🏆"}
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">{winner.name}</div>
                  <div className="text-indigo-200 text-sm">{winner.position} · {winner.party}</div>
                  <div className="text-white font-semibold mt-1">
                    {winner.votes} votes ({totalVotes > 0 ? Math.round((winner.votes / totalVotes) * 100) : 0}%)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-display font-semibold text-slate-800 mb-4">Votes by Candidate</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                  <Bar dataKey="votes" radius={[0, 6, 6, 0]}>
                    {barData.map((_, i) => <Cell key={i} fill={i === 0 ? "#6366f1" : "#a5b4fc"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-display font-semibold text-slate-800 mb-4">Vote Distribution</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-2">
                {elCandidates.map((c, i) => (
                  <div key={c.id} className="flex items-center gap-2 text-sm">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pieData[i]?.color ?? "#94a3b8" }} />
                    <span className="flex-1 text-slate-700 truncate">{c.name}</span>
                    <span className="font-medium text-slate-800">{c.votes}</span>
                    <span className="text-slate-400 text-xs w-10 text-right">
                      {totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ranking Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-display font-semibold text-slate-800">Candidate Rankings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Rank</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Candidate</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Position</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Votes</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Percentage</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-40">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {elCandidates.map((c, i) => {
                    const pct = totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100) : 0;
                    return (
                      <tr key={c.id} className={`hover:bg-slate-50 transition-colors ${i === 0 ? "bg-indigo-50/40" : ""}`}>
                        <td className="px-5 py-4">
                          <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium text-slate-800">{c.name}</div>
                          <div className="text-xs text-slate-400">{c.party}</div>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{c.position}</td>
                        <td className="px-5 py-4 font-semibold text-slate-800">{c.votes}</td>
                        <td className="px-5 py-4 text-slate-600">{pct}%</td>
                        <td className="px-5 py-4">
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-32">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
