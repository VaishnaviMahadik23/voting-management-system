import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { candidates as initial, elections, type Candidate } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useToast } from "../../components/ui/Toast";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(initial);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", electionId: "", position: "", party: "", biography: "", manifesto: "", status: "ACTIVE",
  });
  const { toast } = useToast();

  const filtered = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.position.toLowerCase().includes(search.toLowerCase())
  );

  function getElectionName(id: string) {
    return elections.find((e) => e.id === id)?.name ?? "—";
  }

  function handleAdd() {
    if (!form.name || !form.electionId || !form.position) {
      toast("Please fill in required fields.", "error");
      return;
    }
    const newC: Candidate = {
      id: `c${Date.now()}`,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name}`,
      symbol: "🎯",
      votes: 0,
      ...form,
      status: form.status as Candidate["status"],
    };
    setCandidates((p) => [...p, newC]);
    setAddOpen(false);
    setForm({ name: "", electionId: "", position: "", party: "", biography: "", manifesto: "", status: "ACTIVE" });
    toast("Candidate added successfully!", "success");
  }

  function handleDelete() {
    setCandidates((p) => p.filter((c) => c.id !== deleteTarget));
    toast("Candidate removed.", "success");
    setDeleteTarget(null);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Candidates</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage candidates across all elections</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors"
        >
          <Plus size={16} /> Add Candidate
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Candidate</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Position</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Party/Group</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Election</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Votes</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-slate-400">No candidates found.</td></tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-base">
                          {c.symbol}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{c.name}</div>
                          <div className="text-xs text-slate-400">{c.biography.slice(0, 40)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{c.position}</td>
                    <td className="px-5 py-4 text-slate-600">{c.party}</td>
                    <td className="px-5 py-4">
                      <div className="text-xs text-slate-500 max-w-32 truncate">{getElectionName(c.electionId)}</div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-indigo-600">{c.votes}</td>
                    <td className="px-5 py-4"><Badge status={c.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(c.id)}
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
      </div>

      {/* Add Candidate Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Candidate" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Candidate Name *</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Election *</label>
              <select value={form.electionId} onChange={(e) => setForm((p) => ({ ...p, electionId: e.target.value }))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select election</option>
                {elections.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Position *</label>
              <input value={form.position} onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Party / Group</label>
              <input value={form.party} onChange={(e) => setForm((p) => ({ ...p, party: e.target.value }))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Biography</label>
            <textarea value={form.biography} onChange={(e) => setForm((p) => ({ ...p, biography: e.target.value }))} rows={2} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Manifesto</label>
            <textarea value={form.manifesto} onChange={(e) => setForm((p) => ({ ...p, manifesto: e.target.value }))} rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setAddOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium">Add Candidate</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Remove Candidate" message="Are you sure you want to remove this candidate? This action cannot be undone." confirmLabel="Remove" danger />
    </div>
  );
}
