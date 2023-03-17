import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



export const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/loggedin");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (

    <div className=" flex justify-center	">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      
      <div className="mb-4">
      <label htmlFor="email">email:</label>
          <input
          required
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
      </div>
      <div className="form-group">
      <label htmlFor="password">Password:</label>
          <input
          required
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      
      
      
      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit"
       >Login</button>
    </form>
  </div>



  
  );
};

