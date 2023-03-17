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
      <div className=" flex justify-center	">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             required
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             required
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">PhoneNo:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required
               type='tel'
               pattern="[0-9]{10}"
                onChange={(e) => setPhoneNo(e.target.value.toUpperCase())}
               value={phoneNo}
               id='phone'   />
          </div>
          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             required
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="shadow m-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
           Register</button>
          <br/>
          <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
           onClick={handleLogin}>Login Instead</button>
        </form>
      </div>
    );
  };


