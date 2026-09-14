import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api.js';

const ManagerDashboard = () => {

  const navigate = useNavigate();
  const [myEmployees, setMyEmployees] = useState([])


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
  
  <div className="flex justify-between items-center border-b pb-2">
    <h2 className="text-lg font-bold">Manager Dashboard</h2>
    <button 
      onClick={logout} 
      className="bg-red-500 text-white px-2 py-1 text-xs rounded"
    >
      Logout
    </button>
  </div>

  <div className="border p-3 rounded">
    <h3 className="font-semibold text-sm border-b pb-1 mb-2">My Employees</h3>
    
    <div className="space-y-2">
      {myEmployees.map((employee) => {
        return (
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
        );
      })}
    </div>
  </div>

</div>
  )
}

export default ManagerDashboard
