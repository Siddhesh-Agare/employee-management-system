import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react';
import { api } from '../services/api.js';



const AdminDashboard = () => {

  const navigate = useNavigate();
  const [pendingEmployees, setPendingEmployees] = useState([])
  const [activeEmployees, setActiveEmployees] = useState([])
  const [managers, setManagers] = useState([])
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  const logout = ()=>{
        localStorage.removeItem("token")
        toast.success("Logged out successfully");
        navigate("/");
    }

  const getPendingEmployees = async()=>{
    try {

      const response = await api.get("/api/admin/employee/pending");
      setPendingEmployees(response.data.pendingEmployees)
      
      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    getPendingEmployees()
  },[])

  const getManagers = async()=>{
    try {

      const response = await api.get("/api/admin/manager")
      setManagers(response.data.managers);
      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    getManagers();
  },[])

  const approveEmployee = async(id)=>{
    try {

      const response = await api.patch(`/api/admin/employee/${id}/approve`)
      toast.success(response.data.message)
      setPendingEmployees((employees) =>
            employees.filter((employee) => employee._id !== id)
        );
      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const rejectEmployee = async(id)=>{
    try {
      
      const response = await api.patch(`/api/admin/employee/${id}/reject`)
      toast.success(response.data.message);
       setPendingEmployees((employees) =>
            employees.filter((employee) => employee._id !== id)
        );

    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const createManager = async () => {

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

        toast.success(response.data.message);

        setManagerName("");
        setManagerEmail("");
        setManagerPassword("");

    } catch (error) {
        toast.error(error.response?.data?.message);
    }
  };


  const getActiveAndPendingEmployess = async()=>{
    try {

      const response = await api.get("api/admin/employee/active")
      setActiveEmployees(response.data.employees);
      console.log(response.data.employees);
            
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    getActiveAndPendingEmployess();
  },[])
  return (
   <div className="p-4 bg-gray-50 min-h-screen space-y-6 max-w-4xl mx-auto font-sans">
      
  {/* Header & Logout */}
  <div className="flex justify-between items-center bg-white p-4 border rounded">
    <h1 className="text-xl font-bold">Admin Dashboard</h1>
    <button 
      onClick={logout} 
      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
    >
      Logout
    </button>
  </div>

  {/* Main Grid Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    {/* Create Manager Form */}
    <div className="bg-white p-4 border rounded space-y-3">
      <h2 className="font-bold text-md border-b pb-2">Create Manager</h2>
      <input 
        onChange={(e)=>{
          setManagerName(e.target.value)
        }} 
        value={managerName}
        type="text" 
        placeholder="Manager Name" 
        className="w-full border p-2 text-sm rounded" 
      />
      <input 
        onChange={(e)=>{
          setManagerEmail(e.target.value)
        }} 
        value={managerEmail} 
        type="email" 
        placeholder="Manager Email" 
        className="w-full border p-2 text-sm rounded" 
      />
      <input 
        onChange={(e)=>{
          setManagerPassword(e.target.value)
        }} 
        value={managerPassword}
        type="password" 
        placeholder="Password" 
        className="w-full border p-2 text-sm rounded" 
      />
      <button 
        onClick={createManager} 
        className="w-full bg-blue-600 text-white py-2 text-sm rounded hover:bg-blue-700"
      >
        Create
      </button>
    </div>

    {/* Pending Employees */}
    <div className="bg-white p-4 border rounded space-y-3">
      <h2 className="font-bold text-md border-b pb-2">Pending Employees</h2>
      {
        pendingEmployees.map((employee)=>{
          return (
            <div key={employee._id} className="border p-2 rounded flex justify-between items-center text-sm">
              <span>{employee.name}</span>
              <div className="space-x-1">
                <button 
                  onClick={()=>{
                    approveEmployee(employee._id)
                  }} 
                  className="bg-green-600 text-white px-2 py-1 text-xs rounded"
                >
                  Approve
                </button>
                <button 
                  onClick={()=>{
                    rejectEmployee(employee._id)
                  }} 
                  className="bg-red-600 text-white px-2 py-1 text-xs rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          )
        })
      } 
    </div>

  </div>

  {/* Static Managers List & Active Employees List */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    {/* Managers List (Static UI) */}
    <div className="bg-white p-4 border rounded space-y-3">
      <h2 className="font-bold text-md border-b pb-2">Managers List</h2>
      {managers.map((manager)=>{
        return (
          <div key={manager._id} className="border p-2 rounded flex justify-between items-center text-sm bg-gray-50">
        <div>
          <p className="font-semibold text-gray-800">{manager.name}</p>
          <p className="text-xs text-gray-500">{manager.email}</p>
        </div>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Manager</span>
      </div>
        )
        
      })}
    </div>

    {/* Active Employees List (Static UI) */}
    <div className="bg-white p-4 border rounded space-y-3">
      <h2 className="font-bold text-md border-b pb-2">Active Employees List</h2>
      {
        activeEmployees.map((employee)=>{
          return(
            <div key={employee._id} className="border p-2 rounded flex justify-between items-center text-sm bg-gray-50">
        <div>
          <p className="font-semibold text-gray-800">{employee.name}</p>
          <p className="text-xs text-gray-500">{employee.email}</p>
        </div>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">{employee.status}</span>
      </div>
          )
        })
      }
    </div>

  </div>

  {/* Managers & Assigned Employees */}
  <div className="bg-white p-4 border rounded space-y-3">
    <h2 className="font-bold text-md border-b pb-2">Managers & Employees</h2>
    <div className="border p-3 rounded text-sm bg-gray-50">
      <p className="font-semibold text-gray-700">Manager: Mark Smith</p>
      <ul className="list-disc pl-5 mt-1 text-gray-600">
        <li>Employee A (a@test.com)</li>
        <li>Employee B (b@test.com)</li>
      </ul>
    </div>
  </div>

</div>
  )
}

export default AdminDashboard
