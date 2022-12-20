import cell from '../img/cell.png';
import spark from '../img/heading.png';
import Navbar from './Navbar';
import Footer from './Footer';

function Home() {
  return (
    <div className='App'>
      <img src={cell} className='bg-layer' alt='cellphone' />
      <Navbar />
      <div className='heading'>
        <img src={spark} className='heading-text' alt='Spark heading' />
        <h3 className='head-text-sub'>
          <span>Administration</span>
        </h3>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
