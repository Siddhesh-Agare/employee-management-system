import React from "react";
import { FileCheck } from "lucide-react";
import EmployeeTaskCard from "./EmployeeTaskCard";

const EmployeeTaskList = ({
    tasks,
    getStatusBadge,
    updateTaskStatus,
    openSubmitModal
}) => {

    if (tasks.length === 0) {

        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

                <FileCheck className="h-10 w-10 text-slate-300 mx-auto mb-3" />

                <p className="text-sm font-semibold text-slate-700">
                    No Tasks in this Section
                </p>

                <p className="text-xs text-slate-400 mt-1">
                    There are no tasks to display right now.
                </p>

            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {tasks.map((task) => (

                <EmployeeTaskCard
                    key={task._id}
                    task={task}
                    getStatusBadge={getStatusBadge}
                    updateTaskStatus={updateTaskStatus}
                    openSubmitModal={openSubmitModal}
                />

            ))}

        </div>
    );
};

export default EmployeeTaskList;