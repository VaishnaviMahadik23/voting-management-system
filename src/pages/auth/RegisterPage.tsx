import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-400"];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", dob: "", voterId: "",
    password: "", confirmPassword: "", terms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pwScore = passwordStrength(form.password);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required.";
    if (!form.mobile.match(/^\+?[0-9]{10,14}$/)) e.mobile = "Valid mobile number required.";
    if (!form.dob) e.dob = "Date of birth is required.";
    if (!form.voterId.trim()) e.voterId = "Voter ID is required.";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (pwScore < 2) e.password = "Password is too weak.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!form.terms) e.terms = "You must accept the terms and conditions.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigate("/login?registered=1");
  }

  function field(id: keyof typeof form, label: string, type = "text", placeholder = "") {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        <input
          type={type}
          value={form[id] as string}
          onChange={(e) => setForm((p) => ({ ...p, [id]: e.target.value }))}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
            errors[id] ? "border-red-300 bg-red-50" : "border-slate-200"
          }`}
        />
        {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-[#0f172a]">VoteSecure</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#0f172a]">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Register as a voter to participate in elections</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("name", "Full Name", "text", "John Doe")}
              {field("email", "Email Address", "email", "you@student.edu")}
              {field("mobile", "Mobile Number", "tel", "+91 9876543210")}
              {field("dob", "Date of Birth", "date")}
              {field("voterId", "Voter ID", "text", "VTR-2024-XXX")}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Min. 8 characters"
                  className={`w-full px-4 py-2.5 pr-10 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.password ? "border-red-300 bg-red-50" : "border-slate-200"
                  }`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${i <= pwScore ? strengthColors[pwScore] : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">{strengthLabels[pwScore]}</p>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Repeat password"
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.confirmPassword ? "border-red-300 bg-red-50" : "border-slate-200"
                }`}
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={form.terms}
                onChange={(e) => setForm((p) => ({ ...p, terms: e.target.checked }))}
                className="mt-0.5 rounded border-slate-300 text-indigo-600"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
