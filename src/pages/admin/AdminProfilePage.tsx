import { Shield, Calendar, Clock, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Admin Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Your administrator account details</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold font-display">
            {user?.name[0]}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-800">{user?.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <Shield size={11} /> System Administrator
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Mail, label: "Email", value: user?.email },
            { icon: Shield, label: "Role", value: "System Administrator" },
            { icon: Calendar, label: "Account Created", value: user ? new Date(user.registeredAt).toLocaleDateString() : "—" },
            { icon: Clock, label: "Last Login", value: user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <item.icon size={13} />
                {item.label}
              </div>
              <div className="text-sm font-medium text-slate-800">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-display font-semibold text-slate-800 mb-4">Permissions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Manage Elections", "Manage Candidates", "Manage Voters",
            "View Reports", "Access Audit Logs", "Manage Users",
            "Publish Results", "System Settings",
          ].map((p) => (
            <div key={p} className="flex items-center gap-2 text-sm text-slate-700 py-1.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
