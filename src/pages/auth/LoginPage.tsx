import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email) { setError("Email is required."); return; }
    if (!password) { setError("Password is required."); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const success = login(email, password);
    setLoading(false);

    if (!success) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    const stored = sessionStorage.getItem("vms_user");
    if (stored) {
      const user = JSON.parse(stored);
      navigate(user.role === "ADMIN" ? "/admin" : "/voter");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-[#0f172a]">VoteSecure</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#0f172a]">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Register
            </Link>
          </p>
        </div>

        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-slate-600">
          <p className="font-medium text-slate-700 mb-1">Demo Credentials</p>
          <p>Admin: admin@votesecure.com / Admin@123</p>
          <p>Voter: vaishnavi@student.edu / Voter@123</p>
        </div>
      </div>
    </div>
  );
}
