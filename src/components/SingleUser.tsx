import { useState, useEffect } from 'react';
import userModel from '../models/userModels';
import rentModel from '../models/rentModels';
import Navbar from './Navbar';
import Toast from './Toast';
import { Link, useNavigate } from 'react-router-dom';
import RentInformation from './RentInformation';
import Home from './Home';
import FooterStart from './FooterStart';

function SingleUser() {
  const [user, setUser] = useState<any>([]);
  const [rents, setRents] = useState<any>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAdress: '',
    password: '',
    oauth: '',
  });
  const [formErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAdress: '',
    password: '',
    oauth: '',
  });

  const urlArray = window.location.href.split('/');
  const userId = urlArray[urlArray.length - 1];

  /**
   * fetch single user from API
   * @returns {Promise<void>}
   */
  async function fetchUser(): Promise<void> {
    const singleUser = await userModel.getSingleUser(userId);
    setUser(singleUser[0]);
    setFormData({
      firstName: singleUser[0].FirstName,
      lastName: singleUser[0].LastName,
      phoneNumber: singleUser[0].PhoneNumber,
      emailAdress: singleUser[0].EmailAdress,
      password: singleUser[0].Password,
      oauth: singleUser[0].Oauth,
    });
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
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      await userModel.updateUser(user.id, formData);
      setToastMessage('User updated successfully!');
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMessage('Could not update user, try again.');
      setShowToast(true);
    }
  }

  /** @type {Array} filter rents depending on user */
  const filteredRents: Array<any> = rents.filter((rent: any) => user.id === rent.Users_id);

  if (localStorage.getItem('token')) {
    return (
      <div>
        <Navbar />
        {showToast && <Toast message={toastMessage} />}
        <div className='container'>
          <div className='link-container'>
            <Link to={'/users'}>
              {' '}
              <p className='users-link center'>Back to users</p>
            </Link>
          </div>
          <div className='user-container'>
            <form onSubmit={handleSubmit}>
              <legend>User {user.id}</legend>
              <div style={{ display: 'block' }}>
                <label htmlFor='firstName' />
                First name:
              </div>
              <div style={{ display: 'block' }}>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='First name'
                />
              </div>
              {formErrors.firstName && <p>{formErrors.firstName}</p>}
              <br />
              <div style={{ display: 'block' }}>
                <label htmlFor='lastName' />
                Last name
              </div>
              <div style={{ display: 'block' }}>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Last name'
                />
              </div>
              {formErrors.lastName && <p>{formErrors.lastName}</p>}
              <br />
              <div style={{ display: 'block' }}>
                <label htmlFor='emailAdress' />
                Email address:
              </div>
              <div style={{ display: 'block' }}>
                <input
                  type='text'
                  name='emailAdress'
                  value={formData.emailAdress}
                  onChange={handleChange}
                  placeholder='Email address'
                />
              </div>
              {formErrors.emailAdress && <p>{formErrors.emailAdress}</p>}
              <br />
              <div style={{ display: 'block' }}>
                <label htmlFor='phoneNumber' />
                Phone number:
              </div>
              <div style={{ display: 'block' }}>
                <input
                  type='text'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder='Phone number'
                />
              </div>
              {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
              <br />
              <div style={{ display: 'block' }}>
                <label htmlFor='oauth' />
                OAuth authorized:
              </div>
              <div style={{ display: 'block' }}>
                <input
                  type='text'
                  name='oauth'
                  value={formData.oauth || ''}
                  onChange={handleChange}
                  placeholder='OAuth authorized'
                />
              </div>
              {formErrors.oauth && <p>{formErrors.oauth}</p>}
              <br />
              <div style={{ display: 'block' }}>
                <label htmlFor='password' />
              </div>
              Password:
              <div style={{ display: 'block' }}>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Payment method'
                />
              </div>
              {formErrors.password && <p>{formErrors.password}</p>}
              <br />
              <div className='btn-container-user'>
                <button className='update-btn'>Update User</button>
                <button className='delete-btn' onClick={deleteUser}>
                  Delete User
                </button>
              </div>
            </form>
            <div>
              <RentInformation rents={filteredRents} />
            </div>
          </div>
          <FooterStart />
        </div>
      </div>
    );
  } else {
    return <Home />;
  }
}

export default SingleUser;
