import { useState } from "react";
import { Search, Activity } from "lucide-react";
import { auditLogs } from "../../data/mockData";

const actionColors: Record<string, string> = {
  ELECTION_CREATED: "bg-indigo-100 text-indigo-700",
  VOTER_REGISTERED: "bg-blue-100 text-blue-700",
  VOTER_VERIFIED: "bg-emerald-100 text-emerald-700",
  CANDIDATE_ADDED: "bg-purple-100 text-purple-700",
  ELECTION_STARTED: "bg-emerald-100 text-emerald-700",
  VOTE_SUBMITTED: "bg-teal-100 text-teal-700",
  RESULTS_PUBLISHED: "bg-amber-100 text-amber-700",
  ADMIN_LOGIN: "bg-slate-100 text-slate-700",
  ELECTION_UPDATED: "bg-blue-100 text-blue-700",
  VOTER_SUSPENDED: "bg-red-100 text-red-700",
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const logs = auditLogs.filter(
    (l) =>
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Audit Logs</h1>
        <p className="text-slate-500 text-sm mt-0.5">Track all system actions and events</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">IP Address</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-slate-400">No logs found.</td></tr>
              ) : (
                logs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${actionColors[l.action] ?? "bg-slate-100 text-slate-600"}`}>
                        {l.action.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{l.user}</td>
                    <td className="px-5 py-4 text-slate-600 max-w-xs truncate">{l.description}</td>
                    <td className="px-5 py-4 text-slate-500 font-mono text-xs">{l.ipAddress}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {logs.length} of {auditLogs.length} records
        </div>
      </div>
    </div>
  );
}
