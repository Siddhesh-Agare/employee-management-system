import React, { useState } from 'react'
import {api} from '../services/api.js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async()=>{
        try {

            const response = await api.post("/api/auth/login",
                {
                    email,
                    password
                }
            )

            localStorage.setItem("token",response.data.token)

            toast.success(response.data.message)

            navigate("/dashboard");
            
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="flex flex-col w-full max-w-sm gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
    
    <input 
      onChange={(elem) => setEmail(elem.target.value)} 
      type="email" 
      placeholder="Enter your email" 
      value={email} 
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <input 
      onChange={(elem) => setPassword(elem.target.value)} 
      type="password" 
      placeholder="Enter password" 
      value={password} 
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <button 
      onClick={loginUser}
      className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
    >
      Submit
    </button>
  </div>
</div>
  )
}

export default Login
