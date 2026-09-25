import React, { useState } from "react";
import {
    CheckSquare,
    Hourglass,
    RotateCcw,
    CheckCircle2,
    LayoutDashboard,
    LogOut,
    Sparkles,
    Menu,
    X
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
    // State to handle mobile menu visibility
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Helper function to switch tabs and auto-close sidebar on mobile
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
        setIsMobileOpen(false);
    };

    return (
        <>
            {/* MOBILE TOP BAR WITH BURGER MENU */}
            <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                        <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-bold text-xs tracking-wide">Employee Workspace</span>
                </div>
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
                    aria-label="Toggle Navigation Menu"
                >
                    {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* MOBILE BACKDROP OVERLAY */}
            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40"
                />
            )}

            {/* SIDEBAR CONTAINER (Collapsible Drawer on Mobile / Standard Sticky Sidebar on Desktop) */}
            <aside
                className={`fixed md:static top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 transform transition-transform duration-300 ease-in-out ${
                    isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div>
                    {/* Logo Header */}
                    <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                                <h1 className="font-bold text-sm leading-tight text-white">
                                    Employee Workspace
                                </h1>
                                <p className="text-[10px] text-slate-400">Task Management</p>
                            </div>
                        </div>

                        {/* Close button inside sidebar header for mobile view */}
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="md:hidden text-slate-400 hover:text-white p-1"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-3 space-y-1">
                        <button
                            onClick={() => handleTabSelect("active")}
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
                                    activeTab === "active" ? "bg-indigo-700 text-white" : "bg-slate-800 text-slate-300"
                                }`}>
                                    {activeCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => handleTabSelect("review")}
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
                                    activeTab === "review" ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-300"
                                }`}>
                                    {reviewCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => handleTabSelect("revision")}
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
                                    activeTab === "revision" ? "bg-rose-700 text-white" : "bg-slate-800 text-slate-300"
                                }`}>
                                    {revisionCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => handleTabSelect("completed")}
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
                                    activeTab === "completed" ? "bg-emerald-700 text-white" : "bg-slate-800 text-slate-300"
                                }`}>
                                    {completedCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => handleTabSelect("all")}
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
                                activeTab === "all" ? "bg-slate-700 text-white" : "bg-slate-800 text-slate-300"
                            }`}>
                                {totalTasks}
                            </span>
                        </button>
                    </nav>
                </div>

                {/* Logout Action */}
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
        </>
    );
};

export default EmployeeSidebar;