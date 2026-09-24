import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../services/api.js";

import ManagerHeader from "../components/manager/ManagerHeader";
import ManagerOverview from "../components/manager/ManagerOverview";
import ManagerEmployees from "../components/manager/ManagerEmployees";
import CreateTaskForm from "../components/manager/CreateTaskForm";
import ManagerTaskBoard from "../components/manager/ManagerTaskBoard";
import FeedbackModal from "../components/manager/FeedbackModal";

const ManagerDashboard = (props) => {

    const navigate = useNavigate();

    // Navigation
    const [activeTab, setActiveTab] = useState("overview");

    // Data
    const [myEmployees, setMyEmployees] = useState([]);
    const [myTasks, setMyTasks] = useState([]);

    // Task form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Feedback
    const [feedback, setFeedback] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);


    // -------------------------
    // Logout
    // -------------------------

    const logout = () => {

        localStorage.removeItem("token");

        toast.success("Logged out successfully");

        navigate("/");
    };


    // -------------------------
    // Get Employees
    // -------------------------

    const getMyEmployees = async () => {

        try {

            const response = await api.get(
                "/api/manager/employee"
            );

            setMyEmployees(
                response.data.myEmployees || []
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch employees"
            );

        }
    };


    // -------------------------
    // Get Tasks
    // -------------------------

    const getMyTasks = async () => {

        try {

            const response = await api.get(
                "/api/manager/tasks"
            );

            setMyTasks(
                response.data.tasks || []
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch tasks"
            );

        }
    };


    // -------------------------
    // Create Task
    // -------------------------

    const createTask = async (e) => {

        if (e) {
            e.preventDefault();
        }

        if (
            !title.trim() ||
            !description.trim() ||
            !assignedTo ||
            !dueDate
        ) {

            toast.error(
                "Please fill in all task fields"
            );

            return;
        }

        try {

            const response = await api.post(
                "/api/manager/tasks/create",
                {
                    title,
                    description,
                    assignedTo,
                    dueDate
                }
            );

            setTitle("");
            setDescription("");
            setAssignedTo("");
            setDueDate("");

            toast.success(
                response.data.message ||
                "Task created successfully"
            );

            setMyTasks((tasks) => [
                ...tasks,
                response.data.task
            ]);

            setActiveTab("tasks");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create task"
            );

        }
    };


    // -------------------------
    // Approve Employee
    // -------------------------

    const approveMyEmployee = async (empId) => {

        try {

            const response = await api.patch(
                `/api/manager/employee/${empId}/approve`
            );

            toast.success(response.data.message);

            setMyEmployees((employees) =>
                employees.map((employee) =>
                    employee._id === empId
                        ? {
                            ...employee,
                            status: "active"
                        }
                        : employee
                )
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }
    };


    // -------------------------
    // Reject Employee
    // -------------------------

    const rejectMyEmployee = async (empId) => {

        try {

            const response = await api.patch(
                `/api/manager/employee/${empId}/reject`
            );

            toast.success(response.data.message);

            setMyEmployees((employees) =>
                employees.map((employee) =>
                    employee._id === empId
                        ? {
                            ...employee,
                            status: "rejected"
                        }
                        : employee
                )
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }
    };


    // -------------------------
    // Review Task
    // -------------------------

    const reviewTask = async (taskId) => {

        try {

            const response = await api.patch(
                `/api/manager/tasks/${taskId}/review`
            );

            toast.success(response.data.message);

            setMyTasks((tasks) =>
                tasks.map((task) =>
                    task._id === taskId
                        ? {
                            ...task,
                            status: "reviewed"
                        }
                        : task
                )
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }
    };


    // -------------------------
    // Request Changes
    // -------------------------

    const changeRequired = async (taskId) => {

        if (!feedback.trim()) {

            toast.error(
                "Please enter feedback"
            );

            return;
        }

        try {

            const response = await api.patch(
                `/api/manager/tasks/${taskId}/changes-required`,
                {
                    feedback
                }
            );

            toast.success(
                response.data.message
            );

            setMyTasks((tasks) =>
                tasks.map((task) =>
                    task._id === taskId
                        ? {
                            ...task,
                            status: "changes-required",
                            feedback
                        }
                        : task
                )
            );

            setFeedback("");
            setSelectedTask(null);

        } catch (error) {

            toast.error(
                error.response?.data?.message
            );

        }
    };


    // -------------------------
    // Initial Data
    // -------------------------

    useEffect(() => {

        getMyEmployees();
        getMyTasks();

    }, []);


    // -------------------------
    // Derived Data
    // -------------------------

    const pendingCount =
        myEmployees.filter(
            (employee) =>
                employee.status === "pending"
        ).length;


    const submittedTasksCount =
        myTasks.filter(
            (task) =>
                task.status === "submitted"
        ).length;


    const activeEmployees =
        myEmployees.filter(
            (employee) =>
                employee.status === "active"
        );


    // -------------------------
    // Status Badge
    // -------------------------

    const getStatusBadge = (status) => {

        switch (status) {

            case "submitted":

                return (
                    <span className="bg-amber-50 text-amber-700 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                        Awaiting Review
                    </span>
                );

            case "reviewed":

                return (
                    <span className="bg-emerald-50 text-emerald-700 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                        Approved
                    </span>
                );

            case "changes-required":

                return (
                    <span className="bg-rose-50 text-rose-700 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-rose-200">
                        Changes Needed
                    </span>
                );

            default:

                return (
                    <span className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-full font-medium border border-slate-200">
                        {status}
                    </span>
                );
        }
    };


    return (

        <div className="min-h-screen bg-emerald-900/5 text-slate-800 font-sans pb-12">

            <ManagerHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pendingCount={pendingCount}
                submittedTasksCount={submittedTasksCount}
                logout={logout}
            />


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

                {activeTab === "overview" && (

                    <ManagerOverview
                        name={props.name}
                        pendingCount={pendingCount}
                        submittedTasksCount={submittedTasksCount}
                        activeEmployees={activeEmployees}
                        myTasks={myTasks}
                        setActiveTab={setActiveTab}
                        createTask={createTask}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        assignedTo={assignedTo}
                        setAssignedTo={setAssignedTo}
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        getStatusBadge={getStatusBadge}
                    />

                )}


                {activeTab === "employees" && (

                    <ManagerEmployees
                        myEmployees={myEmployees}
                        approveMyEmployee={approveMyEmployee}
                        rejectMyEmployee={rejectMyEmployee}
                    />

                )}


                {activeTab === "create-task" && (

                    <CreateTaskForm
                        createTask={createTask}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        assignedTo={assignedTo}
                        setAssignedTo={setAssignedTo}
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        activeEmployees={activeEmployees}
                    />

                )}


                {activeTab === "tasks" && (

                    <ManagerTaskBoard
                        myTasks={myTasks}
                        getStatusBadge={getStatusBadge}
                        reviewTask={reviewTask}
                        setSelectedTask={setSelectedTask}
                    />

                )}

            </main>


            <FeedbackModal
                feedback={feedback}
                setFeedback={setFeedback}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                changeRequired={changeRequired}
            />

        </div>
    );
};

export default ManagerDashboard;