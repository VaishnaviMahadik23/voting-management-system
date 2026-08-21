import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useToast } from "../../components/ui/Toast";

const electionTypes = [
  "Student Council", "College Election", "Class Representative",
  "Club Election", "Organization Election", "Other",
];

export default function CreateElectionPage() {
  const [form, setForm] = useState({
    name: "", type: "Student Council", description: "",
    startDate: "", startTime: "09:00", endDate: "", endTime: "18:00",
    eligibleCategory: "", rules: "",
    allowRegistration: true, autoPublish: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Election name is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.startDate) e.startDate = "Start date is required.";
    if (!form.endDate) e.endDate = "End date is required.";
    if (form.startDate && form.endDate && form.startDate >= form.endDate) {
      e.endDate = "End date must be after start date.";
    }
    if (!form.eligibleCategory.trim()) e.eligibleCategory = "Eligible voter category is required.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setConfirmOpen(true);
  }

  function handleConfirm() {
    toast("Election created successfully!", "success");
    navigate("/admin/elections");
  }

  function f(id: keyof typeof form, label: string, type = "text", placeholder = "", rows?: number) {
    const err = errors[id as string];
    const baseClass = `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${err ? "border-red-300 bg-red-50" : "border-slate-200"}`;
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        {rows ? (
          <textarea
            value={form[id] as string}
            onChange={(e) => setForm((p) => ({ ...p, [id]: e.target.value }))}
            placeholder={placeholder}
            rows={rows}
            className={baseClass}
          />
        ) : (
          <input
            type={type}
            value={form[id] as string}
            onChange={(e) => setForm((p) => ({ ...p, [id]: e.target.value }))}
            placeholder={placeholder}
            className={baseClass}
          />
        )}
        {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-800">Create Election</h1>
        <p className="text-slate-500 text-sm mt-0.5">Fill in the details to set up a new election.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-display font-semibold text-slate-700">Basic Information</h2>
          {f("name", "Election Name", "text", "e.g. Student Council Election 2025")}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Election Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {electionTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {f("description", "Description", "text", "Brief description of the election", 3)}
          {f("eligibleCategory", "Eligible Voter Category", "text", "e.g. All Students, Final-year Students")}
          {f("rules", "Election Rules", "text", "Rules and guidelines for the election...", 4)}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-display font-semibold text-slate-700">Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {f("startDate", "Start Date", "date")}
            {f("startTime", "Start Time", "time")}
            {f("endDate", "End Date", "date")}
            {f("endTime", "End Time", "time")}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-display font-semibold text-slate-700">Settings</h2>
          <label className="flex items-center justify-between py-3 border-b border-slate-100 cursor-pointer">
            <div>
              <div className="text-sm font-medium text-slate-800">Allow Voter Registration</div>
              <div className="text-xs text-slate-400 mt-0.5">Let voters register specifically for this election</div>
            </div>
            <div
              onClick={() => setForm((p) => ({ ...p, allowRegistration: !p.allowRegistration }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${form.allowRegistration ? "bg-indigo-600" : "bg-slate-200"}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow mt-0.5 transition-all ${form.allowRegistration ? "ml-5.5" : "ml-0.5"}`} style={{ marginLeft: form.allowRegistration ? "22px" : "2px" }} />
            </div>
          </label>
          <label className="flex items-center justify-between py-3 cursor-pointer">
            <div>
              <div className="text-sm font-medium text-slate-800">Automatically Publish Results</div>
              <div className="text-xs text-slate-400 mt-0.5">Results are published immediately when the election ends</div>
            </div>
            <div
              onClick={() => setForm((p) => ({ ...p, autoPublish: !p.autoPublish }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${form.autoPublish ? "bg-indigo-600" : "bg-slate-200"}`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow mt-0.5 transition-all" style={{ marginLeft: form.autoPublish ? "22px" : "2px" }} />
            </div>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/elections")}
            className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            Create Election
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Create Election"
        message={`Are you sure you want to create "${form.name}"? The election will be saved as DRAFT and can be published later.`}
        confirmLabel="Create Election"
      />
    </div>
  );
}
