import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import Navbar from './Navbar';

function Users() {
  const [users, setUsers] = useState([]);

  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchUsers(): Promise<void> {
    const users = await userModel.getUsers();
    setUsers(users);
  }

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar />
      <div>
        <div className='container'>
          {users.map((user: any) => {
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
