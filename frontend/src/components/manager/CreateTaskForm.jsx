import React from "react";

const CreateTaskForm = ({
    createTask,
    title,
    setTitle,
    description,
    setDescription,
    assignedTo,
    setAssignedTo,
    dueDate,
    setDueDate,
    activeEmployees
}) => {

    return (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">

            <div className="border-b border-slate-100 pb-3">

                <h2 className="text-base font-bold text-slate-900">
                    Create New Task
                </h2>

                <p className="text-xs text-slate-500">
                    Formulate and dispatch work orders to your active team members.
                </p>

            </div>

            <form
                onSubmit={createTask}
                className="space-y-4 text-xs"
            >

                <div>

                    <label className="block font-semibold text-slate-700 mb-1">
                        Task Title
                    </label>

                    <input
                        type="text"
                        placeholder="Task Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500"
                    />

                </div>

                <div>

                    <label className="block font-semibold text-slate-700 mb-1">
                        Task Description
                    </label>

                    <textarea
                        placeholder="Detailed instructions..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 h-28"
                    />

                </div>

                <div className="grid grid-cols-2 gap-3">

                    <div>

                        <label className="block font-semibold text-slate-700 mb-1">
                            Assign Employee
                        </label>

                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                        >

                            <option value="">
                                Select direct report
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

                    </div>

                    <div>

                        <label className="block font-semibold text-slate-700 mb-1">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-xs shadow-xs transition-colors mt-2"
                >
                    Publish & Dispatch Task
                </button>

            </form>

        </div>
    );
};

export default CreateTaskForm;