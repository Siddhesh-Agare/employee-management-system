import React from "react";
import {
  Clock,
  ShieldCheck,
  UserMinus,
  UserCheck,
  ChevronRight,
} from "lucide-react";

const OverviewTab = ({
  pendingCount,
  managerCount,
  unassignedCount,
  assignedCount,
  setActiveTab,
}) => {

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div
          onClick={() => setActiveTab("pending")}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Approvals
            </span>

            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">
              {pendingCount}
            </span>

            <span className="text-xs text-amber-600 font-medium flex items-center">
              Requires action
              <ChevronRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>
        </div>


        <div
          onClick={() => setActiveTab("managers")}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Managers
            </span>

            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">
              {managerCount}
            </span>

            <span className="text-xs text-blue-600 font-medium flex items-center">
              View details
              <ChevronRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>
        </div>


        <div
          onClick={() => setActiveTab("assign")}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Unassigned Employees
            </span>

            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <UserMinus className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">
              {unassignedCount}
            </span>

            <span className="text-xs text-emerald-600 font-medium flex items-center">
              Assign now
              <ChevronRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>
        </div>


        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Assigned Employees
            </span>

            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">
              {assignedCount}
            </span>
          </div>
        </div>

      </div>


      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>
          <h3 className="font-bold text-lg">
            System Management Tools
          </h3>

          <p className="text-blue-100 text-xs mt-1">
            Approve registrations, onboard managers, and map organizational teams effortlessly.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setActiveTab("managers")}
            className="bg-white text-blue-600 text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors shadow-xs"
          >
            + Create Manager
          </button>

          <button
            onClick={() => setActiveTab("assign")}
            className="bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Assign Employee
          </button>

        </div>

      </div>

    </div>
  );
};

export default OverviewTab;