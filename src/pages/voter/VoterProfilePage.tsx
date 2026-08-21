import { useState } from "react";
import { User, Mail, Phone, Calendar, CreditCard, Edit, Key } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { useToast } from "../../components/ui/Toast";

export default function VoterProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [editOpen, setEditOpen] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [mobile, setMobile] = useState(user?.mobile ?? "");

  function saveProfile() {
    updateUser({ name, mobile });
    setEditOpen(false);
    toast("Profile updated successfully!", "success");
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold font-display">
            {user?.name[0]}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-slate-800">{user?.name}</h2>
            <p className="text-slate-500 text-sm">{user?.email}</p>
            <Badge status={user?.status ?? "PENDING"} size="md" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              <Edit size={14} /> Edit
            </button>
            <button
              onClick={() => setPwOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              <Key size={14} /> Password
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: User, label: "Full Name", value: user?.name },
            { icon: Mail, label: "Email", value: user?.email },
            { icon: Phone, label: "Mobile", value: user?.mobile ?? "—" },
            { icon: CreditCard, label: "Voter ID", value: user?.voterId ?? "—" },
            { icon: Calendar, label: "Date of Birth", value: user?.dob ?? "—" },
            { icon: Calendar, label: "Registered On", value: user ? new Date(user.registeredAt).toLocaleDateString() : "—" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <item.icon size={13} />
                {item.label}
              </div>
              <div className="text-sm font-medium text-slate-800">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile" size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditOpen(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={saveProfile} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold">Save Changes</button>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal open={pwOpen} onClose={() => setPwOpen(false)} title="Change Password" size="sm">
        <div className="space-y-4">
          {["Current Password", "New Password", "Confirm Password"].map((label) => (
            <div key={label}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <div className="flex gap-3">
            <button onClick={() => setPwOpen(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={() => { setPwOpen(false); toast("Password updated!", "success"); }} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold">Update Password</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
