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
        await axios.post("http://localhost:3001/auth/register", {
          email,
          password,
          name,
          phoneNo,
        });
        alert("Registration Completed! Now login.");
        navigate('/login')
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="email">email:</label>
            <input
             required
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">name:</label>
            <input
             required
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">PhoneNo:</label>
            <input
               required
               type='tel'
               pattern="[0-9]{10}"
                onChange={(e) => setPhoneNo(e.target.value.toUpperCase())}
               value={phoneNo}
               id='phone'   />
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
          <button   className="button" type="submit">Register</button>
          <br/>
          <button  className="button" onClick={handleLogin}>Login Instead</button>
        </form>
      </div>
    );
  };


