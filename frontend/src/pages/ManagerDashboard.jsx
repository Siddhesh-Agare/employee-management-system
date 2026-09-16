import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api.js';

const ManagerDashboard = () => {

  const navigate = useNavigate();
  const [myEmployees, setMyEmployees] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");


  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getMyEmployees = async()=>{
    try {

      const response = await api.get("/api/manager/employee");
      console.log(response.data.myEmployees);
      setMyEmployees(response.data.myEmployees)
      
      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    getMyEmployees();
  },[])

  const createTask = async()=>{
    try {

      const response = await api.post("/api/manager/tasks/create",{
        title,
        description,
        assignedTo,
        dueDate
      });

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setDueDate("");
      toast.success(response.data.message)
      
      
    } catch (error) {
      toast.error(error.response?.data?.message)
      
    }
  }

  const approveMyEmployee = async(empId)=>{
    try {

      const response = await api.patch(`/api/manager/employee/${empId}/approve`)
      toast.success(response.data.message)

      setMyEmployees((employees) =>
      employees.map((employee) =>
        employee._id === empId
          ? { ...employee, status: "active" }
          : employee
      )
    );
      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const rejectMyEmployee = async(empId)=>{
    try {

      const response = await api.patch(`/api/manager/employee/${empId}/reject`);
      toast.success(response.data.message)

      setMyEmployees((employees) =>
      employees.map((employee) =>
        employee._id === empId
          ? { ...employee, status: "active" }
          : employee
      )
    );
      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }

  }

  return (
   <div className="p-4 max-w-xl mx-auto font-sans space-y-4">
  
  {/* Header & Logout */}
  <div className="flex justify-between items-center border-b pb-2">
    <h2 className="text-lg font-bold">Manager Dashboard</h2>
    <button 
      onClick={logout} 
      className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>

  {/* Employees Section */}
  <div className="border p-3 rounded">
    <h3 className="font-semibold text-sm border-b pb-1 mb-2">My Employees</h3>

    <div className="space-y-2">
      {myEmployees.map((employee) => (
        <div key={employee._id} className="border p-2 rounded text-xs flex justify-between items-center">
          <div>
            <p className="font-bold">{employee.name}</p>
            <p className="text-gray-500">{employee.email}</p>
            <p className="text-gray-400">Status: {employee.status}</p>
          </div>

          {employee.status === "pending" && (
            <div className="space-x-1">
              <button 
                onClick={() => approveMyEmployee(employee._id)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Approve
              </button>

              <button 
                onClick={() => rejectMyEmployee(employee._id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Task Form */}
  <div className="border p-3 rounded space-y-2 text-xs">
    <h3 className="font-semibold text-sm border-b pb-1">Create Task</h3>

    <input
      type="text"
      placeholder="Task Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full border p-1.5 rounded"
    />

    <textarea
      placeholder="Task Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border p-1.5 rounded h-16"
    />

    <select
      value={assignedTo}
      onChange={(e) => setAssignedTo(e.target.value)}
      className="w-full border p-1.5 rounded bg-white"
    >
      <option value="">Select employee</option>
      {myEmployees
        .filter((employee) => employee.status === "active")
        .map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.name}
          </option>
        ))}
    </select>

    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="w-full border p-1.5 rounded"
    />

    <button 
      onClick={createTask}
      className="w-full bg-blue-600 text-white py-1.5 rounded font-medium"
    >
      Create task
    </button>
  </div>

</div>
  )
}

export default ManagerDashboard
