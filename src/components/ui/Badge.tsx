interface BadgeProps {
  status: string;
  size?: "sm" | "md";
}

const config: Record<string, { label: string; cls: string }> = {
  ONGOING: { label: "● Ongoing", cls: "bg-emerald-100 text-emerald-700" },
  UPCOMING: { label: "● Upcoming", cls: "bg-blue-100 text-blue-700" },
  COMPLETED: { label: "● Completed", cls: "bg-slate-100 text-slate-600" },
  DRAFT: { label: "● Draft", cls: "bg-amber-100 text-amber-700" },
  CANCELLED: { label: "● Cancelled", cls: "bg-red-100 text-red-600" },
  VERIFIED: { label: "Verified", cls: "bg-emerald-100 text-emerald-700" },
  PENDING: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
  REJECTED: { label: "Rejected", cls: "bg-red-100 text-red-600" },
  SUSPENDED: { label: "Suspended", cls: "bg-rose-100 text-rose-700" },
  ACTIVE: { label: "Active", cls: "bg-emerald-100 text-emerald-700" },
  INACTIVE: { label: "Inactive", cls: "bg-slate-100 text-slate-500" },
  DISQUALIFIED: { label: "Disqualified", cls: "bg-red-100 text-red-600" },
};

export default function Badge({ status, size = "sm" }: BadgeProps) {
  const c = config[status] ?? { label: status, cls: "bg-slate-100 text-slate-600" };
  const sz = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sz} ${c.cls}`}>
      {c.label}
    </span>
  );
}
