import { Bell, Search, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

function Topbar({ setOpenProjectModal, setOpenClientModal, }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const hour = new Date().getHours();

    const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const welcomeMessage = {
  "Good Morning": "Let's kickstart your day and manage your clients efficiently.",
  "Good Afternoon": "Hope your day is going great. Here's what's happening today.",
  "Good Evening": "Great work today! Here's a quick overview before you wrap up."
};

    const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const greeting = getGreeting();
const location = useLocation();


  return (
    <div className="mb-10">

      

<div className="flex justify-between items-start">
  {/* Left Side */}
  <div>

    <h1 className="text-4xl font-bold text-slate-800">
      {greeting}, {user?.name} 👋
    </h1>

    <p className="text-slate-500 mt-2 text-lg">
      {welcomeMessage[greeting]}
    </p>

    <div className="inline-flex items-center mt-5 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-sm text-slate-600">
      📅 {today}
    </div>


  </div>

  <div className="flex gap-4">

  {location.pathname === "/projects" && (
    <button
      onClick={() => setOpenProjectModal(true)}
      className="
      px-6 py-3
      rounded-xl
      bg-gradient-to-r
      from-violet-600
      to-fuchsia-600
      text-white
      font-semibold
      shadow-lg
      hover:scale-105
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      + New Project
    </button>
  )}

  {location.pathname === "/clients" && (
    <button
      onClick={() => setOpenClientModal(true)}
      className="
      px-6 py-3
      rounded-xl
      bg-gradient-to-r
      from-violet-600
      to-fuchsia-600
      text-white
      font-semibold
      shadow-lg
      hover:scale-105
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      + Add Client
    </button>
  )}

</div>
</div>

      {/* Right */}

<div className="flex justify-end items-center gap-5 mt-8">   
        {/* Search */}

<div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 w-80 shadow-md border border-slate-200 hover:shadow-lg transition">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent flex-1"          />

        </div>

        {/* Notification */}

<button className="relative bg-white p-4 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <Bell size={20} />

          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* User */}

        <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition">

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold">
    {user?.name?.charAt(0).toUpperCase()}
</div>

          <div className="text-left">

            <p className="font-semibold text-slate-800">
    {user?.name}
</p>

            <p className="text-xs text-slate-500">
    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
</p>
          </div>

          <ChevronDown size={18} />

        </button>

      </div>

      

    </div>
  );
}

export default Topbar;