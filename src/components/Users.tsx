import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo-admin.png";

function Users() {
  const [users, setUsers] = useState([]);

  function fetchUsers() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div>
        <div className="container">
          {users.map((user:any) => {
            return (
              <div key={user.id}>
                <h2>
                  <strong>
                    {user.FirstName} {user.LastName}
                  </strong>
                </h2>
                <p>{user.EmailAdress}</p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Users;
