import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  CheckCircle2,
  Clock,
  PlayCircle,
  Send,
  AlertCircle,
  LogOut,
  Calendar,
  MessageSquare,
  FileCheck,
  Search,
  X,
  LayoutDashboard,
  CheckSquare,
  Hourglass,
  RotateCcw,
  Sparkles
} from 'lucide-react';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  // Backend state
  const [myTasks, setMyTasks] = useState([]);
  const [response, setResponse] = useState('');
  const [selectedTaskForModal, setSelectedTaskForModal] = useState(null);

  // Active navigation section
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'review' | 'revision' | 'completed' | 'all'
  const [searchTerm, setSearchTerm] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Fetch tasks directly from API
  const getMyTasks = async () => {
    try {
      const res = await api.get('/api/employee/tasks');
      setMyTasks(res.data.tasks || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  // Task status update function (Fixed for changes-required)
  const updateTaskStatus = async (taskId) => {
    try {
      const task = myTasks.find((t) => t._id === taskId);
      if (!task) return;

      let result;

      // START TASK (assigned -> in-progress)
      if (task.status === 'assigned') {
        result = await api.patch(`/api/employee/tasks/${taskId}/status`);
      }

      // SUBMIT OR RE-SUBMIT TASK (in-progress / changes-required -> submitted)
      if (task.status === 'in-progress' || task.status === 'changes-required') {
        if (!response.trim()) {
          toast.error('Please enter your response');
          return;
        }

        result = await api.patch(`/api/employee/tasks/${taskId}/status`, {
          response: response
        });
      }

      toast.success(result?.data?.message || 'Task status updated');

      // Update local state
      setMyTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === taskId
            ? {
                ...t,
                status: t.status === 'assigned' ? 'in-progress' : 'submitted',
                response:
                  t.status === 'in-progress' || t.status === 'changes-required'
                    ? response
                    : t.response
              }
            : t
        )
      );

      if (task.status === 'in-progress' || task.status === 'changes-required') {
        setResponse('');
        setSelectedTaskForModal(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  useEffect(() => {
    getMyTasks();
  }, []);

  // Filter tasks based on active section
  const getFilteredTasks = () => {
    return myTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === 'active') {
        return task.status === 'assigned' || task.status === 'in-progress';
      }
      if (activeTab === 'review') {
        return task.status === 'submitted';
      }
      if (activeTab === 'revision') {
        return task.status === 'changes-required';
      }
      if (activeTab === 'completed') {
        return task.status === 'reviewed';
      }
      return true; // 'all'
    });
  };

  // Section Counts
  const activeCount = myTasks.filter(
    (t) => t.status === 'assigned' || t.status === 'in-progress'
  ).length;
  const reviewCount = myTasks.filter((t) => t.status === 'submitted').length;
  const revisionCount = myTasks.filter((t) => t.status === 'changes-required').length;
  const completedCount = myTasks.filter((t) => t.status === 'reviewed').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'assigned':
        return (
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-slate-200">
            Assigned
          </span>
        );
      case 'in-progress':
        return (
          <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-200">
            In Progress
          </span>
        );
      case 'submitted':
        return (
          <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-amber-200">
            Under Review
          </span>
        );
      case 'changes-required':
        return (
          <span className="bg-rose-50 text-rose-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-rose-200">
            Needs Revision
          </span>
        );
      case 'reviewed':
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

  const currentSectionTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h1 className="font-bold text-sm leading-tight text-white">Employee Workspace</h1>
                <p className="text-[10px] text-slate-400">Task Management</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'active'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className="h-4 w-4" />
                <span>To Do Tasks</span>
              </div>
              {activeCount > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'active' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  {activeCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('review')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'review'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Hourglass className="h-4 w-4" />
                <span>Under Review</span>
              </div>
              {reviewCount > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'review' ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  {reviewCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('revision')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'revision'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <RotateCcw className="h-4 w-4" />
                <span>Needs Revision</span>
              </div>
              {revisionCount > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'revision' ? 'bg-rose-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  {revisionCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Completed Tasks</span>
              </div>
              {completedCount > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'completed' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  {completedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="h-4 w-4" />
                <span>All Tasks</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                {myTasks.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom User / Logout */}
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

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl">
        
        {/* Section Title & Search Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeTab === 'active' && 'To Do / Active Tasks'}
              {activeTab === 'review' && 'Tasks Under Review'}
              {activeTab === 'revision' && 'Tasks Needing Revision'}
              {activeTab === 'completed' && 'Completed Tasks'}
              {activeTab === 'all' && 'All Assigned Tasks'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === 'active' && 'Tasks currently assigned or in progress'}
              {activeTab === 'review' && 'Tasks submitted and waiting for manager review'}
              {activeTab === 'revision' && 'Tasks returned by manager requiring changes'}
              {activeTab === 'completed' && 'Approved tasks marked as finalized'}
              {activeTab === 'all' && 'Complete record of all your assigned deliverables'}
            </p>
          </div>

          {/* Search Bar */}
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

        {/* Task List Section */}
        {currentSectionTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FileCheck className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No Tasks in this Section</p>
            <p className="text-xs text-slate-400 mt-1">
              There are no tasks to display right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSectionTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Task Header */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{task.title}</h3>
                    {getStatusBadge(task.status)}
                  </div>

                  {/* Task Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">{task.description}</p>

                  {/* Due Date */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>
                      Due Date:{' '}
                      <strong className="text-slate-800">
                        {new Date(task.dueDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </strong>
                    </span>
                  </div>

                  {/* Manager Feedback */}
                  {task.feedback && (
                    <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-xs space-y-1">
                      <p className="font-bold text-[10px] uppercase tracking-wider text-rose-800 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5 text-rose-600" /> Manager Feedback:
                      </p>
                      <p className="text-slate-700 italic">"{task.feedback}"</p>
                    </div>
                  )}

                  {/* Submitted Notes */}
                  {task.response && (
                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 text-xs space-y-1">
                      <p className="font-bold text-[10px] uppercase tracking-wider text-indigo-800 flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-indigo-600" /> Submitted Response:
                      </p>
                      <p className="text-slate-700 italic">"{task.response}"</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {task.status === 'assigned' && (
                    <button
                      onClick={() => updateTaskStatus(task._id)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <PlayCircle className="h-4 w-4" /> Start Task
                    </button>
                  )}

                  {(task.status === 'in-progress' || task.status === 'changes-required') && (
                    <button
                      onClick={() => {
                        setSelectedTaskForModal(task._id);
                        setResponse(task.response || '');
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {task.status === 'changes-required' ? 'Re-submit Task' : 'Submit Task Response'}
                    </button>
                  )}

                  {task.status === 'submitted' && (
                    <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg w-full text-center font-medium">
                      Awaiting Manager Review
                    </span>
                  )}

                  {task.status === 'reviewed' && (
                    <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg w-full text-center font-medium flex items-center justify-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* WORK SUBMISSION MODAL */}
      {selectedTaskForModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Submit Work Outcome</h3>
                <p className="text-xs text-slate-500">Provide details or link deliverables for your manager.</p>
              </div>
              <button
                onClick={() => setSelectedTaskForModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Enter details about your work completion or changes..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 h-32"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTaskForModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => updateTaskStatus(selectedTaskForModal)}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-xs"
              >
                <Send className="h-3.5 w-3.5" /> Submit Response
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeDashboard;