import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState(null);
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
        navigate('/login')
      };
     
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const result=await axios.post("http://localhost:3001/auth/register", {
          email,
          password,
          name,
          phoneNo,
        });
        alert( result.data.message);
        navigate('/login')
      } catch (error) {
        alert(error.response.data.message+"  login instead");
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
         
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input autocomplete="off" id="email" name="email" type="email" 
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              </div>
              <div className="relative">
                <input autocomplete="off" id="name" name="name" type="text" 
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="name" />
                <label for="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"> Name</label>
              </div>
              <div className="relative">
                <input autocomplete="off" pattern="[0-9]{10}" id="phoneNo" name="phoneNo" type="tel" 
                  value={phoneNo}
                  onChange={(event) => setPhoneNo(event.target.value)}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="phone number" />
                <label for="phoneNo" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone No</label>
              </div>
              <div className="relative">
                <input autocomplete="off"  
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
              <div className="relative">
                <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md px-2 py-1">Register</button>
              </div>
              <div className="relative">
              <h4 className="text-md font-light">Already Have an Account </h4>
                <button onClick={handleLogin} className="bg-blue-50 text-md text-blue-500 rounded-md px-2 py-1">
                  LOGIN
                  </button>
                  <h4 className="text-md font-light">Instead </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
    );
  };


