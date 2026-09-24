import React from "react";
import {
  Building,
  LayoutDashboard,
  Clock,
  ShieldCheck,
  Briefcase,
  UserCheck,
  LogOut,
} from "lucide-react";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  pendingCount,
  unassignedCount,
  logout,
}) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex shrink-0">
      
      <div>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
            <Building className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-bold text-base text-slate-900 leading-tight">
              Workforce HR
            </h2>
            <p className="text-xs text-slate-500">
              Admin Control Center
            </p>
          </div>
        </div>

        <nav className="p-4 space-y-1">

          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "overview"
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-4 w-4" />
              <span>Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "pending"
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4" />
              <span>Pending Approvals</span>
            </div>

            {pendingCount > 0 && (
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("managers")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "managers"
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4" />
              <span>Managers Directory</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("assign")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "assign"
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4" />
              <span>Team Assignments</span>
            </div>

            {unassignedCount > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                {unassignedCount}
              </span>
            )}
          </button>

        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>

            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 truncate">
                Administrator
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                admin@system.com
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            title="Logout"
            className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>

        </div>
      </div>

    </aside>
  );
};

export default AdminSidebar;