import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className='left'>© Spark 2022</div>
      <ul className='right'>
        <li>
          <Link to='/about' className='customers-link center'>
            {' '}
            About
          </Link>
        </li>
        <li>
          <Link to='/policy' className='customers-link center'>
            {' '}
            Policy
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
