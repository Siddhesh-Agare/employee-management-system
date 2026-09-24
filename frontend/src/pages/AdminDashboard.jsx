import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../services/api.js";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import OverviewTab from "../components/admin/OverviewTab";
import PendingEmployees from "../components/admin/PendingEmployees";
import ManagerSection from "../components/admin/ManagerSection";
import AssignmentSection from "../components/admin/AssignmentSection";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");

  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  const [showManagers, setShowManagers] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);

  const [managerSearch, setManagerSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");


  // Logout

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };


  // API Calls

  const getPendingEmployees = async () => {
    try {

      const response = await api.get(
        "/api/admin/employee/pending"
      );

      setPendingEmployees(
        response.data.pendingEmployees || []
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch pending employees"
      );

    }
  };


  const getManagers = async () => {
    try {

      const response = await api.get(
        "/api/admin/manager"
      );

      setManagers(
        response.data.managers || []
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch managers"
      );

    }
  };


  const getActiveAndPendingEmployees = async () => {
    try {

      const response = await api.get(
        "/api/admin/employee/active"
      );

      setActiveEmployees(
        response.data.employees || []
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch active employees"
      );

    }
  };


  const getAssignedEmployees = async () => {
    try {

      const response = await api.get(
        "/api/admin/employee/assigned"
      );

      setAssignedEmployees(
        response.data.employees || []
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch assigned employees"
      );

    }
  };


  useEffect(() => {

    getPendingEmployees();
    getManagers();
    getActiveAndPendingEmployees();
    getAssignedEmployees();

  }, []);


  // Employee Actions
  const approveEmployee = async (id) => {

    try {

      const response = await api.patch(
        `/api/admin/employee/${id}/approve`
      );

      toast.success(response.data.message);

      setPendingEmployees((employees) =>
        employees.filter((emp) => emp._id !== id)
      );

      getActiveAndPendingEmployees();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    }
  };


  const rejectEmployee = async (id) => {

    try {

      const response = await api.patch(
        `/api/admin/employee/${id}/reject`
      );

      toast.success(response.data.message);

      setPendingEmployees((employees) =>
        employees.filter((emp) => emp._id !== id)
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    }
  };


  // Manager Creation

  const createManager = async (e) => {

    e.preventDefault();

    if (
      !managerName.trim() ||
      !managerEmail.trim() ||
      !managerPassword.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!managerEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (managerPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {

      const response = await api.post(
        "/api/admin/manager/create",
        {
          name: managerName,
          email: managerEmail,
          password: managerPassword,
        }
      );

      toast.success(
        response.data.message ||
        "Manager created successfully"
      );

      setManagerName("");
      setManagerEmail("");
      setManagerPassword("");

      getManagers();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    }
  };


  // Employee Assignment

  const assignEmployee = async () => {

    if (!selectedEmployee || !selectedManager) {

      toast.error(
        "Please select both an employee and a manager"
      );

      return;
    }

    try {

      const response = await api.patch(
        `/api/admin/manager/${selectedManager}/employee/${selectedEmployee}`
      );

      toast.success(response.data.message);

      const employee = activeEmployees.find(
        (emp) => emp._id === selectedEmployee
      );

      const updatedEmployee = {
        ...employee,
        manager: selectedManager,
      };

      setActiveEmployees((employees) =>
        employees.filter(
          (emp) => emp._id !== selectedEmployee
        )
      );

      setAssignedEmployees((employees) => [
        ...employees,
        updatedEmployee,
      ]);

      setSelectedEmployee("");
      setSelectedManager("");
      setManagerSearch("");
      setEmployeeSearch("");

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    }
  };


  // Render

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">

      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingEmployees.length}
        unassignedCount={activeEmployees.length}
        logout={logout}
      />


      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        <AdminHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logout={logout}
        />


        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">

          {activeTab === "overview" && (
            <OverviewTab
              pendingCount={pendingEmployees.length}
              managerCount={managers.length}
              unassignedCount={activeEmployees.length}
              assignedCount={assignedEmployees.length}
              setActiveTab={setActiveTab}
            />
          )}


          {activeTab === "pending" && (
            <PendingEmployees
              employees={pendingEmployees}
              approveEmployee={approveEmployee}
              rejectEmployee={rejectEmployee}
            />
          )}


          {activeTab === "managers" && (
            <ManagerSection
              managers={managers}
              managerName={managerName}
              managerEmail={managerEmail}
              managerPassword={managerPassword}
              setManagerName={setManagerName}
              setManagerEmail={setManagerEmail}
              setManagerPassword={setManagerPassword}
              createManager={createManager}
            />
          )}


          {activeTab === "assign" && (
            <AssignmentSection
              activeEmployees={activeEmployees}
              assignedEmployees={assignedEmployees}
              managers={managers}

              selectedEmployee={selectedEmployee}
              selectedManager={selectedManager}

              employeeSearch={employeeSearch}
              managerSearch={managerSearch}

              showEmployees={showEmployees}
              showManagers={showManagers}

              setSelectedEmployee={setSelectedEmployee}
              setSelectedManager={setSelectedManager}

              setEmployeeSearch={setEmployeeSearch}
              setManagerSearch={setManagerSearch}

              setShowEmployees={setShowEmployees}
              setShowManagers={setShowManagers}

              assignEmployee={assignEmployee}
            />
          )}

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;