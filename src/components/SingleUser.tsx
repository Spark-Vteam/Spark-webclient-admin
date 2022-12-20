import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import rentModel from '../models/rentModels';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import RentInformation from './RentInformation';

function SingleUser() {
  const [user, setUser] = useState<any>([]);
  const [rents, setRents] = useState<any>([]);
  const navigate = useNavigate();

  const urlArray = window.location.href.split('/');
  const userId = urlArray[urlArray.length - 1];

  /**
   * fetch single user from API
   * @returns {Promise<void>}
   */
  async function fetchUser(): Promise<void> {
    const singleUser = await userModel.getSingleUser(userId);
    setUser(singleUser[0]);
  }

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * fetch rents for user from API
   * @returns {Promise<void>}
   */
  async function fetchRents(): Promise<void> {
    console.log(user.id);
    const fetchedRents = await rentModel.getRents();
    setRents(fetchedRents);
  }

  useEffect(() => {
    (async () => {
      await fetchRents();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function deleteUser() {
    await userModel.deleteUser(user.id);
    navigate('/users');
    // window.location.reload();
  }

  /** @type {Array} filter rents depending on user */
  const filteredRents: Array<any> = rents.filter((rent: any) => user.id === rent.Users_id);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='link-container'>
          <Link to={'/users'}>
            {' '}
            <p className='users-link center'>Back to users</p>
          </Link>
        </div>
        <div className='user-container'>
          <h2>
            {user.FirstName} {user.LastName}
          </h2>
          <hr />
          <p>
            <strong>Email: </strong>
            {user.EmailAdress}
          </p>
          <p>
            <strong>Phone number: </strong>
            {user.PhoneNumber}
          </p>
          <p>
            <strong>OAuth authorized:</strong> {user.Oauth}
          </p>
          <p>
            <strong>Payment method:</strong> {'Undefined' || user.PartialPayment}
          </p>
          <p>
            <RentInformation rents={filteredRents} />
          </p>
          <button className='update-btn'>Update</button>
          <button className='delete-btn' onClick={deleteUser}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
