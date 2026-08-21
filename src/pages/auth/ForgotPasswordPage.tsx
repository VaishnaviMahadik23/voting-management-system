import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, CheckCircle, ArrowLeft } from "lucide-react";

type Step = "email" | "otp" | "newPassword" | "success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function proceed() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    if (step === "email") setStep("otp");
    else if (step === "otp") setStep("newPassword");
    else if (step === "newPassword") setStep("success");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-[#0f172a]">VoteSecure</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {step === "email" && (
            <>
              <h2 className="font-display text-xl font-bold mb-1">Forgot Password</h2>
              <p className="text-slate-500 text-sm mb-6">Enter your registered email to receive an OTP.</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <button onClick={proceed} disabled={loading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Send OTP
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="font-display text-xl font-bold mb-1">Enter OTP</h2>
              <p className="text-slate-500 text-sm mb-6">We sent a 6-digit code to <strong>{email}</strong>.</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 tracking-widest text-center text-lg"
                />
              </div>
              <button onClick={proceed} disabled={loading || otp.length !== 6} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Verify OTP
              </button>
            </>
          )}

          {step === "newPassword" && (
            <>
              <h2 className="font-display text-xl font-bold mb-1">New Password</h2>
              <p className="text-slate-500 text-sm mb-6">Set your new password below.</p>
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <button onClick={proceed} disabled={loading || password.length < 8 || password !== confirm} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors">
                Reset Password
              </button>
            </>
          )}

          {step === "success" && (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h2 className="font-display text-xl font-bold mb-2">Password Reset!</h2>
              <p className="text-slate-500 text-sm mb-6">Your password has been successfully updated.</p>
              <Link to="/login" className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors text-center">
                Back to Sign In
              </Link>
            </div>
          )}

          {step !== "success" && (
            <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mt-4 transition-colors">
              <ArrowLeft size={15} /> Back to Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
