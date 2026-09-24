import React from "react";
import { Search } from "lucide-react";

const AssignmentSection = ({
  activeEmployees,
  assignedEmployees,
  managers,
  selectedEmployee,
  selectedManager,
  employeeSearch,
  managerSearch,
  showEmployees,
  showManagers,
  setSelectedEmployee,
  setSelectedManager,
  setEmployeeSearch,
  setManagerSearch,
  setShowEmployees,
  setShowManagers,
  assignEmployee,
}) => {

  return (
    <div className="space-y-6">

      {/* Assignment Form */}

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">

        <div className="border-b border-slate-100 pb-3 mb-5">

          <h2 className="text-base font-bold text-slate-900">
            Map Employee to Manager
          </h2>

          <p className="text-xs text-slate-500">
            Assign unassigned workforce members to their supervisors.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Employee */}

          <div className="space-y-1">

            <label className="block text-xs font-semibold text-slate-700">
              Select Employee
            </label>

            <div className="relative">

              <div className="relative">

                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => {
                    setEmployeeSearch(e.target.value);
                    setShowEmployees(true);
                  }}
                  onFocus={() => setShowEmployees(true)}
                  placeholder="Search active employee..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />

              </div>


              {showEmployees && (

                <div className="absolute left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 max-h-48 overflow-y-auto z-30 shadow-lg">

                  {activeEmployees
                    .filter((emp) =>
                      emp.name
                        .toLowerCase()
                        .includes(employeeSearch.toLowerCase())
                    )
                    .map((emp) => (

                      <div
                        key={emp._id}
                        onClick={() => {
                          setSelectedEmployee(emp._id);
                          setEmployeeSearch(emp.name);
                          setShowEmployees(false);
                        }}
                        className="px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-none"
                      >

                        <p className="font-semibold text-slate-800">
                          {emp.name}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {emp.email}
                        </p>

                      </div>

                    ))}

                </div>

              )}

            </div>

          </div>


          {/* Manager */}

          <div className="space-y-1">

            <label className="block text-xs font-semibold text-slate-700">
              Select Manager
            </label>

            <div className="relative">

              <div className="relative">

                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

                <input
                  type="text"
                  value={managerSearch}
                  onChange={(e) => {
                    setManagerSearch(e.target.value);
                    setShowManagers(true);
                  }}
                  onFocus={() => setShowManagers(true)}
                  placeholder="Search manager..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />

              </div>


              {showManagers && (

                <div className="absolute left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 max-h-48 overflow-y-auto z-30 shadow-lg">

                  {managers
                    .filter((manager) =>
                      manager.name
                        .toLowerCase()
                        .includes(managerSearch.toLowerCase())
                    )
                    .map((manager) => (

                      <div
                        key={manager._id}
                        onClick={() => {
                          setSelectedManager(manager._id);
                          setManagerSearch(manager.name);
                          setShowManagers(false);
                        }}
                        className="px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-none"
                      >

                        <p className="font-semibold text-slate-800">
                          {manager.name}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {manager.email}
                        </p>

                      </div>

                    ))}

                </div>

              )}

            </div>

          </div>

        </div>


        <div className="mt-5 flex justify-end">

          <button
            onClick={assignEmployee}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors shadow-xs"
          >
            Confirm Team Assignment
          </button>

        </div>

      </div>


      {/* Unassigned Employees */}

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">

        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Unassigned Active Employees
            </h2>

            <p className="text-xs text-slate-500">
              Active employees pending team manager assignment.
            </p>
          </div>

          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-md font-semibold">
            {activeEmployees.length} Unassigned
          </span>

        </div>


        {activeEmployees.length === 0 ? (

          <div className="p-6 text-center text-slate-400 text-xs">
            All active employees are currently assigned to a manager.
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {activeEmployees.map((employee) => (

              <div
                key={employee._id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100/70 transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedEmployee(employee._id);
                  setEmployeeSearch(employee.name);
                }}
              >

                <div className="flex items-center gap-2.5 min-w-0">

                  <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="truncate">

                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {employee.name}
                    </p>

                    <p className="text-[10px] text-slate-500 truncate">
                      {employee.email}
                    </p>

                  </div>

                </div>

                <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                  Select
                </span>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* Team Structure */}

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">

        <div className="border-b border-slate-100 pb-4 mb-5">

          <h2 className="text-base font-bold text-slate-900">
            Current Team Structures
          </h2>

          <p className="text-xs text-slate-500">
            Grouped list of managers and their assigned reporting employees.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {managers.map((manager) => {

            const team = assignedEmployees.filter(
              (emp) => emp.manager === manager._id
            );

            return (

              <div
                key={manager._id}
                className="border border-slate-200 rounded-lg p-4 bg-slate-50/50"
              >

                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {manager.name}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {manager.email}
                    </p>
                  </div>

                  <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    {team.length} Members
                  </span>

                </div>


                {team.length === 0 ? (

                  <p className="text-xs text-slate-400 italic">
                    No assigned team members.
                  </p>

                ) : (

                  <ul className="space-y-1.5">

                    {team.map((employee) => (

                      <li
                        key={employee._id}
                        className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 flex justify-between items-center"
                      >

                        <span className="font-medium">
                          {employee.name}
                        </span>

                        <span className="text-[10px] text-slate-400">
                          {employee.email}
                        </span>

                        <span>
                          {employee.status}
                        </span>

                      </li>

                    ))}

                  </ul>

                )}

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default AssignmentSection;