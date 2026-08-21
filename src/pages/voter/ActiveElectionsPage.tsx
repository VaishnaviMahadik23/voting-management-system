import { Link } from "react-router-dom";
import { Vote, Calendar, Users, CheckCircle } from "lucide-react";
import { elections, votes } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/ui/Badge";

export default function ActiveElectionsPage() {
  const { user } = useAuth();
  const activeElections = elections.filter((e) => ["UPCOMING", "ONGOING"].includes(e.status));
  const myVotes = votes.filter((v) => v.voterId === user?.id);
  const hasVoted = (elId: string) => myVotes.some((v) => v.electionId === elId);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Active Elections</h1>
        <p className="text-slate-500 text-sm mt-0.5">Elections you can participate in</p>
      </div>

      {activeElections.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center text-slate-400">
          <Vote size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No active elections</p>
          <p className="text-sm mt-1">Check back later for upcoming elections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeElections.map((el) => {
            const voted = hasVoted(el.id);
            return (
              <div key={el.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 mr-3">
                    <h3 className="font-display font-semibold text-slate-800">{el.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{el.description}</p>
                  </div>
                  <Badge status={el.status} />
                </div>

                <div className="flex gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(el.startDate).toLocaleDateString()} — {new Date(el.endDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><Users size={13} /> {el.candidatesCount} candidates</span>
                </div>

                <div className="flex gap-2 mt-auto">
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
                      <CheckCircle size={14} /> Already Voted
                    </div>
                  )}
                  {el.status === "UPCOMING" && (
                    <div className="flex-1 py-2 bg-blue-50 rounded-xl text-sm text-center text-blue-600 font-medium">
                      Opens Soon
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
