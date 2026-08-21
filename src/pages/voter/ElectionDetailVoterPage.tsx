import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Vote, CheckCircle, FileText } from "lucide-react";
import { elections, candidates, votes } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/ui/Badge";

export default function ElectionDetailVoterPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const election = elections.find((e) => e.id === id);
  const elCandidates = candidates.filter((c) => c.electionId === id && c.status === "ACTIVE");
  const voted = votes.some((v) => v.voterId === user?.id && v.electionId === id);

  if (!election) {
    return <div className="p-6 text-slate-400">Election not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/voter/elections" className="p-2 rounded-xl hover:bg-slate-100 text-slate-600">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl font-bold text-slate-800">{election.name}</h1>
            <Badge status={election.status} size="md" />
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-600 text-sm leading-relaxed mb-5">{election.description}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "Start Date", value: new Date(election.startDate).toLocaleDateString() },
            { icon: Calendar, label: "End Date", value: new Date(election.endDate).toLocaleDateString() },
            { icon: Users, label: "Candidates", value: election.candidatesCount },
            { icon: Vote, label: "Votes Cast", value: election.votesCast },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><s.icon size={12} />{s.label}</div>
              <div className="font-semibold text-slate-800 text-sm">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      {election.rules && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-700 font-medium text-sm mb-2">
            <FileText size={15} /> Election Rules
          </div>
          <p className="text-amber-800 text-sm leading-relaxed">{election.rules}</p>
        </div>
      )}

      {/* Candidates */}
      <div>
        <h2 className="font-display font-semibold text-slate-800 mb-4">Candidates ({elCandidates.length})</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {elCandidates.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-3xl shrink-0">
                  {c.symbol}
                </div>
                <div className="flex-1">
                  <div className="font-display font-semibold text-slate-800">{c.name}</div>
                  <div className="text-indigo-600 text-sm font-medium">{c.position}</div>
                  <div className="text-slate-500 text-xs">{c.party}</div>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-2">{c.biography}</p>
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
                <strong className="text-slate-700">Manifesto:</strong> {c.manifesto}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      {election.status === "ONGOING" && (
        <div className="sticky bottom-6">
          {voted ? (
            <div className="bg-emerald-500 text-white rounded-2xl px-6 py-4 flex items-center gap-3 shadow-lg shadow-emerald-500/30">
              <CheckCircle size={22} />
              <div>
                <div className="font-semibold">You have already voted in this election.</div>
                <div className="text-sm text-emerald-100">Your vote has been securely recorded.</div>
              </div>
            </div>
          ) : (
            <Link
              to={`/voter/elections/${election.id}/vote`}
              className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl px-6 py-4 shadow-lg shadow-indigo-500/30 transition-all"
            >
              Proceed to Vote
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
