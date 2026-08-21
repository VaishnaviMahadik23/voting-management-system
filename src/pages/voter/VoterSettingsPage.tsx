import { useState } from "react";
import { useToast } from "../../components/ui/Toast";

export default function VoterSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifs: true,
    electionReminders: true,
    resultNotifs: true,
    twoFactor: false,
    privacyMode: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your preferences</p>
      </div>

      {[
        {
          title: "Notifications",
          items: [
            { id: "emailNotifs", label: "Email Notifications", desc: "Get email alerts for elections and results" },
            { id: "electionReminders", label: "Election Reminders", desc: "Receive reminders before elections end" },
            { id: "resultNotifs", label: "Result Notifications", desc: "Get notified when results are published" },
          ],
        },
        {
          title: "Security",
          items: [
            { id: "twoFactor", label: "Two-Factor Authentication", desc: "Add an extra layer of security (coming soon)" },
          ],
        },
        {
          title: "Privacy",
          items: [
            { id: "privacyMode", label: "Enhanced Privacy Mode", desc: "Hide voting activity from the overview" },
          ],
        },
      ].map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-display font-semibold text-slate-800">{section.title}</h2>
          {section.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <div className="text-sm font-medium text-slate-800">{item.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
              </div>
              <button
                onClick={() => toggle(item.id as keyof typeof settings)}
                className={`w-11 h-6 rounded-full transition-colors ${settings[item.id as keyof typeof settings] ? "bg-indigo-600" : "bg-slate-200"}`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow transition-all" style={{ marginLeft: settings[item.id as keyof typeof settings] ? "22px" : "2px" }} />
              </button>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => toast("Settings saved!", "success")}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors"
      >
        Save Settings
      </button>
    </div>
  );
}
