import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, MoreVertical, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { elections as initialElections, type Election } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useToast } from "../../components/ui/Toast";

export default function ElectionsPage() {
  const [elections, setElections] = useState(initialElections);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const { toast } = useToast();

  const statuses = ["ALL", "DRAFT", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"];

  const filtered = elections.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function handleDelete() {
    setElections((prev) => prev.filter((e) => e.id !== deleteTarget));
    toast("Election deleted successfully.", "success");
    setDeleteTarget(null);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Elections</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and monitor all elections</p>
        </div>
        <Link
          to="/admin/elections/create"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
        >
          <Plus size={16} /> New Election
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search elections..."
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
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Election</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Start Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">End Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Candidates</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No elections found.
                  </td>
                </tr>
              ) : (
                filtered.map((el) => (
                  <tr key={el.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">{el.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{el.votesCast} votes cast</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{el.type}</td>
                    <td className="px-5 py-4 text-slate-600">{new Date(el.startDate).toLocaleDateString()}</td>
                    <td className="px-5 py-4 text-slate-600">{new Date(el.endDate).toLocaleDateString()}</td>
                    <td className="px-5 py-4 text-slate-600">{el.candidatesCount}</td>
                    <td className="px-5 py-4"><Badge status={el.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/elections/${el.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <Eye size={15} />
                        </Link>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(el.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {elections.length} elections
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Election"
        message="This action will permanently delete the election and all associated data. This cannot be undone."
        confirmLabel="Delete Election"
        danger
      />
    </div>
  );
}
