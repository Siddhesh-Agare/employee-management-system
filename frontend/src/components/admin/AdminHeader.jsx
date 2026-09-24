import React from "react";
import { LogOut } from "lucide-react";

const AdminHeader = ({
  activeTab,
  setActiveTab,
  logout,
}) => {

  const getTitle = () => {
    if (activeTab === "overview") return "Dashboard Overview";
    if (activeTab === "pending") return "Pending Approvals";
    if (activeTab === "managers") return "Manager Management";
    if (activeTab === "assign") return "Team & Employee Assignments";

    return "Admin Dashboard";
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-xs">

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {getTitle()}
          </h1>

          <p className="text-xs text-slate-500">
            Manage organizational structure and access controls
          </p>
        </div>

        <button
          onClick={logout}
          className="md:hidden flex items-center gap-1.5 text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>

      </header>

      <div className="md:hidden flex border-b border-slate-200 bg-white px-4 overflow-x-auto space-x-2">

        {["overview", "pending", "managers", "assign"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-3 text-xs font-medium capitalize whitespace-nowrap border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500"
            }`}
          >
            {tab === "assign" ? "Team Assignments" : tab}
          </button>
        ))}

      </div>
    </>
  );
};

export default AdminHeader;