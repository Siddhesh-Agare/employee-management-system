import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {api} from '../services/api.js'


const Dashboard = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    

    const getUserData = async()=>{
        try {

            const response = await api.get("/api/user/me");
            setName(response.data.name);
            setEmail(response.data.email)
            
        } catch (error) {
            toast.error(error.response?.data?.message)
            
        }
    }

    useEffect(() => {
      getUserData()
    }, [])
    
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{name}</h2>
      <h2>{email}</h2>
    </div>
  )
}

export default Dashboard
