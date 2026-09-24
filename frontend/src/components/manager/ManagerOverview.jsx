import React from "react";
import {
    UserCheck,
    Clock,
    CheckSquare,
    Plus,
    ChevronRight
} from "lucide-react";

const ManagerOverview = ({
    name,
    pendingCount,
    submittedTasksCount,
    activeEmployees,
    myTasks,
    setActiveTab,
    createTask,
    title,
    setTitle,
    description,
    setDescription,
    assignedTo,
    setAssignedTo,
    dueDate,
    setDueDate,
    getStatusBadge
}) => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left */}
            <div className="lg:col-span-2 space-y-6">

                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-md">

                    <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Manager Suite
                    </span>

                    <h2 className="text-xl font-bold mt-2">
                        Welcome Back {name}
                    </h2>

                    <p className="text-xs text-emerald-100 mt-1 max-w-lg">
                        You have{" "}
                        <strong className="text-white font-bold">
                            {pendingCount} team requests
                        </strong>{" "}
                        pending approval and{" "}
                        <strong className="text-white font-bold">
                            {submittedTasksCount} task submissions
                        </strong>{" "}
                        waiting for your evaluation.
                    </p>

                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                    <div
                        onClick={() => setActiveTab("employees")}
                        className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all cursor-pointer"
                    >
                        <div className="p-2 bg-emerald-50 text-emerald-600 w-fit rounded-lg mb-2">
                            <UserCheck className="h-4 w-4" />
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {activeEmployees.length}
                        </p>

                        <p className="text-xs font-medium text-slate-500">
                            Active Direct Reports
                        </p>
                    </div>

                    <div
                        onClick={() => setActiveTab("employees")}
                        className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-amber-500 transition-all cursor-pointer"
                    >
                        <div className="p-2 bg-amber-50 text-amber-600 w-fit rounded-lg mb-2">
                            <Clock className="h-4 w-4" />
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {pendingCount}
                        </p>

                        <p className="text-xs font-medium text-slate-500">
                            Pending Approvals
                        </p>
                    </div>

                    <div
                        onClick={() => setActiveTab("tasks")}
                        className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-500 transition-all cursor-pointer col-span-2 sm:col-span-1"
                    >
                        <div className="p-2 bg-blue-50 text-blue-600 w-fit rounded-lg mb-2">
                            <CheckSquare className="h-4 w-4" />
                        </div>

                        <p className="text-2xl font-bold text-slate-900">
                            {submittedTasksCount}
                        </p>

                        <p className="text-xs font-medium text-slate-500">
                            Submissions To Review
                        </p>
                    </div>

                </div>

                {/* Recent Tasks */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">

                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">

                        <h3 className="font-bold text-slate-900 text-sm">
                            Recent Task Submissions
                        </h3>

                        <button
                            onClick={() => setActiveTab("tasks")}
                            className="text-xs text-emerald-600 font-semibold hover:underline flex items-center"
                        >
                            View Board
                            <ChevronRight className="h-3 w-3 ml-0.5" />
                        </button>

                    </div>

                    {myTasks.length === 0 ? (

                        <p className="text-xs text-slate-400 py-6 text-center">
                            No tasks assigned yet.
                        </p>

                    ) : (

                        <div className="space-y-3">

                            {myTasks.slice(0, 3).map((task) => (

                                <div
                                    key={task._id}
                                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between"
                                >

                                    <div>
                                        <p className="text-xs font-bold text-slate-900">
                                            {task.title}
                                        </p>

                                        <p className="text-[11px] text-slate-500">
                                            Assigned: {task.assignedTo?.name}
                                        </p>
                                    </div>

                                    <div>
                                        {getStatusBadge(task.status)}
                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

            {/* Quick Create */}
            <div className="space-y-6">

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">

                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">

                        <Plus className="h-4 w-4 text-emerald-600" />

                        <h3 className="font-bold text-slate-900 text-sm">
                            Quick Assign Task
                        </h3>

                    </div>

                    <form
                        onSubmit={createTask}
                        className="space-y-3 text-xs"
                    >

                        <input
                            type="text"
                            placeholder="Task Summary"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500"
                        />

                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500"
                        >
                            <option value="">
                                Select Employee
                            </option>

                            {activeEmployees.map((employee) => (
                                <option
                                    key={employee._id}
                                    value={employee._id}
                                >
                                    {employee.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500"
                        />

                        <textarea
                            placeholder="Brief work scope..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500 h-16"
                        />

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-xs shadow-xs transition-colors"
                        >
                            Create & Assign Task
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default ManagerOverview;