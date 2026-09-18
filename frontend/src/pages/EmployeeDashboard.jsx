import React from 'react'
import toast from 'react-hot-toast'
import { api } from '../services/api.js'
import { useState } from 'react'
import { useEffect } from 'react'

const EmployeeDashboard = () => {

  const [myTasks, setMyTasks] = useState([])

  const getMyTasks = async()=>{
    try {

      const response = await api.get("/api/employee/tasks");
      setMyTasks(response.data.tasks);
      
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    getMyTasks();
  },[])

  return (
    <div>
      <h1>Employee Dashboard</h1>
      {
        myTasks.map((task)=>{
          return (
            <div key={task._id}>
              <p>{task.title}</p>
              <p>{task.description}</p>
              Due: {new Date(task.dueDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}
             {task.feedback && (
  <p>Feedback: {task.feedback}</p>
)}
              <p>{task.response}</p>
              <p>{task.status}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default EmployeeDashboard
