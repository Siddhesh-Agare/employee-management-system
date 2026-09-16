import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {api} from '../services/api.js'
import AdminDashboard from './AdminDashboard.jsx';
import ManagerDashboard from './ManagerDashboard.jsx';
import EmployeeDashboard from './EmployeeDashboard.jsx';


const Dashboard = () => {

    const [user, setUser] = useState(null)

    const getUserData = async()=>{
        try {

            const response = await api.get("/api/user/me");
            setUser(response.data)
            
        } catch (error) {
            toast.error(error.response?.data?.message)
            
        }
    }

    useEffect(() => {
      getUserData()
    }, [])

    
    
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      {user ? (
        <>
         {/* <h2>{user.name}</h2>
      <h2>{user.email}</h2>
      <h2>{user.role}</h2>
      <h2>{user.status}</h2> */}
      {
        user.role === "admin" ? (
        <AdminDashboard/>
      ): user.role === "manager" ?(
        <ManagerDashboard name={user.name}/>
      ): (
        <EmployeeDashboard/>
      )  
      } 
        </> 
      ): (
        <p>Loading</p>
      )}
    </div>
  )
}

export default Dashboard
