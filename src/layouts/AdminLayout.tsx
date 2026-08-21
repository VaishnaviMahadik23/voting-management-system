import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Vote, Users, UserCheck, BarChart3, FileText,
  Bell, ClipboardList, Settings, LogOut, Menu, X, Shield, ChevronRight, User
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/elections", icon: Vote, label: "Elections" },
  { to: "/admin/candidates", icon: Users, label: "Candidates" },
  { to: "/admin/voters", icon: UserCheck, label: "Voters" },
  { to: "/admin/results", icon: BarChart3, label: "Results" },
  { to: "/admin/reports", icon: FileText, label: "Reports" },
  { to: "/admin/notifications", icon: Bell, label: "Notifications" },
  { to: "/admin/audit-logs", icon: ClipboardList, label: "Audit Logs" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
  { to: "/admin/profile", icon: User, label: "Admin Profile" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0f172a] text-white">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-sm leading-tight">VoteSecure</div>
            <div className="text-xs text-slate-400">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/8"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
            {user?.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.name}</div>
            <div className="text-xs text-slate-400 truncate">Administrator</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-red-500/20 transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-4 shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1" />
          <NavLink
            to="/admin/notifications"
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </NavLink>
          <NavLink to="/admin/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
              {user?.name[0]}
            </div>
          </NavLink>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
