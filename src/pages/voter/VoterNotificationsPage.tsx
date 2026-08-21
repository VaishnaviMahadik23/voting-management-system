import { useState } from "react";
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { notifications as initial } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/ui/Toast";

export default function VoterNotificationsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifs, setNotifs] = useState(initial.filter((n) => n.userId === user?.id));
  const unread = notifs.filter((n) => !n.read).length;

  function markAll() {
    setNotifs((p) => p.map((n) => ({ ...n, read: true })));
    toast("All notifications marked as read.", "success");
  }

  const icons = { info: Info, success: CheckCircle, warning: AlertTriangle };
  const colors = { info: "bg-blue-50 text-blue-500", success: "bg-emerald-50 text-emerald-500", warning: "bg-amber-50 text-amber-500" };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-slate-500 text-sm">{unread > 0 ? `${unread} unread` : "All caught up!"}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50">
        {notifs.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Bell size={32} className="mx-auto mb-3 opacity-30" />
            <p>No notifications yet.</p>
          </div>
        ) : (
          notifs.map((n) => {
            const Icon = icons[n.type];
            return (
              <div key={n.id} onClick={() => setNotifs((p) => p.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                className={`flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors ${!n.read ? "bg-indigo-50/30" : ""}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colors[n.type]}`}>
                  <Icon size={17} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${!n.read ? "text-slate-900" : "text-slate-700"}`}>{n.title}</span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
