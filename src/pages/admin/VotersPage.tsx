import { useState } from "react";
import { Search, CheckCircle, XCircle, Eye, Trash2, ShieldOff } from "lucide-react";
import { users as initial, type User } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useToast } from "../../components/ui/Toast";

export default function VotersPage() {
  const [voters, setVoters] = useState(initial.filter((u) => u.role === "VOTER"));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: string } | null>(null);
  const { toast } = useToast();

  const statuses = ["ALL", "VERIFIED", "PENDING", "REJECTED", "SUSPENDED"];

  const filtered = voters.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      (v.voterId ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function updateStatus(id: string, status: User["status"]) {
    setVoters((p) => p.map((v) => (v.id === id ? { ...v, status } : v)));
    const labels: Record<string, string> = { VERIFIED: "Voter verified.", REJECTED: "Voter rejected.", SUSPENDED: "Voter suspended." };
    toast(labels[status] ?? "Status updated.", "success");
    setConfirmAction(null);
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Voters</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage registered voters and verifications</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Voters", value: voters.length, color: "bg-indigo-50 text-indigo-700" },
          { label: "Verified", value: voters.filter((v) => v.status === "VERIFIED").length, color: "bg-emerald-50 text-emerald-700" },
          { label: "Pending", value: voters.filter((v) => v.status === "PENDING").length, color: "bg-amber-50 text-amber-700" },
          { label: "Suspended", value: voters.filter((v) => v.status === "SUSPENDED").length, color: "bg-red-50 text-red-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 ${s.color} border border-current/20`}>
            <div className="font-display text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or voter ID..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Voter</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Voter ID</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Mobile</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Registered</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-slate-400">No voters found.</td></tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-semibold">
                          {v.name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{v.name}</div>
                          <div className="text-xs text-slate-400">{v.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-mono text-xs">{v.voterId ?? "—"}</td>
                    <td className="px-5 py-4 text-slate-600">{v.mobile ?? "—"}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{new Date(v.registeredAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4"><Badge status={v.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        {v.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => setConfirmAction({ id: v.id, action: "VERIFIED" })}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="Verify"
                            >
                              <CheckCircle size={15} />
                            </button>
                            <button
                              onClick={() => setConfirmAction({ id: v.id, action: "REJECTED" })}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Reject"
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                        {v.status === "VERIFIED" && (
                          <button
                            onClick={() => setConfirmAction({ id: v.id, action: "SUSPENDED" })}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Suspend"
                          >
                            <ShieldOff size={15} />
                          </button>
                        )}
                        {v.status === "SUSPENDED" && (
                          <button
                            onClick={() => updateStatus(v.id, "VERIFIED")}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Reinstate"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {voters.length} voters
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => confirmAction && updateStatus(confirmAction.id, confirmAction.action as User["status"])}
        title={confirmAction?.action === "VERIFIED" ? "Verify Voter" : confirmAction?.action === "REJECTED" ? "Reject Voter" : "Suspend Voter"}
        message={`Are you sure you want to ${(confirmAction?.action ?? "").toLowerCase()} this voter?`}
        confirmLabel={confirmAction?.action === "VERIFIED" ? "Verify" : confirmAction?.action === "REJECTED" ? "Reject" : "Suspend"}
        danger={confirmAction?.action !== "VERIFIED"}
      />
    </div>
  );
}
