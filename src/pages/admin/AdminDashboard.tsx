import { Vote, Users, UserCheck, BarChart3, TrendingUp, Clock, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { elections, candidates, users, votes, votesOverTime, auditLogs } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import { useAuth } from "../../context/AuthContext";

const statCards = [
  {
    label: "Total Elections",
    value: elections.length,
    icon: Vote,
    color: "bg-indigo-50 text-indigo-600",
    change: "+2 this month",
  },
  {
    label: "Total Voters",
    value: users.filter((u) => u.role === "VOTER").length,
    icon: UserCheck,
    color: "bg-emerald-50 text-emerald-600",
    change: "+15 this week",
  },
  {
    label: "Total Candidates",
    value: candidates.length,
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    change: "Across all elections",
  },
  {
    label: "Total Votes Cast",
    value: votes.length,
    icon: BarChart3,
    color: "bg-purple-50 text-purple-600",
    change: "+612 today",
  },
];

const pieData = [
  { name: "Ongoing", value: elections.filter((e) => e.status === "ONGOING").length, color: "#10b981" },
  { name: "Upcoming", value: elections.filter((e) => e.status === "UPCOMING").length, color: "#6366f1" },
  { name: "Completed", value: elections.filter((e) => e.status === "COMPLETED").length, color: "#94a3b8" },
  { name: "Draft", value: elections.filter((e) => e.status === "DRAFT").length, color: "#f59e0b" },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Welcome back, {user?.name}. Here is your system overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
              <TrendingUp size={16} className="text-emerald-400" />
            </div>
            <div className="font-display text-3xl font-bold text-slate-800 mb-1">{s.value}</div>
            <div className="text-sm font-medium text-slate-600">{s.label}</div>
            <div className="text-xs text-slate-400 mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-slate-800">Votes Overview</h2>
              <p className="text-slate-500 text-xs mt-0.5">Student Council Election 2025 — daily votes</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={votesOverTime}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 13 }} />
              <Line type="monotone" dataKey="votes" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="font-display font-semibold text-slate-800 mb-5">Election Status</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-medium text-slate-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Elections */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="font-display font-semibold text-slate-800 mb-4">Recent Elections</h2>
          <div className="space-y-3">
            {elections.slice(0, 4).map((el) => (
              <div key={el.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">{el.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {el.candidatesCount} candidates · {el.votesCast} votes
                  </div>
                </div>
                <Badge status={el.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="font-display font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity size={13} className="text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-700 truncate">{log.description}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {log.user} · {new Date(log.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
