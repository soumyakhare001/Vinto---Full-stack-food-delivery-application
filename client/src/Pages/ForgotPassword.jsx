import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
const primaryColor = '#ff4d2d';
const hoverColor = '#e64323';
const bgColor = '#fff9f6';
const borderColor = '#ddd'
function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setstep] = useState(1);
  const [email, setemail] = useState("");
  const [Otp, setOtp] = useState("");
  const [Newpassword, setNewpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true });
      console.log(result);
      setstep(2);
    } catch (error) {
      console.log("Backend message:", error.response?.data);
    console.log("Status:", error.response?.status);
    }
  }

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, Otp }, { withCredentials: true });
      console.log(result);
      setstep(3)
    } catch (error) {
    
    console.log("Backend response:", error.response?.data);
    console.log("Status:", error.response?.status);

      console.log(error);
    }
  }
  const handleResetPassword = async () => {
    if (Newpassword != confirmPassword) {
      return null;
    } else {


      try {
        const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, Newpassword }, { withCredentials: true });
        console.log(result);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className='flex  w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 '>
        <div className='flex items-center gap-4 mb-4' onClick={() => navigate('/login')}><IoIosArrowRoundBack className='text-[#ff4d2d]' size={30} />
          <h1 className='text-2xl font-bold text-center text-[#ff4d2d] '>Forgot Password</h1>
        </div>
        {step === 1 &&
          <div>
            {/* email */}
            <div className='mb-4 mt-6'>
              <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
              <input type="email" className='w-full border rounded-lg px-2 py-2 focus:outline-none ' placeholder='Enter your email' style={{ border: `1px solid ${borderColor}` }} value={email} onChange={(e) => setemail(e.target.value)} />
            </div>
            <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `}
              onClick={handleSendOtp}  >
              Send Otp
            </button>
          </div>}
        {step === 2 &&
          <div>
            {/* email */}
            <div className='mb-4 mt-6'>
              <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Enter Otp</label>
              <input type="text" className='w-full border rounded-lg px-2 py-2 focus:outline-none ' placeholder='Enter Otp' style={{ border: `1px solid ${borderColor}` }} value={Otp} onChange={(e) => setOtp(e.target.value)} />
            </div>
            <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `}
              onClick={handleVerifyOtp}  >
              Verify Otp
            </button >
          </div>}
        {step === 3 &&
          <div>
          
            <div className='mb-4 mt-6'>
              <label htmlFor="newpassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
              <input type="password" className='w-full border rounded-lg px-2 py-2 focus:outline-none ' placeholder='Enter Otp' style={{ border: `1px solid ${borderColor}` }} value={Newpassword} onChange={(e) => setNewpassword(e.target.value)} />
            </div>
            <div className='mb-4 mt-6'>
              <label htmlFor="confirmpassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
              <input type="password" className='w-full border rounded-lg px-2 py-2 focus:outline-none ' placeholder='Enter Otp' style={{ border: `1px solid ${borderColor}` }} value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
            </div>
            <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `}
              onClick={handleResetPassword}  >
              Reset Password
            </button >
          </div>}
      </div>


    </div>
  )
}

export default ForgotPassword
