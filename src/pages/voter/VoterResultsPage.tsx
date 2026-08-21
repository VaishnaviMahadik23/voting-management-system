import { elections, candidates } from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Trophy } from "lucide-react";
import { useState } from "react";
import Badge from "../../components/ui/Badge";

const completedElections = elections.filter((e) => ["COMPLETED", "ONGOING"].includes(e.status));

export default function VoterResultsPage() {
  const [selectedId, setSelectedId] = useState(completedElections[0]?.id ?? "");
  const election = elections.find((e) => e.id === selectedId);
  const elCandidates = candidates.filter((c) => c.electionId === selectedId).sort((a, b) => b.votes - a.votes);
  const totalVotes = elCandidates.reduce((s, c) => s + c.votes, 0);
  const winner = elCandidates[0];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Results</h1>
        <p className="text-slate-500 text-sm mt-0.5">View election outcomes and vote counts</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Select Election</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {completedElections.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      </div>

      {election && (
        <>
          <div className="flex items-center gap-3">
            <h2 className="font-display font-semibold text-slate-800">{election.name}</h2>
            <Badge status={election.status} />
          </div>

          {winner && winner.votes > 0 && (
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 text-indigo-200 text-xs mb-2"><Trophy size={14} /> Leading Candidate</div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">{winner.symbol}</div>
                <div>
                  <div className="font-display text-lg font-bold">{winner.name}</div>
                  <div className="text-indigo-200 text-sm">{winner.position} · {winner.party}</div>
                  <div className="text-white font-medium text-sm mt-0.5">
                    {winner.votes} votes · {totalVotes > 0 ? Math.round((winner.votes / totalVotes) * 100) : 0}%
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-display font-semibold text-slate-800 mb-4">Vote Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={elCandidates.map((c) => ({ name: c.name.split(" ")[0], votes: c.votes }))} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                <Bar dataKey="votes" radius={[0, 6, 6, 0]}>
                  {elCandidates.map((_, i) => <Cell key={i} fill={i === 0 ? "#6366f1" : "#a5b4fc"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {elCandidates.map((c, i) => {
              const pct = totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100) : 0;
              return (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {i + 1}
                  </span>
                  <div className="text-xl">{c.symbol}</div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 text-sm">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.position}</div>
                    <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 text-sm">{c.votes}</div>
                    <div className="text-xs text-slate-400">{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
