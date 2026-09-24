import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeHeader from "../components/employee/EmployeeHeader";
import EmployeeTaskList from "../components/employee/EmployeeTaskList";
import SubmitTaskModal from "../components/employee/SubmitTaskModal";

const EmployeeDashboard = () => {

    const navigate = useNavigate();


    // -------------------------
    // Backend State
    // -------------------------

    const [myTasks, setMyTasks] = useState([]);

    const [response, setResponse] = useState("");

    const [selectedTaskForModal, setSelectedTaskForModal] =
        useState(null);


    // -------------------------
    // Navigation State
    // -------------------------

    const [activeTab, setActiveTab] =
        useState("active");

    const [searchTerm, setSearchTerm] =
        useState("");


    // -------------------------
    // Logout
    // -------------------------

    const logout = () => {

        localStorage.removeItem("token");

        toast.success("Logged out successfully");

        navigate("/");
    };


    // -------------------------
    // Fetch Tasks
    // -------------------------

    const getMyTasks = async () => {

        try {

            const res = await api.get(
                "/api/employee/tasks"
            );

            setMyTasks(
                res.data.tasks || []
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch tasks"
            );

        }
    };


    // -------------------------
    // Update Task Status
    // -------------------------

    const updateTaskStatus = async (taskId) => {

        try {

            const task = myTasks.find(
                (t) => t._id === taskId
            );

            if (!task) return;


            let result;


            // assigned -> in-progress
            if (task.status === "assigned") {

                result = await api.patch(
                    `/api/employee/tasks/${taskId}/status`
                );

            }


            // in-progress / changes-required -> submitted
            if (
                task.status === "in-progress" ||
                task.status === "changes-required"
            ) {

                if (!response.trim()) {

                    toast.error(
                        "Please enter your response"
                    );

                    return;
                }

                result = await api.patch(
                    `/api/employee/tasks/${taskId}/status`,
                    {
                        response
                    }
                );

            }


            toast.success(
                result?.data?.message ||
                "Task status updated"
            );


            // Update local state
            setMyTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t._id === taskId
                        ? {
                            ...t,

                            status:
                                t.status === "assigned"
                                    ? "in-progress"
                                    : "submitted",

                            response:
                                t.status === "in-progress" ||
                                t.status === "changes-required"
                                    ? response
                                    : t.response
                        }
                        : t
                )
            );


            // Close modal
            if (
                task.status === "in-progress" ||
                task.status === "changes-required"
            ) {

                setResponse("");

                setSelectedTaskForModal(null);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update task"
            );

        }
    };


    // -------------------------
    // Open Submit Modal
    // -------------------------

    const openSubmitModal = (task) => {

        setSelectedTaskForModal(task._id);

        setResponse(task.response || "");

    };


    // -------------------------
    // Close Submit Modal
    // -------------------------

    const closeSubmitModal = () => {

        setSelectedTaskForModal(null);

        setResponse("");

    };


    // -------------------------
    // Initial Fetch
    // -------------------------

    useEffect(() => {

        getMyTasks();

    }, []);


    // -------------------------
    // Filter Tasks
    // -------------------------

    const getFilteredTasks = () => {

        return myTasks.filter((task) => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||

                task.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());


            if (!matchesSearch) {
                return false;
            }


            if (activeTab === "active") {

                return (
                    task.status === "assigned" ||
                    task.status === "in-progress"
                );

            }


            if (activeTab === "review") {

                return task.status === "submitted";

            }


            if (activeTab === "revision") {

                return task.status === "changes-required";

            }


            if (activeTab === "completed") {

                return task.status === "reviewed";

            }


            return true;

        });

    };


    // -------------------------
    // Counts
    // -------------------------

    const activeCount =
        myTasks.filter(
            (task) =>
                task.status === "assigned" ||
                task.status === "in-progress"
        ).length;


    const reviewCount =
        myTasks.filter(
            (task) =>
                task.status === "submitted"
        ).length;


    const revisionCount =
        myTasks.filter(
            (task) =>
                task.status === "changes-required"
        ).length;


    const completedCount =
        myTasks.filter(
            (task) =>
                task.status === "reviewed"
        ).length;


    // -------------------------
    // Status Badge
    // -------------------------

    const getStatusBadge = (status) => {

        switch (status) {

            case "assigned":

                return (
                    <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-slate-200">
                        Assigned
                    </span>
                );


            case "in-progress":

                return (
                    <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-200">
                        In Progress
                    </span>
                );


            case "submitted":

                return (
                    <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-amber-200">
                        Under Review
                    </span>
                );


            case "changes-required":

                return (
                    <span className="bg-rose-50 text-rose-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-rose-200">
                        Needs Revision
                    </span>
                );


            case "reviewed":

                return (
                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                        Approved
                    </span>
                );


            default:

                return (
                    <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {status}
                    </span>
                );

        }

    };


    const currentSectionTasks =
        getFilteredTasks();


    return (

        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">


            {/* Sidebar */}

            <EmployeeSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                activeCount={activeCount}
                reviewCount={reviewCount}
                revisionCount={revisionCount}
                completedCount={completedCount}
                totalTasks={myTasks.length}
                logout={logout}
            />


            {/* Main Content */}

            <main className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl">


                <EmployeeHeader
                    activeTab={activeTab}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />


                <EmployeeTaskList
                    tasks={currentSectionTasks}
                    getStatusBadge={getStatusBadge}
                    updateTaskStatus={updateTaskStatus}
                    openSubmitModal={openSubmitModal}
                />


            </main>


            {/* Submit Modal */}

            {selectedTaskForModal && (

                <SubmitTaskModal
                    response={response}
                    setResponse={setResponse}
                    closeModal={closeSubmitModal}
                    submitTask={() =>
                        updateTaskStatus(
                            selectedTaskForModal
                        )
                    }
                />

            )}

        </div>
    );
};

export default EmployeeDashboard;