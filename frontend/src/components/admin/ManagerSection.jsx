import React from "react";
import {
  UserPlus,
  User,
  Mail,
  Lock,
} from "lucide-react";

const ManagerSection = ({
  managers,
  managerName,
  managerEmail,
  managerPassword,
  setManagerName,
  setManagerEmail,
  setManagerPassword,
  createManager,
}) => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Create Manager */}

      <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-xs h-fit">

        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">

          <UserPlus className="h-5 w-5 text-blue-600" />

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Create Manager
            </h2>

            <p className="text-xs text-slate-500">
              Register new management personnel.
            </p>
          </div>

        </div>


        <form onSubmit={createManager} className="space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>

            <div className="relative">

              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="e.g. Michael Scott"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />

            </div>
          </div>


          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

              <input
                type="email"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
                placeholder="m.scott@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />

            </div>
          </div>


          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

              <input
                type="password"
                value={managerPassword}
                onChange={(e) => setManagerPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />

            </div>
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-xs transition-colors mt-2"
          >
            Add Manager
          </button>

        </form>

      </div>


      {/* Manager Directory */}

      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">

        <div className="p-5 border-b border-slate-100 flex items-center justify-between">

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Managers Directory
            </h2>

            <p className="text-xs text-slate-500">
              Currently active management accounts.
            </p>
          </div>

          <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
            {managers.length} Total
          </span>

        </div>


        <div className="divide-y divide-slate-100">

          {managers.length === 0 ? (

            <div className="p-8 text-center text-slate-400 text-xs">
              No managers registered yet.
            </div>

          ) : (

            managers.map((manager) => (

              <div
                key={manager._id}
                className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {manager.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {manager.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {manager.email}
                    </p>
                  </div>

                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md">
                  Manager
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default ManagerSection;