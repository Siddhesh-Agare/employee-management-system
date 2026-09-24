import React from "react";
import {
    Users,
    Plus,
    LogOut
} from "lucide-react";

const ManagerHeader = ({
    activeTab,
    setActiveTab,
    pendingCount,
    submittedTasksCount,
    logout
}) => {

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">

                    {/* Brand */}
                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20">
                            <Users className="h-5 w-5" />
                        </div>

                        <div>
                            <h1 className="font-bold text-slate-900 text-base leading-tight">
                                Team Portal
                            </h1>

                            <p className="text-[11px] text-slate-500 font-medium">
                                Manager Operations Hub
                            </p>
                        </div>

                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">

                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "overview"
                                    ? "bg-white text-emerald-700 shadow-xs"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            Overview
                        </button>

                        <button
                            onClick={() => setActiveTab("employees")}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "employees"
                                    ? "bg-white text-emerald-700 shadow-xs"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            Team

                            {pendingCount > 0 && (
                                <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                                    {pendingCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab("tasks")}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "tasks"
                                    ? "bg-white text-emerald-700 shadow-xs"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            Task Board

                            {submittedTasksCount > 0 && (
                                <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                                    {submittedTasksCount}
                                </span>
                            )}
                        </button>

                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setActiveTab("create-task")}
                            className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all"
                        >
                            <Plus className="h-4 w-4" />
                            New Task
                        </button>

                        <button
                            onClick={logout}
                            title="Logout"
                            className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200/70 hover:bg-rose-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                        >
                            <LogOut className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">
                                Logout
                            </span>
                        </button>

                    </div>

                </div>

            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex border-t border-slate-100 bg-slate-50 px-4 overflow-x-auto">

                {["overview", "employees", "create-task", "tasks"].map((tab) => (

                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2.5 px-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 ${
                            activeTab === tab
                                ? "border-emerald-600 text-emerald-700"
                                : "border-transparent text-slate-500"
                        }`}
                    >
                        {tab === "create-task"
                            ? "+ New Task"
                            : tab === "employees"
                            ? "My Team"
                            : tab}

                    </button>

                ))}

            </div>

        </header>
    );
};

export default ManagerHeader;