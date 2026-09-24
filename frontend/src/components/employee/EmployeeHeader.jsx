import React from "react";
import { Search } from "lucide-react";

const EmployeeHeader = ({
    activeTab,
    searchTerm,
    setSearchTerm
}) => {

    const sectionInfo = {
        active: {
            title: "To Do / Active Tasks",
            description: "Tasks currently assigned or in progress"
        },
        review: {
            title: "Tasks Under Review",
            description: "Tasks submitted and waiting for manager review"
        },
        revision: {
            title: "Tasks Needing Revision",
            description: "Tasks returned by manager requiring changes"
        },
        completed: {
            title: "Completed Tasks",
            description: "Approved tasks marked as finalized"
        },
        all: {
            title: "All Assigned Tasks",
            description: "Complete record of all your assigned deliverables"
        }
    };

    const currentSection = sectionInfo[activeTab];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">

            <div>

                <h2 className="text-xl font-bold text-slate-900">
                    {currentSection.title}
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                    {currentSection.description}
                </p>

            </div>


            {/* Search */}
            <div className="relative w-full sm:w-64">

                <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500 transition-all shadow-xs"
                />

            </div>

        </div>
    );
};

export default EmployeeHeader;