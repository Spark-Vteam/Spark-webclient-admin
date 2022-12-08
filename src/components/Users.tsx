import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState<any>([]);
  /**
   * fetch users from API
   * @returns {Promise<void>}
   */
  async function fetchUsers(): Promise<void> {
    const users = await userModel.getUsers();
    setUsers(users);
    setFilteredList(users);
  }

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClick(event: any) {
    console.log(event.target);
  }

  const [filteredList, setFilteredList] = useState(users);

  const filterBySearch = (event: any) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    let updatedList = [...users];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.FirstName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='user-container'>
          <div className='search-header'>
            <input
              placeholder='Search by first name...'
              id='search-box'
              onChange={filterBySearch}
            />
          </div>
          {filteredList.map((user: any) => {
            return (
              <div key={user.id}>
                <h2>
                  <strong>
                    {user.FirstName} {user.LastName}
                  </strong>
                </h2>
                <p>{user.EmailAdress}</p>
                <Link to={`/user/${user.id}`}>
                  {' '}
                  <button value={user.id} onClick={handleClick}>
                    Handle customer
                  </button>
                </Link>
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
