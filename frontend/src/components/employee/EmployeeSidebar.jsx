import React from "react";
import {
    CheckSquare,
    Hourglass,
    RotateCcw,
    CheckCircle2,
    LayoutDashboard,
    LogOut,
    Sparkles
} from "lucide-react";

const EmployeeSidebar = ({
    activeTab,
    setActiveTab,
    activeCount,
    reviewCount,
    revisionCount,
    completedCount,
    totalTasks,
    logout
}) => {

    return (
        <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0">

            <div>

                {/* Logo */}
                <div className="p-5 border-b border-slate-800 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                            <Sparkles className="h-4 w-4" />
                        </div>

                        <div>
                            <h1 className="font-bold text-sm leading-tight text-white">
                                Employee Workspace
                            </h1>

                            <p className="text-[10px] text-slate-400">
                                Task Management
                            </p>
                        </div>

                    </div>

                </div>


                {/* Navigation */}
                <nav className="p-3 space-y-1">

                    <button
                        onClick={() => setActiveTab("active")}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === "active"
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <CheckSquare className="h-4 w-4" />
                            <span>To Do Tasks</span>
                        </div>

                        {activeCount > 0 && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                activeTab === "active"
                                    ? "bg-indigo-700 text-white"
                                    : "bg-slate-800 text-slate-300"
                            }`}>
                                {activeCount}
                            </span>
                        )}
                    </button>


                    <button
                        onClick={() => setActiveTab("review")}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === "review"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Hourglass className="h-4 w-4" />
                            <span>Under Review</span>
                        </div>

                        {reviewCount > 0 && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                activeTab === "review"
                                    ? "bg-amber-700 text-white"
                                    : "bg-slate-800 text-slate-300"
                            }`}>
                                {reviewCount}
                            </span>
                        )}
                    </button>


                    <button
                        onClick={() => setActiveTab("revision")}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === "revision"
                                ? "bg-rose-600 text-white shadow-xs"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <RotateCcw className="h-4 w-4" />
                            <span>Needs Revision</span>
                        </div>

                        {revisionCount > 0 && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                activeTab === "revision"
                                    ? "bg-rose-700 text-white"
                                    : "bg-slate-800 text-slate-300"
                            }`}>
                                {revisionCount}
                            </span>
                        )}
                    </button>


                    <button
                        onClick={() => setActiveTab("completed")}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === "completed"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Completed Tasks</span>
                        </div>

                        {completedCount > 0 && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                activeTab === "completed"
                                    ? "bg-emerald-700 text-white"
                                    : "bg-slate-800 text-slate-300"
                            }`}>
                                {completedCount}
                            </span>
                        )}
                    </button>


                    <button
                        onClick={() => setActiveTab("all")}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === "all"
                                ? "bg-slate-800 text-white shadow-xs"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>All Tasks</span>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            activeTab === "all"
                                ? "bg-slate-700 text-white"
                                : "bg-slate-800 text-slate-300"
                        }`}>
                            {totalTasks}
                        </span>
                    </button>

                </nav>

            </div>


            {/* Logout */}
            <div className="p-4 border-t border-slate-800">

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 py-2.5 rounded-xl text-xs font-semibold border border-rose-500/20 transition-all"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    );
};

export default EmployeeSidebar;