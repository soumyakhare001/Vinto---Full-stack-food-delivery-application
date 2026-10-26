import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const primaryColor = '#ff4d2d';
  const hoverColor = '#e64323';
  const bgColor = '#fff9f6';
  const borderColor = '#ddd'


  const handleLogin = async () => {
    try {
      const response = await axios.post(`${serverUrl}/api/auth/login`, { email, password }, { withCredentials: true });
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 ' style={{ border: `1px solid ${{ color: borderColor }}` }}>
        <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>
          vinto
        </h1>
        <p className='text-gray-600 mb-8'>Want to Create a new account</p>

        {/* email */}
        <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>email</label>
          <input type="email" className='w-full border rounded-lg px-2 py-2 focus:outline-none ' placeholder='Enter your email' style={{ border: `1px solid ${borderColor}` }} value={email} onChange={(e) => setemail(e.target.value)} />
        </div>

        {/* password */}
        <div className='mb-4 relative'>
          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>password</label>
          <input type={showPassword ? "text" : "password"} className='w-full border rounded-lg px-2 py-2 focus:outline-none cursor:pointer ' placeholder='Choose a strong password' style={{ border: `1px solid ${borderColor}` }} value={password} onChange={(e) => setpassword(e.target.value)} />
          <button className='absolute right-3 top-[40px]' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaEye /> : <FaEyeSlash />}</button>

        </div>
        <div className='text-right mb-4 text-[#ff4d2d] font-medium' onClick={()=>navigate('/forgotpassword')}>
          Forgot Password
        </div>

        <div>
          <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `}
            onClick={handleLogin}>
            Login
          </button>
          <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 trnasition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer'>
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
          </button>
          <p className='text-center mt-6 cursor-pointer' onClick={() => navigate("/signup")}>Dont have an account?  <span className='text-[#ff4d2d]'>Sign Up</span></p>

        </div>



      </div>
    </div>

  )
}

export default Login
