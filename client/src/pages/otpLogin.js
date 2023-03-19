import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  validator  from  'validator';


const OtpLogin = () => {
    const [phoneNo, setPhoneNo] = useState()
    const [otp, setOtp] = useState()
    const navigate = useNavigate();
    
    
    const handleSendOtp = async (e) => {
      e.preventDefault();

    
    try {
        const result=await axios.post("http://localhost:3001/auth/sendotp", {
          phoneNo,
        });
        alert( result.data.message);
      } catch (error) {
        
        console.log("error is:",error);
      }
    };
    const handleVerifyOtp = async (e) => {
      e.preventDefault();
    
    try {
      console.log({"otp":otp})
        const result=await axios.post("http://localhost:3001/auth/verifyotp", {
          phoneNo,
          otp,
        });
        alert( result.data.message);
        navigate('/loggedin')
      } catch (error) {
        console.log(error.response)
      }
     };
    
    
  return (
   


<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
<div className="relative py-3 sm:max-w-xl sm:mx-auto">
  <div
    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
  </div>
  <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <div className="max-w-md mx-auto">
      <div>
  
      </div>
      <div className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <div className="relative">
            <input autocomplete="off" pattern="[0-9]{10}" id="phoneNo" name="phoneNo" type="tel" 
              value={phoneNo}
              onChange={(event) => setPhoneNo(event.target.value)}
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="phoneNo" />
            <label for="phoneNo" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone No</label>
          </div>
          
          <div className="relative">
            <input autocomplete="off"  
          id="otp"
          value={otp}
          onChange={(event) => setOtp(event.target.value)} name="otp" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="otp" />
            <label for="otp" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">OTP</label>
          </div>
          <div className="relative">
            <button onClick={handleSendOtp} className="bg-blue-500 text-white rounded-md px-2 py-1">SEND OTP</button>
          </div>
          <div className="relative">
            <button onClick={handleVerifyOtp} className="bg-blue-100 text-blue-500 rounded-md px-2 py-1">VERIFY OTP</button>
          </div>

         
        </div>
      </div>
    </div>
  </div>
</div>
</div>



  )
}


export default OtpLogin