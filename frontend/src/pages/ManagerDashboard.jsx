import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../services/api.js';
import {
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  Clock,
  LogOut,
  CheckSquare,
  AlertCircle,
  MessageSquare,
  Calendar,
  UserCheck,
  LayoutGrid,
  FileText,
  User,
  ChevronRight,
  Filter,
  Send
} from 'lucide-react';

const ManagerDashboard = (props) => {
  const navigate = useNavigate();

  // Navigation state
  const [activeTab, setActiveTab] = useState('overview');

  // Data States
  const [myEmployees, setMyEmployees] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  // Task Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Feedback State
  const [feedback, setFeedback] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getMyEmployees = async () => {
    try {
      const response = await api.get('/api/manager/employee');
      setMyEmployees(response.data.myEmployees || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch employees');
    }
  };

  const getMyTasks = async () => {
    try {
      const response = await api.get('/api/manager/tasks');
      setMyTasks(response.data.tasks || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  const createTask = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim() || !description.trim() || !assignedTo || !dueDate) {
      toast.error('Please fill in all task fields');
      return;
    }

    try {
      const response = await api.post('/api/manager/tasks/create', {
        title,
        description,
        assignedTo,
        dueDate
      });

      setTitle('');
      setDescription('');
      setAssignedTo('');
      setDueDate('');
      toast.success(response.data.message || 'Task created successfully');

      setMyTasks((tasks) => [...tasks, response.data.task]);
      setActiveTab('tasks');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const approveMyEmployee = async (empId) => {
    try {
      const response = await api.patch(`/api/manager/employee/${empId}/approve`);
      toast.success(response.data.message);

      setMyEmployees((employees) =>
        employees.map((employee) =>
          employee._id === empId ? { ...employee, status: 'active' } : employee
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const rejectMyEmployee = async (empId) => {
    try {
      const response = await api.patch(`/api/manager/employee/${empId}/reject`);
      toast.success(response.data.message);

      setMyEmployees((employees) =>
        employees.map((employee) =>
          employee._id === empId ? { ...employee, status: 'rejected' } : employee
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const reviewTask = async (taskId) => {
    try {
      const response = await api.patch(`/api/manager/tasks/${taskId}/review`);
      toast.success(response.data.message);

      setMyTasks((tasks) =>
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: 'reviewed' } : task
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const changeRequired = async (taskId) => {
    try {
      if (!feedback.trim()) {
        toast.error('Please enter feedback');
        return;
      }

      const response = await api.patch(`/api/manager/tasks/${taskId}/changes-required`, {
        feedback
      });
      toast.success(response.data.message);

      setMyTasks((tasks) =>
        tasks.map((task) =>
          task._id === taskId
            ? { ...task, status: 'changes-required', feedback }
            : task
        )
      );

      setFeedback('');
      setSelectedTask(null);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getMyEmployees();
    getMyTasks();
  }, []);

  const pendingCount = myEmployees.filter((e) => e.status === 'pending').length;
  const submittedTasksCount = myTasks.filter((t) => t.status === 'submitted').length;
  const activeEmployees = myEmployees.filter((e) => e.status === 'active');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <span className="bg-amber-50 text-amber-700 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-amber-200">Awaiting Review</span>;
      case 'reviewed':
        return <span className="bg-emerald-50 text-emerald-700 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-emerald-200">Approved</span>;
      case 'changes-required':
        return <span className="bg-rose-50 text-rose-700 text-[11px] px-2.5 py-1 rounded-full font-semibold border border-rose-200">Changes Needed</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-full font-medium border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-emerald-900/5 text-slate-800 font-sans pb-12">
      
      {/* Manager Top Navbar Workspace */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-base leading-tight">Team Portal</h1>
                <p className="text-[11px] text-slate-500 font-medium">Manager Operations Hub</p>
              </div>
            </div>

            {/* Desktop Navigation Pills */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              
              <button
                onClick={() => setActiveTab('employees')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'employees'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'tasks'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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

            {/* Actions & Profile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('create-task')}
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
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex border-t border-slate-100 bg-slate-50 px-4 overflow-x-auto">
          {['overview', 'employees', 'create-task', 'tasks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2.5 px-3 text-xs font-semibold capitalize whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500'
              }`}
            >
              {tab === 'create-task' ? '+ New Task' : tab === 'employees' ? 'My Team' : tab}
            </button>
          ))}
        </div>
      </header>

      {/* Main Page Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Columns: Activity Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Manager Suite
                  </span>
                  <h2 className="text-xl font-bold mt-2">Welcome Back {props.name}</h2>
                  <p className="text-xs text-emerald-100 mt-1 max-w-lg">
                    You have <strong className="text-white font-bold">{pendingCount} team requests</strong> pending approval and <strong className="text-white font-bold">{submittedTasksCount} task submissions</strong> waiting for your evaluation.
                  </p>
                </div>
              </div>

              {/* Status Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div 
                  onClick={() => setActiveTab('employees')}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-all cursor-pointer"
                >
                  <div className="p-2 bg-emerald-50 text-emerald-600 w-fit rounded-lg mb-2">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{activeEmployees.length}</p>
                  <p className="text-xs font-medium text-slate-500">Active Direct Reports</p>
                </div>

                <div 
                  onClick={() => setActiveTab('employees')}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-amber-500 transition-all cursor-pointer"
                >
                  <div className="p-2 bg-amber-50 text-amber-600 w-fit rounded-lg mb-2">
                    <Clock className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
                  <p className="text-xs font-medium text-slate-500">Pending Approvals</p>
                </div>

                <div 
                  onClick={() => setActiveTab('tasks')}
                  className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-500 transition-all cursor-pointer col-span-2 sm:col-span-1"
                >
                  <div className="p-2 bg-blue-50 text-blue-600 w-fit rounded-lg mb-2">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{submittedTasksCount}</p>
                  <p className="text-xs font-medium text-slate-500">Submissions To Review</p>
                </div>
              </div>

              {/* Recent Tasks List */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Task Submissions</h3>
                  <button onClick={() => setActiveTab('tasks')} className="text-xs text-emerald-600 font-semibold hover:underline flex items-center">
                    View Board <ChevronRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                {myTasks.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No tasks assigned yet.</p>
                ) : (
                  <div className="space-y-3">
                    {myTasks.slice(0, 3).map((task) => (
                      <div key={task._id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{task.title}</p>
                          <p className="text-[11px] text-slate-500">Assigned: {task.assignedTo?.name}</p>
                        </div>
                        <div>{getStatusBadge(task.status)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Quick Create Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <Plus className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Quick Assign Task</h3>
                </div>

                <form onSubmit={createTask} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Task Summary"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Assignee</label>
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Select Employee</option>
                      {activeEmployees.map((e) => (
                        <option key={e._id} value={e._id}>{e.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Description</label>
                    <textarea
                      placeholder="Brief work scope..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-emerald-500 h-16"
                    />
                  </div>

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
        )}

        {/* TAB 2: MY EMPLOYEES GRID VIEW */}
        {activeTab === 'employees' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Team Roster</h2>
                <p className="text-xs text-slate-500">Direct reports assigned under your management.</p>
              </div>
              <span className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold shadow-xs">
                {myEmployees.length} Total Employees
              </span>
            </div>

            {myEmployees.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
                <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-700">No Direct Reports Yet</p>
                <p className="text-xs text-slate-400 mt-1">Wait for your Admin to assign team members to your account.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myEmployees.map((emp) => (
                  <div key={emp._id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                          <p className="text-xs text-slate-500">{emp.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold capitalize ${
                        emp.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : emp.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {emp.status}
                      </span>

                      {emp.status === 'pending' && (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => approveMyEmployee(emp._id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectMyEmployee(emp._id)}
                            className="bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs px-2 py-1 rounded-lg font-semibold transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DEDICATED CREATE TASK PAGE */}
        {activeTab === 'create-task' && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Create New Task</h2>
              <p className="text-xs text-slate-500">Formulate and dispatch work orders to your active team members.</p>
            </div>

            <form onSubmit={createTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="Task Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Description</label>
                <textarea
                  placeholder="Detailed instructions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 h-28"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Employee</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select direct report</option>
                    {activeEmployees.map((e) => (
                      <option key={e._id} value={e._id}>{e.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
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
        )}

        {/* TAB 4: TASK BOARD */}
        {activeTab === 'tasks' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Task Deliverables Board</h2>
                <p className="text-xs text-slate-500">Track task status and perform code/work reviews.</p>
              </div>
              <span className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold shadow-xs">
                {myTasks.length} Assigned Tasks
              </span>
            </div>

            {myTasks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
                <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-700">No Tasks Created</p>
                <p className="text-xs text-slate-400 mt-1">Assign work tasks using the 'New Task' button above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myTasks.map((task) => (
                  <div key={task._id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug">{task.title}</h3>
                        {getStatusBadge(task.status)}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{task.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          <User className="h-3.5 w-3.5 text-emerald-600" /> {task.assignedTo?.name || 'Unassigned'}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {new Date(task.dueDate).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Employee submission message */}
                      {task.response && (
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 text-xs">
                          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5">Submission Note</p>
                          <p className="text-slate-700 italic">"{task.response}"</p>
                        </div>
                      )}

                      {/* Feedback message */}
                      {task.feedback && (
                        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-2.5 text-xs">
                          <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider mb-0.5">Your Review Feedback</p>
                          <p className="text-slate-700 italic">"{task.feedback}"</p>
                        </div>
                      )}

                      {/* Action buttons */}
                      {task.status === 'submitted' && (
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => reviewTask(task._id)}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve Task
                          </button>
                          <button
                            onClick={() => setSelectedTask(task._id)}
                            className="flex-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject / Request Changes
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* FEEDBACK BACKDROP MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in duration-150">
            <div>
              <h3 className="text-base font-bold text-slate-900">Request Revisions</h3>
              <p className="text-xs text-slate-500">Provide feedback on what needs modification before approval.</p>
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter details on required fixes..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-rose-400 h-28"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => changeRequired(selectedTask)}
                className="flex items-center gap-1 px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700"
              >
                <Send className="h-3.5 w-3.5" /> Send Back
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManagerDashboard;