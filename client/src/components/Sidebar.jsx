import {
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
function Sidebar() {
  const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Clients",
    icon: Users,
    path: "/clients",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-violet-700 via-purple-700 to-fuchsia-600 text-white flex flex-col p-6">

      {/* Logo */}

      <div className="mb-14">

        <h1 className="text-4xl font-black tracking-tight">
          BrandSync
        </h1>

        <p className="text-white/70 mt-2 text-sm">
          Creative Operations Platform
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) =>
    `w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-white text-violet-700 shadow-lg"
        : "text-white hover:bg-white/15 hover:translate-x-2"
    }`
  }
>
  <Icon size={22} />
  <span className="font-medium">{item.name}</span>
</NavLink>

          );

        })}

      </nav>

      {/* Logout */}

      <button className="mt-10 flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-500/20 transition-all">

        <LogOut size={22} />

        Logout

      </button>

    </aside>
  );
}

export default Sidebar;