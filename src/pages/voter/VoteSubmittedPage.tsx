import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Home, Vote } from "lucide-react";

export default function VoteSubmittedPage() {
  const [params] = useSearchParams();
  const electionName = params.get("election") ?? "Unknown Election";
  const ref = params.get("ref") ?? "VT-XXXX";

  return (
    <div className="p-6 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xl">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>

          <h1 className="font-display text-2xl font-bold text-slate-800 mb-2">Vote Submitted!</h1>
          <p className="text-slate-500 text-sm mb-6">
            Your vote has been securely submitted and recorded.
          </p>

          {/* Details */}
          <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Election</span>
              <span className="font-medium text-slate-800 text-right max-w-48">{electionName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date &amp; Time</span>
              <span className="font-medium text-slate-800">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-slate-200 pt-3 mt-3">
              <span className="text-slate-500">Reference No.</span>
              <span className="font-mono font-semibold text-indigo-600">{ref}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            Keep your reference number safe. It confirms your participation but does not reveal your choice.
          </p>

          <div className="flex gap-3">
            <Link
              to="/voter"
              className="flex-1 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Home size={15} /> Dashboard
            </Link>
            <Link
              to="/voter/my-votes"
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Vote size={15} /> My Votes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
