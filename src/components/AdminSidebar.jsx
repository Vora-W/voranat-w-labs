import { NavLink, Link } from "react-router-dom";
import {
  NotebookPen,
  Folder,
  UserRound,
  Bell,
  LogOut,
  SquareArrowOutUpRight,
  RotateCcw,
} from "lucide-react";

const linkBase =
  "flex h-[64px] w-[280px] items-center gap-3 px-6 py-5 text-body-1 text-brown-400 transition-colors hover:bg-brown-300";
const linkActive = "bg-brown-300 text-brown-600";

export default function AdminSidebar() {
  return (
    <aside className="flex h-[1024px] w-[280px] shrink-0 flex-col border-r border-brown-200 bg-brown-200 py-4">
      <div className="mb-0 flex h-[212px] w-[280px] flex-col gap-1 border-b border-brown-200 px-6 py-[60px]">
        <Link
          to="/"
          className="text-headline-2 text-brown-600 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r from-brown-400 to-orange transition-colors hover:font-extrabold"
        >
          Vora W<span className="text-brand-green">.</span>
        </Link>
        <h2 className="text-headline-4 text-brand-orange">
          Admin panel
        </h2>
      </div>

      <nav className="flex flex-col">
        <NavLink
          to="/admin/articles"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <NotebookPen className="size-5 shrink-0" />
          Article management
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <Folder className="size-5 shrink-0" />
          Category management
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <UserRound className="size-5 shrink-0" />
          Profile
        </NavLink>

        <a href="#notification" className={linkBase}>
          <Bell className="size-5 shrink-0" />
          Notification
        </a>

        <NavLink
          to="/admin/auth/reset-password"
          className={({ isActive }) =>
            isActive ? `${linkBase} ${linkActive}` : linkBase
          }
        >
          <RotateCcw className="size-5 shrink-0" />
          Reset password
        </NavLink>
      </nav>

      <div className="mt-auto flex flex-col">
        <Link
          to="/"
          className={linkBase}
        >
          <SquareArrowOutUpRight className="size-5 shrink-0" />
          Vora W. Website
        </Link>
        <a
          href="#logout"
          className={`${linkBase} border-t border-brown-300`}
        >
          <LogOut className="size-5 shrink-0" />
          Log out
        </a>
      </div>
    </aside>
  );
}
