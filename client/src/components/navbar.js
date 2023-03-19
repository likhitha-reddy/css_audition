import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };
  return (

    <div className="flex justify-between max-w-full bg-blue-50 py-5">
    
      <div className="flex justify-between items-center   mx-auto px-4 sm:px-6 ">
  
     {!cookies.access_token ? (
        <Link className=" text-center mt-4 text-xl font-medium text-blue-500 hover:text-blue-400" to="/register">Login/Register</Link>
      ) : (
        <button className="text-center mt-4 text-xl font-medium text-blue-500 hover:text-blue-400" onClick={logout}> Logout </button>
      )}
     </div>
     </div>
  
    
  );
};