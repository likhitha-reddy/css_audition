import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register.js";


function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
      
        
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </Router>
      </div>
      
  );
}

export default App;