import {
  LayoutDashboard,
  Search,
  Briefcase,
  Bookmark,
  Settings,
  Plus,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const SESSION_LIFETIME = 30 * 24 * 60 * 60;

export const SESSION_REFRESH_TIME = SESSION_LIFETIME / 2;

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: number | "dynamic";
}

export const employerNavItems: NavItem[] = [
  {
    name: "Overview",
    href: "/employer-dashboard",
    icon: LayoutDashboard,
    exact: true, // Exact match for dashboard home
  },
  {
    name: "Applications",
    href: "/employer-dashboard/applications",
    icon: User,
  },
  {
    name: "Post a Job",
    href: "/employer-dashboard/jobs/create",
    icon: Plus,
  },
  {
    name: "My Jobs",
    href: "/employer-dashboard/jobs",
    icon: Briefcase,
    // Note: If your active link logic highlights "My Jobs" when you are on "/jobs/create",
    // you might need to add `exact: true` here depending on your navigation-utils setup!
  },
  {
    name: "Settings",
    href: "/employer-dashboard/settings",
    icon: Settings,
  },
];
