import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { elections, candidates, votes } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/ui/Modal";
import { useToast } from "../../components/ui/Toast";

export default function VotePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const election = elections.find((e) => e.id === id);
  const elCandidates = candidates.filter((c) => c.electionId === id && c.status === "ACTIVE");
  const alreadyVoted = votes.some((v) => v.voterId === user?.id && v.electionId === id);

  if (!election) return <div className="p-6 text-slate-400">Election not found.</div>;

  if (alreadyVoted) {
    return (
      <div className="p-6 max-w-lg mx-auto mt-10 text-center">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="font-display text-xl font-bold text-slate-800 mb-2">Already Voted</h2>
          <p className="text-slate-500 text-sm">You have already cast your vote in this election.</p>
          <Link to="/voter" className="mt-5 block py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (election.status !== "ONGOING") {
    return (
      <div className="p-6 max-w-lg mx-auto mt-10 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <AlertTriangle size={32} className="text-amber-500 mx-auto mb-3" />
          <h2 className="font-display text-xl font-bold text-slate-800 mb-2">Voting Not Available</h2>
          <p className="text-slate-500 text-sm">This election is currently {election.status.toLowerCase()}.</p>
          <Link to="/voter/elections" className="mt-5 block py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium">
            Back to Elections
          </Link>
        </div>
      </div>
    );
  }

  const selectedCandidate = elCandidates.find((c) => c.id === selected);

  function handleSubmit() {
    const ref = `VT-2025-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    votes.push({
      id: `v${Date.now()}`,
      voterId: user!.id,
      electionId: id!,
      candidateId: selected!,
      timestamp: new Date().toISOString(),
      reference: ref,
    });
    setConfirmOpen(false);
    toast("Your vote has been submitted successfully!", "success");
    navigate(`/voter/vote-submitted?election=${encodeURIComponent(election?.name ?? "")}&ref=${ref}`);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to={`/voter/elections/${id}`} className="p-2 rounded-xl hover:bg-slate-100 text-slate-600">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold text-slate-800">{election.name}</h1>
          <p className="text-slate-500 text-sm">Select one candidate to cast your vote</p>
        </div>
      </div>

      <div className="space-y-3">
        {elCandidates.map((c) => (
          <label
            key={c.id}
            className={`flex items-center gap-4 p-5 bg-white rounded-2xl border-2 cursor-pointer transition-all ${
              selected === c.id
                ? "border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="candidate"
              value={c.id}
              checked={selected === c.id}
              onChange={() => setSelected(c.id)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              selected === c.id ? "border-indigo-600" : "border-slate-300"
            }`}>
              {selected === c.id && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl shrink-0">
              {c.symbol}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-800">{c.name}</div>
              <div className="text-indigo-600 text-sm">{c.position}</div>
              <div className="text-slate-500 text-xs">{c.party}</div>
              <p className="text-slate-500 text-xs mt-1 line-clamp-1">{c.biography}</p>
            </div>
          </label>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => setConfirmOpen(true)}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-2xl transition-colors text-sm"
      >
        Continue
      </button>

      {/* Confirmation Modal */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm Your Vote">
        {selectedCandidate && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-5 text-center">
              <div className="text-4xl mb-2">{selectedCandidate.symbol}</div>
              <div className="font-display text-xl font-bold text-slate-800">{selectedCandidate.name}</div>
              <div className="text-indigo-600 text-sm font-medium">{selectedCandidate.position}</div>
              <div className="text-slate-500 text-xs mt-0.5">{selectedCandidate.party}</div>
              <div className="text-slate-500 text-xs mt-2 border-t border-slate-200 pt-2">{election.name}</div>
            </div>

            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              Once your vote is submitted, it cannot be changed.
            </div>

            <div className="flex gap-3">
              <button onClick={() => setConfirmOpen(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50">
                Go Back
              </button>
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold">
                Confirm Vote
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
