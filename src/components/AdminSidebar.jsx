import { NavLink, Link } from "react-router-dom";
import {
  FileText,
  FolderOpen,
  User,
  Bell,
  Key,
  LogOut,
} from "lucide-react";

const linkBase =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#43403b] transition-colors hover:bg-black/5";
const linkActive = "bg-black/10 text-[#26231e] hover:bg-black/10";

export default function AdminSidebar() {
  return (
    <aside className="w-[260px] shrink-0 rounded-2xl border border-brown-200 bg-brown-100 p-4 shadow-sm">
      <div className="mb-6">
        <Link
          to="/"
          className="text-body-1 md:text-headline-3 text-brown-600 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r from-brown-400 to-orange transition-colors hover:font-extrabold"
        >
          Vora W<span className="text-brand-green">.</span>
        </Link>
        <h2 className="text-lg font-semibold text-brand-orange">
          Admin panel
        </h2>
      </div>

      <nav className="space-y-1">
        <NavLink
          to="/admin/articles"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <FileText className="size-5 shrink-0" />
          Article management
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <FolderOpen className="size-5 shrink-0" />
          Category management
        </NavLink>

        <NavLink
          to="/member/profile"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <User className="size-5 shrink-0" />
          Profile
        </NavLink>

        <a href="#notification" className={linkBase}>
          <Bell className="size-5 shrink-0" />
          Notification
        </a>

        <NavLink
          to="/auth/reset-password"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <Key className="size-5 shrink-0" />
          Reset password
        </NavLink>
      </nav>

      <div className="mt-6 border-t border-brown-300 pt-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-brown-600 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r from-brown-400 to-orange transition-colors hover:font-extrabold"
        >
          Vora W<span className="text-brand-green">.</span>
        </Link>
        <a
          href="#logout"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-brown-600 transition-colors hover:bg-black/5"
        >
          <LogOut className="size-5 shrink-0" />
          Log out
        </a>
      </div>
    </aside>
  );
}
