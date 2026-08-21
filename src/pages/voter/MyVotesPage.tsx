import { CheckCircle, Vote } from "lucide-react";
import { votes, elections, candidates } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

export default function MyVotesPage() {
  const { user } = useAuth();
  const myVotes = votes.filter((v) => v.voterId === user?.id);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">My Votes</h1>
        <p className="text-slate-500 text-sm mt-0.5">Your complete voting history</p>
      </div>

      {myVotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center text-slate-400">
          <Vote size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No votes cast yet.</p>
          <p className="text-sm mt-1">Participate in an election to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myVotes.map((v) => {
            const election = elections.find((e) => e.id === v.electionId);
            return (
              <div key={v.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-slate-800">{election?.name ?? "Unknown Election"}</div>
                    <div className="text-slate-400 text-xs">{election?.type}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs text-slate-400 mb-0.5">Date &amp; Time</div>
                    <div className="text-sm font-medium text-slate-700">{new Date(v.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs text-slate-400 mb-0.5">Reference No.</div>
                    <div className="text-sm font-mono font-semibold text-indigo-600">{v.reference}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
