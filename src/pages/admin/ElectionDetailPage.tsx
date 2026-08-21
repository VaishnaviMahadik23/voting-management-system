import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Vote, TrendingUp } from "lucide-react";
import { elections, candidates } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const tabs = ["Overview", "Candidates", "Voters", "Results", "Activity"];

export default function ElectionDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const election = elections.find((e) => e.id === id);

  if (!election) {
    return (
      <div className="p-6 text-center py-20 text-slate-400">
        Election not found.{" "}
        <Link to="/admin/elections" className="text-indigo-600">Go back</Link>
      </div>
    );
  }

  const elCandidates = candidates.filter((c) => c.electionId === id);
  const turnout = election.totalVoters
    ? Math.round((election.votesCast / election.totalVoters) * 100)
    : 0;

  const chartData = elCandidates.map((c) => ({ name: c.name.split(" ")[0], votes: c.votes }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/elections" className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl font-bold text-slate-800">{election.name}</h1>
            <Badge status={election.status} size="md" />
          </div>
          <p className="text-slate-500 text-sm">{election.type}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Voters", value: election.totalVoters, icon: Users },
          { label: "Candidates", value: election.candidatesCount, icon: Users },
          { label: "Votes Cast", value: election.votesCast, icon: Vote },
          { label: "Voter Turnout", value: `${turnout}%`, icon: TrendingUp },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className="font-display text-2xl font-bold text-slate-800">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "Overview" && (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Description</div>
                <p className="text-slate-700 text-sm leading-relaxed">{election.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5"><Calendar size={12} /> Start Date</div>
                  <div className="text-sm font-medium">{new Date(election.startDate).toLocaleString()}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5"><Calendar size={12} /> End Date</div>
                  <div className="text-sm font-medium">{new Date(election.endDate).toLocaleString()}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Election Rules</div>
                <p className="text-slate-700 text-sm leading-relaxed">{election.rules}</p>
              </div>
            </div>
          )}

          {activeTab === "Candidates" && (
            <div className="space-y-3">
              {elCandidates.length === 0 ? (
                <p className="text-slate-400 text-sm">No candidates added yet.</p>
              ) : (
                elCandidates.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
                      {c.symbol}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.position} · {c.party}</div>
                    </div>
                    <Badge status={c.status} />
                    <div className="text-sm font-semibold text-indigo-600">{c.votes} votes</div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "Results" && (
            <div>
              {chartData.length === 0 ? (
                <p className="text-slate-400 text-sm">No votes recorded yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                    <Bar dataKey="votes" radius={[0, 6, 6, 0]}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "#6366f1" : "#a5b4fc"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          )}

          {(activeTab === "Voters" || activeTab === "Activity") && (
            <p className="text-slate-400 text-sm">Data will be available here once voters participate.</p>
          )}
        </div>
      </div>
    </div>
  );
}
