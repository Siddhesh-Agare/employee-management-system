import React from "react";
import {
    FileText,
    User,
    Calendar,
    CheckCircle2,
    XCircle
} from "lucide-react";

const ManagerTaskBoard = ({
    myTasks,
    getStatusBadge,
    reviewTask,
    setSelectedTask
}) => {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-slate-900">
                        Task Deliverables Board
                    </h2>

                    <p className="text-xs text-slate-500">
                        Track task status and perform code/work reviews.
                    </p>

                </div>

                <span className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold shadow-xs">
                    {myTasks.length} Assigned Tasks
                </span>

            </div>

            {myTasks.length === 0 ? (

                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">

                    <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />

                    <p className="text-sm font-semibold text-slate-700">
                        No Tasks Created
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                        Assign work tasks using the 'New Task' button above.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {myTasks.map((task) => (

                        <div
                            key={task._id}
                            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4"
                        >

                            <div className="space-y-2">

                                <div className="flex items-start justify-between gap-2">

                                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                                        {task.title}
                                    </h3>

                                    {getStatusBadge(task.status)}

                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                                    {task.description}
                                </p>

                            </div>

                            <div className="space-y-3 pt-3 border-t border-slate-100">

                                <div className="flex items-center justify-between text-xs text-slate-500">

                                    <span className="font-medium text-slate-700 flex items-center gap-1">
                                        <User className="h-3.5 w-3.5 text-emerald-600" />
                                        {task.assignedTo?.name || "Unassigned"}
                                    </span>

                                    <span className="flex items-center gap-1 text-[11px]">

                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />

                                        {new Date(task.dueDate).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}

                                    </span>

                                </div>

                                {/* Employee Response */}
                                {task.response && (

                                    <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 text-xs">

                                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                                            Submission Note
                                        </p>

                                        <p className="text-slate-700 italic">
                                            "{task.response}"
                                        </p>

                                    </div>

                                )}

                                {/* Feedback */}
                                {task.feedback && (

                                    <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-2.5 text-xs">

                                        <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider mb-0.5">
                                            Your Review Feedback
                                        </p>

                                        <p className="text-slate-700 italic">
                                            "{task.feedback}"
                                        </p>

                                    </div>

                                )}

                                {/* Actions */}
                                {task.status === "submitted" && (

                                    <div className="flex items-center gap-2 pt-1">

                                        <button
                                            onClick={() => reviewTask(task._id)}
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Approve Task
                                        </button>

                                        <button
                                            onClick={() => setSelectedTask(task._id)}
                                            className="flex-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                                        >
                                            <XCircle className="h-3.5 w-3.5" />
                                            Request Changes
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

export default ManagerTaskBoard;