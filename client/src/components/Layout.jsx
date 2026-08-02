import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
const [openProjectModal, setOpenProjectModal] = useState(false);
const [openClientModal, setOpenClientModal] = useState(false);
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-slate-50 to-violet-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ">

        <div className="space-y-8">
<Topbar
  setOpenProjectModal={setOpenProjectModal}
  setOpenClientModal={setOpenClientModal}
/>
<Outlet
  context={{
    openProjectModal,
    setOpenProjectModal,
    openClientModal,
    setOpenClientModal,
  }}
/></div>

      </div>

    </div>
  );
}

export default Layout;