import React from "react";
import {
    Calendar,
    AlertCircle,
    MessageSquare,
    PlayCircle,
    Send,
    CheckCircle2
} from "lucide-react";

const EmployeeTaskCard = ({
    task,
    getStatusBadge,
    updateTaskStatus,
    openSubmitModal
}) => {

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">

            <div className="space-y-3">

                {/* Header */}
                <div className="flex items-start justify-between gap-2">

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {task.title}
                    </h3>

                    {getStatusBadge(task.status)}

                </div>


                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                    {task.description}
                </p>


                {/* Due Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">

                    <Calendar className="h-3.5 w-3.5 text-slate-400" />

                    <span>
                        Due Date:{" "}
                        <strong className="text-slate-800">
                            {new Date(task.dueDate).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            )}
                        </strong>
                    </span>

                </div>


                {/* Manager Feedback */}
                {task.feedback && (

                    <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-xs space-y-1">

                        <p className="font-bold text-[10px] uppercase tracking-wider text-rose-800 flex items-center gap-1">

                            <AlertCircle className="h-3.5 w-3.5 text-rose-600" />

                            Manager Feedback:

                        </p>

                        <p className="text-slate-700 italic">
                            "{task.feedback}"
                        </p>

                    </div>

                )}


                {/* Submitted Response */}
                {task.response && (

                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 text-xs space-y-1">

                        <p className="font-bold text-[10px] uppercase tracking-wider text-indigo-800 flex items-center gap-1">

                            <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />

                            Submitted Response:

                        </p>

                        <p className="text-slate-700 italic">
                            "{task.response}"
                        </p>

                    </div>

                )}

            </div>


            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">

                {task.status === "assigned" && (

                    <button
                        onClick={() => updateTaskStatus(task._id)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                        <PlayCircle className="h-4 w-4" />
                        Start Task
                    </button>

                )}


                {(task.status === "in-progress" ||
                    task.status === "changes-required") && (

                    <button
                        onClick={() => openSubmitModal(task)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                        <Send className="h-3.5 w-3.5" />

                        {task.status === "changes-required"
                            ? "Re-submit Task"
                            : "Submit Task Response"}
                    </button>

                )}


                {task.status === "submitted" && (

                    <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg w-full text-center font-medium">
                        Awaiting Manager Review
                    </span>

                )}


                {task.status === "reviewed" && (

                    <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg w-full text-center font-medium flex items-center justify-center gap-1">

                        <CheckCircle2 className="h-3.5 w-3.5" />

                        Approved

                    </span>

                )}

            </div>

        </div>
    );
};

export default EmployeeTaskCard;