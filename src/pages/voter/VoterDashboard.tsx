import { Link } from "react-router-dom";
import { Vote, Calendar, Users, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { elections, votes } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/ui/Badge";

export default function VoterDashboard() {
  const { user } = useAuth();
  const activeElections = elections.filter((e) => ["UPCOMING", "ONGOING"].includes(e.status));
  const myVotes = votes.filter((v) => v.voterId === user?.id);
  const hasVoted = (elId: string) => myVotes.some((v) => v.electionId === elId);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 text-indigo-300 text-sm mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Voter Portal
        </div>
        <h1 className="font-display text-2xl font-bold mb-1">
          Welcome back, {user?.name.split(" ")[0]}!
        </h1>
        <p className="text-slate-400 text-sm">
          Your Voter ID: <span className="text-white font-mono font-medium">{user?.voterId ?? "Pending"}</span>
        </p>
        <div className="flex flex-wrap gap-4 mt-5">
          {[
            { icon: Vote, label: "Active Elections", value: activeElections.filter((e) => e.status === "ONGOING").length },
            { icon: CheckCircle, label: "My Votes Cast", value: myVotes.length },
            { icon: Clock, label: "Upcoming", value: activeElections.filter((e) => e.status === "UPCOMING").length },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5">
              <s.icon size={16} className="text-indigo-300" />
              <div>
                <div className="text-xs text-slate-400">{s.label}</div>
                <div className="font-display font-bold text-lg leading-tight">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Elections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-slate-800">Active Elections</h2>
          <Link to="/voter/elections" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {activeElections.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center text-slate-400">
            <Vote size={32} className="mx-auto mb-3 opacity-30" />
            <p>No active elections at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeElections.map((el) => {
              const voted = hasVoted(el.id);
              return (
                <div key={el.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 mr-3">
                      <h3 className="font-display font-semibold text-slate-800 text-base leading-snug">{el.name}</h3>
                      <p className="text-slate-500 text-sm mt-1 line-clamp-2">{el.description}</p>
                    </div>
                    <Badge status={el.status} />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { icon: Calendar, label: "Ends", value: new Date(el.endDate).toLocaleDateString() },
                      { icon: Users, label: "Candidates", value: el.candidatesCount },
                      { icon: Vote, label: "Votes", value: el.votesCast },
                    ].map((s) => (
                      <div key={s.label} className="bg-slate-50 rounded-xl p-2.5 text-center">
                        <s.icon size={13} className="text-slate-400 mx-auto mb-0.5" />
                        <div className="text-xs text-slate-400">{s.label}</div>
                        <div className="text-sm font-semibold text-slate-700">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/voter/elections/${el.id}`}
                      className="flex-1 py-2 border border-slate-200 rounded-xl text-sm text-center text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                    >
                      View Election
                    </Link>
                    {el.status === "ONGOING" && !voted && (
                      <Link
                        to={`/voter/elections/${el.id}/vote`}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm text-center text-white font-medium transition-colors"
                      >
                        Vote Now
                      </Link>
                    )}
                    {voted && (
                      <div className="flex-1 py-2 bg-emerald-50 rounded-xl text-sm text-center text-emerald-600 font-medium flex items-center justify-center gap-1.5">
                        <CheckCircle size={14} /> Voted
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
