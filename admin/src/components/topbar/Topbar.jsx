import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/apiCalls";

export default function Topbar() {

  const handleClick = (e) => {
    e.preventDefault();
    logOut();
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">babypingviin admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Link to="/login">
            <button>Login</button>
            </Link>
          </div>
          <div className="topbarIconContainer">
            <button onClick={handleClick}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
