"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Database,
  FlaskConical,
  CalendarDays,
  BarChart3,
  Users,
  Settings,
  Bot,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Papers",
    href: "/dashboard/papers",
    icon: FileText,
  },
  {
    title: "Datasets",
    href: "/dashboard/datasets",
    icon: Database,
  },
  {
    title: "Experiments",
    href: "/dashboard/experiments",
    icon: FlaskConical,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/ai",
    icon: Bot,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-[calc(100vh-64px)] w-72 border-r border-slate-200 bg-white">
      <div className="p-6">
        <h2 className="text-xl font-bold text-violet-600">
          Workspace
        </h2>
      </div>

      <nav className="space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all
              ${
                active
                  ? "bg-violet-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}