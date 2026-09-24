import React from "react";
import { Users } from "lucide-react";

const ManagerEmployees = ({
    myEmployees,
    approveMyEmployee,
    rejectMyEmployee
}) => {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Team Roster
                    </h2>

                    <p className="text-xs text-slate-500">
                        Direct reports assigned under your management.
                    </p>
                </div>

                <span className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold shadow-xs">
                    {myEmployees.length} Total Employees
                </span>

            </div>

            {myEmployees.length === 0 ? (

                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">

                    <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />

                    <p className="text-sm font-semibold text-slate-700">
                        No Direct Reports Yet
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                        Wait for your Admin to assign team members to your account.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {myEmployees.map((employee) => (

                        <div
                            key={employee._id}
                            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                                        {employee.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            {employee.name}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {employee.email}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">

                                <span
                                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold capitalize ${
                                        employee.status === "active"
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            : employee.status === "pending"
                                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                                            : "bg-rose-50 text-rose-700 border border-rose-200"
                                    }`}
                                >
                                    {employee.status}
                                </span>

                                {employee.status === "pending" && (

                                    <div className="flex gap-1.5">

                                        <button
                                            onClick={() =>
                                                approveMyEmployee(employee._id)
                                            }
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                rejectMyEmployee(employee._id)
                                            }
                                            className="bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs px-2 py-1 rounded-lg font-semibold transition-colors"
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default ManagerEmployees;