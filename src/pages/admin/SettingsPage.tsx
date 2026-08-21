import { useState } from "react";
import { useToast } from "../../components/ui/Toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [notifSettings, setNotifSettings] = useState({
    emailNotifs: true,
    electionReminders: true,
    resultNotifs: true,
    auditAlerts: false,
  });

  function save() {
    toast("Settings saved successfully!", "success");
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Configure system preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-display font-semibold text-slate-800">Notification Settings</h2>
        {[
          { id: "emailNotifs", label: "Email Notifications", desc: "Receive email alerts for critical events" },
          { id: "electionReminders", label: "Election Reminders", desc: "Reminders before elections start or end" },
          { id: "resultNotifs", label: "Result Notifications", desc: "Alert when results are published" },
          { id: "auditAlerts", label: "Audit Alerts", desc: "Receive alerts for suspicious activity" },
        ].map((s) => (
          <div key={s.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
              <div className="text-sm font-medium text-slate-800">{s.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
            </div>
            <button
              onClick={() => setNotifSettings((p) => ({ ...p, [s.id]: !p[s.id as keyof typeof p] }))}
              className={`w-11 h-6 rounded-full transition-colors ${notifSettings[s.id as keyof typeof notifSettings] ? "bg-indigo-600" : "bg-slate-200"}`}
            >
              <div
                className="w-5 h-5 bg-white rounded-full shadow transition-all"
                style={{ marginLeft: notifSettings[s.id as keyof typeof notifSettings] ? "22px" : "2px" }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-display font-semibold text-slate-800">Security</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
          <input type="password" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
          <input type="password" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Min. 8 characters" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
          <input type="password" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Repeat new password" />
        </div>
      </div>

      <button
        onClick={save}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
}
