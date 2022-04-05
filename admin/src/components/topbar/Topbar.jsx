import React from "react";
import "./topbar.css";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Topbar() {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    logOut(dispatch);
    history.push('/login')
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
            <a href="/" className="logout" onClick={handleClick}>Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
}
