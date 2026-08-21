import { FileText, Download, Users, Vote, TrendingUp } from "lucide-react";
import { elections, candidates } from "../../data/mockData";
import { useState } from "react";
import { useToast } from "../../components/ui/Toast";

export default function ReportsPage() {
  const [selectedId, setSelectedId] = useState(elections[0]?.id ?? "");
  const { toast } = useToast();
  const election = elections.find((e) => e.id === selectedId);
  const elCandidates = candidates.filter((c) => c.electionId === selectedId).sort((a, b) => b.votes - a.votes);
  const totalVotes = elCandidates.reduce((s, c) => s + c.votes, 0);
  const turnout = election?.totalVoters ? Math.round((election.votesCast / election.totalVoters) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Reports</h1>
        <p className="text-slate-500 text-sm mt-0.5">Generate and export election reports</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Election</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {elections.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast("Report generated successfully!", "success")}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <FileText size={15} /> Generate Report
          </button>
          <button
            onClick={() => toast("PDF download started.", "success")}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Download size={15} /> PDF
          </button>
          <button
            onClick={() => toast("CSV export started.", "success")}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors"
          >
            <Download size={15} /> CSV
          </button>
        </div>
      </div>

      {election && (
        <div className="space-y-6">
          {/* Voter Turnout Report */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Users size={18} className="text-indigo-500" />
              Voter Turnout Report
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Eligible Voters", value: election.totalVoters },
                { label: "Registered Voters", value: election.totalVoters },
                { label: "Votes Cast", value: election.votesCast },
                { label: "Turnout Percentage", value: `${turnout}%` },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="font-display text-2xl font-bold text-slate-800">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-slate-50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Voter Participation</span>
                <span className="font-semibold text-slate-800">{turnout}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${turnout}%` }} />
              </div>
            </div>
          </div>

          {/* Election Results Report */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Vote size={18} className="text-indigo-500" />
              Election Results Report
            </h3>
            {elCandidates.length === 0 ? (
              <p className="text-slate-400 text-sm">No candidates for this election.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Rank</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Candidate</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Votes</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {elCandidates.map((c, i) => {
                    const pct = totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(1) : "0.0";
                    return (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-3 font-semibold text-slate-500">#{i + 1}</td>
                        <td className="py-3 font-medium text-slate-800">{c.name}</td>
                        <td className="py-3 text-slate-700">{c.votes}</td>
                        <td className="py-3 text-slate-700">{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Election Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-500" />
              Election Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "Election Name", value: election.name },
                { label: "Election Type", value: election.type },
                { label: "Start Date", value: new Date(election.startDate).toLocaleDateString() },
                { label: "End Date", value: new Date(election.endDate).toLocaleDateString() },
                { label: "Total Candidates", value: election.candidatesCount },
                { label: "Total Votes", value: election.votesCast },
                { label: "Voter Turnout", value: `${turnout}%` },
                { label: "Winner", value: elCandidates[0]?.name ?? "TBD" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">{s.label}</span>
                  <span className="font-medium text-slate-800">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
