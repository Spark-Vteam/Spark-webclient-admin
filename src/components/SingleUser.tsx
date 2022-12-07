import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import Navbar from './Navbar';

function SingleUser() {
  const [user, setUser] = useState<any>([]);

  let urlArray = window.location.href.split('/');
  let userId = urlArray[urlArray.length - 1];

  /**
   * fetch single user from API
   * @returns {Promise<void>}
   */
  async function fetchUser(): Promise<void> {
    const singleUser = await userModel.getSingleUser(userId);
    setUser(singleUser[0]);
  }

  console.log(user);

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar />
      <div className='container'>
        <p>{user.FirstName} {user.LastName}</p>
        <p>{user.PhoneNumber}</p>
        <p>{user.EmailAdress}</p>
        <p>Betalningsmetod: {"Undefined" || user.PartialPayment}</p>
        {/* Lägg till information om resor också? */}
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default SingleUser;
