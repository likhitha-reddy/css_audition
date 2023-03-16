import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar ">
     {!cookies.access_token ? (
        <Link to="/register">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
     
    </div>
  );
};