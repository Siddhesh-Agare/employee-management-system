import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard.jsx';
import ManagerDashboard from './ManagerDashboard.jsx';
import EmployeeDashboard from './EmployeeDashboard.jsx';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const getUserData = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await api.get('/api/user/me');
      setUser(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to authenticate user');
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  // 1. Loading State Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center space-y-4 p-4 text-white font-sans">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-slate-200">Loading your workspace...</p>
          <p className="text-xs text-slate-400">Verifying authentication & profile details</p>
        </div>
      </div>
    );
  }

  // 2. Authentication Error State Screen
  if (hasError || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Session Expired or Unauthorized</h2>
            <p className="text-xs text-slate-400 mt-1">
              Unable to load user profile. Please log in again to access the dashboard.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
          >
            <LogOut className="h-4 w-4" />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. Render Dashboard based on Role
  return (
    <>
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : user.role === 'manager' ? (
        <ManagerDashboard name={user.name} />
      ) : (
        <EmployeeDashboard />
      )}
    </>
  );
};

export default Dashboard;