import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function SingleUser() {
  const [user, setUser] = useState<any>([]);

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

  return (
    <div>
      <Navbar />
      <div className='container'>
        <Link to={'/users'}>
          {' '}
          <p className='users-link center'>Back to users</p>
        </Link>
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
          {/* Lägg till information om resor också? */}
          <button className='update-btn'>Update</button>
          <button className='delete-btn'>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
