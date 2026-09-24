import React from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const PendingEmployees = ({
  employees,
  approveEmployee,
  rejectEmployee,
}) => {

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">

      <div className="p-5 border-b border-slate-100 flex items-center justify-between">

        <div>
          <h2 className="text-base font-bold text-slate-900">
            Pending Employee Registrations
          </h2>

          <p className="text-xs text-slate-500">
            Review and confirm employee account requests.
          </p>
        </div>

        <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-amber-200">
          {employees.length} Pending
        </span>

      </div>


      <div className="divide-y divide-slate-100">

        {employees.length === 0 ? (

          <div className="p-12 text-center">

            <Clock className="h-10 w-10 text-slate-300 mx-auto mb-3" />

            <p className="text-sm font-semibold text-slate-700">
              No Pending Requests
            </p>

            <p className="text-xs text-slate-400 mt-1">
              All employee registration requests have been addressed.
            </p>

          </div>

        ) : (

          employees.map((employee) => (

            <div
              key={employee._id}
              className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
                  {employee.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {employee.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {employee.email}
                  </p>
                </div>

              </div>


              <div className="flex items-center gap-2">

                <button
                  onClick={() => approveEmployee(employee._id)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve
                </button>

                <button
                  onClick={() => rejectEmployee(employee._id)}
                  className="flex items-center gap-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Reject
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default PendingEmployees;