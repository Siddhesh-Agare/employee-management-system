import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../services/api.js';
import { 
  Users, 
  UserPlus, 
  Clock, 
  LogOut, 
  Search, 
  ShieldCheck, 
  Building, 
  Briefcase,
  CheckCircle2,
  XCircle,
  LayoutDashboard,
  UserCheck,
  ChevronRight,
  Mail,
  Lock,
  User,
  UserMinus
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigation state
  const [activeTab, setActiveTab] = useState('overview');

  // Data States
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  // Form & Dropdown States
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [showManagers, setShowManagers] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [managerSearch, setManagerSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getPendingEmployees = async () => {
    try {
      const response = await api.get("/api/admin/employee/pending");
      setPendingEmployees(response.data.pendingEmployees || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch pending employees");
    }
  };

  const getManagers = async () => {
    try {
      const response = await api.get("/api/admin/manager");
      setManagers(response.data.managers || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch managers");
    }
  };

  const getActiveAndPendingEmployees = async () => {
    try {
      const response = await api.get("/api/admin/employee/active");
      setActiveEmployees(response.data.employees || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch active employees");
    }
  };

  const getAssignedEmployees = async () => {
    try {
      const response = await api.get("/api/admin/employee/assigned");
      setAssignedEmployees(response.data.employees || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch assigned employees");
    }
  };

  useEffect(() => {
    getPendingEmployees();
    getManagers();
    getActiveAndPendingEmployees();
    getAssignedEmployees();
  }, []);

  const approveEmployee = async (id) => {
    try {
      const response = await api.patch(`/api/admin/employee/${id}/approve`);
      toast.success(response.data.message);
      setPendingEmployees((employees) => employees.filter((emp) => emp._id !== id));
      getActiveAndPendingEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const rejectEmployee = async (id) => {
    try {
      const response = await api.patch(`/api/admin/employee/${id}/reject`);
      toast.success(response.data.message);
      setPendingEmployees((employees) => employees.filter((emp) => emp._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const createManager = async (e) => {
    e.preventDefault();
    if (!managerName.trim() || !managerEmail.trim() || !managerPassword.trim()) {
      toast.error("All fields are required");
      return;
    }
    if (!managerEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (managerPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await api.post("/api/admin/manager/create", {
        name: managerName,
        email: managerEmail,
        password: managerPassword
      });

      toast.success(response.data.message || "Manager created successfully");
      setManagerName("");
      setManagerEmail("");
      setManagerPassword("");
      getManagers();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const assignEmployee = async () => {
    if (!selectedEmployee || !selectedManager) {
      toast.error("Please select both an employee and a manager");
      return;
    }

    try {
      const response = await api.patch(
        `/api/admin/manager/${selectedManager}/employee/${selectedEmployee}`
      );

      toast.success(response.data.message);

      const employee = activeEmployees.find((emp) => emp._id === selectedEmployee);
      const updatedEmployee = { ...employee, manager: selectedManager };

      setActiveEmployees((employees) => employees.filter((emp) => emp._id !== selectedEmployee));
      setAssignedEmployees((employees) => [...employees, updatedEmployee]);

      setSelectedEmployee("");
      setSelectedManager("");
      setManagerSearch("");
      setEmployeeSearch("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo / Brand Header */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 leading-tight">Workforce HR</h2>
              <p className="text-xs text-slate-500">Admin Control Center</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('pending')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'pending'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4" />
                <span>Pending Approvals</span>
              </div>
              {pendingEmployees.length > 0 && (
                <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {pendingEmployees.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('managers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'managers'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4" />
                <span>Managers Directory</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('assign')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'assign'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4" />
                <span>Team Assignments</span>
              </div>
              {activeEmployees.length > 0 && (
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {activeEmployees.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-900 truncate">Administrator</p>
                <p className="text-[10px] text-slate-500 truncate">admin@system.com</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-xs">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'pending' && 'Pending Approvals'}
              {activeTab === 'managers' && 'Manager Management'}
              {activeTab === 'assign' && 'Team & Employee Assignments'}
            </h1>
            <p className="text-xs text-slate-500">Manage organizational structure and access controls</p>
          </div>

          <button
            onClick={logout}
            className="md:hidden flex items-center gap-1.5 text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </header>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex border-b border-slate-200 bg-white px-4 overflow-x-auto space-x-2">
          {['overview', 'pending', 'managers', 'assign'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-3 text-xs font-medium capitalize whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500'
              }`}
            >
              {tab === 'assign' ? 'Team Assignments' : tab}
            </button>
          ))}
        </div>

        {/* Dynamic Body Content */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div 
                  onClick={() => setActiveTab('pending')}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Approvals</span>
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">{pendingEmployees.length}</span>
                    <span className="text-xs text-amber-600 font-medium flex items-center">
                      Requires action <ChevronRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('managers')}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Managers</span>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">{managers.length}</span>
                    <span className="text-xs text-blue-600 font-medium flex items-center">
                      View details <ChevronRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('assign')}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unassigned Employees</span>
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <UserMinus className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">{activeEmployees.length}</span>
                    <span className="text-xs text-emerald-600 font-medium flex items-center">
                      Assign now <ChevronRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Employees</span>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <UserCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-900">{assignedEmployees.length}</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg">System Management Tools</h3>
                  <p className="text-blue-100 text-xs mt-1">Approve registrations, onboard managers, and map organizational teams effortlessly.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActiveTab('managers')} 
                    className="bg-white text-blue-600 text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors shadow-xs"
                  >
                    + Create Manager
                  </button>
                  <button 
                    onClick={() => setActiveTab('assign')} 
                    className="bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Assign Employee
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PENDING EMPLOYEES */}
          {activeTab === 'pending' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Pending Employee Registrations</h2>
                  <p className="text-xs text-slate-500">Review and confirm employee account requests.</p>
                </div>
                <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-amber-200">
                  {pendingEmployees.length} Pending
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {pendingEmployees.length === 0 ? (
                  <div className="p-12 text-center">
                    <Clock className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-700">No Pending Requests</p>
                    <p className="text-xs text-slate-400 mt-1">All employee registration requests have been addressed.</p>
                  </div>
                ) : (
                  pendingEmployees.map((employee) => (
                    <div key={employee._id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{employee.name}</p>
                          <p className="text-xs text-slate-500">{employee.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approveEmployee(employee._id)}
                          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => rejectEmployee(employee._id)}
                          className="flex items-center gap-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MANAGERS */}
          {activeTab === 'managers' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form Column */}
              <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-xs h-fit">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Create Manager</h2>
                    <p className="text-xs text-slate-500">Register new management personnel.</p>
                  </div>
                </div>

                <form onSubmit={createManager} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                        placeholder="e.g. Michael Scott"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        value={managerEmail}
                        onChange={(e) => setManagerEmail(e.target.value)}
                        placeholder="m.scott@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        value={managerPassword}
                        onChange={(e) => setManagerPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-xs transition-colors mt-2"
                  >
                    Add Manager
                  </button>
                </form>
              </div>

              {/* List Column */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Managers Directory</h2>
                    <p className="text-xs text-slate-500">Currently active management accounts.</p>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                    {managers.length} Total
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {managers.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">No managers registered yet.</div>
                  ) : (
                    managers.map((manager) => (
                      <div key={manager._id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {manager.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{manager.name}</p>
                            <p className="text-xs text-slate-500">{manager.email}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md">
                          Manager
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: ASSIGN TEAMS & UNASSIGNED EMPLOYEES */}
          {activeTab === 'assign' && (
            <div className="space-y-6">
              
              {/* Assignment Form Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <div className="border-b border-slate-100 pb-3 mb-5">
                  <h2 className="text-base font-bold text-slate-900">Map Employee to Manager</h2>
                  <p className="text-xs text-slate-500">Assign unassigned workforce members to their supervisors.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select Employee */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Select Employee</label>
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={employeeSearch}
                          onChange={(e) => {
                            setEmployeeSearch(e.target.value);
                            setShowEmployees(true);
                          }}
                          onFocus={() => setShowEmployees(true)}
                          placeholder="Search active employee..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      {showEmployees && (
                        <div className="absolute left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 max-h-48 overflow-y-auto z-30 shadow-lg">
                          {activeEmployees
                            .filter((emp) => emp.name.toLowerCase().includes(employeeSearch.toLowerCase()))
                            .map((emp) => (
                              <div
                                key={emp._id}
                                onClick={() => {
                                  setSelectedEmployee(emp._id);
                                  setEmployeeSearch(emp.name);
                                  setShowEmployees(false);
                                }}
                                className="px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-none"
                              >
                                <p className="font-semibold text-slate-800">{emp.name}</p>
                                <p className="text-[10px] text-slate-400">{emp.email}</p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Select Manager */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Select Manager</label>
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={managerSearch}
                          onChange={(e) => {
                            setManagerSearch(e.target.value);
                            setShowManagers(true);
                          }}
                          onFocus={() => setShowManagers(true)}
                          placeholder="Search manager..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      {showManagers && (
                        <div className="absolute left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 max-h-48 overflow-y-auto z-30 shadow-lg">
                          {managers
                            .filter((m) => m.name.toLowerCase().includes(managerSearch.toLowerCase()))
                            .map((m) => (
                              <div
                                key={m._id}
                                onClick={() => {
                                  setSelectedManager(m._id);
                                  setManagerSearch(m.name);
                                  setShowManagers(false);
                                }}
                                className="px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-none"
                              >
                                <p className="font-semibold text-slate-800">{m.name}</p>
                                <p className="text-[10px] text-slate-400">{m.email}</p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={assignEmployee}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors shadow-xs"
                  >
                    Confirm Team Assignment
                  </button>
                </div>
              </div>

              {/* UNASSIGNED EMPLOYEES SECTION */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Unassigned Active Employees</h2>
                    <p className="text-xs text-slate-500">Active employees pending team manager assignment.</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-md font-semibold">
                    {activeEmployees.length} Unassigned
                  </span>
                </div>

                {activeEmployees.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    All active employees are currently assigned to a manager.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeEmployees.map((employee) => (
                      <div
                        key={employee._id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100/70 transition-all cursor-pointer group"
                        onClick={() => {
                          setSelectedEmployee(employee._id);
                          setEmployeeSearch(employee.name);
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {employee.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-900 truncate">{employee.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{employee.email}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                          Select
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Team Breakdown View */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-5">
                  <h2 className="text-base font-bold text-slate-900">Current Team Structures</h2>
                  <p className="text-xs text-slate-500">Grouped list of managers and their assigned reporting employees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {managers.map((manager) => {
                    const team = assignedEmployees.filter((emp) => emp.manager === manager._id);
                    return (
                      <div key={manager._id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{manager.name}</p>
                            <p className="text-[10px] text-slate-500">{manager.email}</p>
                          </div>
                          <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {team.length} Members
                          </span>
                        </div>

                        {team.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No assigned team members.</p>
                        ) : (
                          <ul className="space-y-1.5">
                            {team.map((emp) => (
                              <li key={emp._id} className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 flex justify-between items-center">
                                <span className="font-medium">{emp.name}</span>
                                <span className="text-[10px] text-slate-400">{emp.email}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;