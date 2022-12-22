import { useState, useEffect, SetStateAction } from 'react';
import userModel from '../models/userModels';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { User } from '../interfaces/maps';
import Pagination from './Pagination';

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const users = await userModel.getUsers();
      setUsers(users);
      setFilteredUsers(users);
    })();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.FirstName.toLowerCase().includes(search.toLowerCase()) ||
          user.id.toString().includes(search.toLowerCase()),
      ),
    );
  }, [search, users]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className='user-container'>
          <div className='search-header'>
            <input
              placeholder='Search by first name or id...'
              id='search-box'
              onChange={handleSearch}
            />
          </div>
          {currentRows.map((user: User) => {
            return (
              <div key={user.id}>
                <h2>
                  <strong>
                    {user.id}. {user.FirstName} {user.LastName}
                  </strong>
                </h2>
                <p>{user.EmailAdress}</p>
                <Link to={`/user/${user.id}`}>
                  {' '}
                  <button className='customer-btn' value={user.id}>
                    Details
                  </button>
                </Link>
                <hr />
              </div>
            );
          })}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Users;
