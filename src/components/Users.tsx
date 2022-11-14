import React from "react";
import { Link } from "react-router-dom";
import cell from "../img/cell.png";
import logo from "../img/logo-admin.png";
import spark from "../img/heading.png";

function handleClick() {
  fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function Users() {
  return (
    <div>
      <div className="topnav">
        <img src={logo} width="50px" alt="logo" />
        <div className="topnav-right">
          <Link to="/" className="home-link">
            {" "}
            Home
          </Link>
          <Link to="/map" className="login-link">
            {" "}
            Log out
          </Link>
        </div>
      </div>
      <div className="container">
        <button className="btn" onClick={handleClick}>
          Fetch data admin
        </button>
      </div>
    </div>
  );
}

export default Users;
