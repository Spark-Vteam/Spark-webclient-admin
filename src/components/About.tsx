import Navbar from './Navbar';
import Footer from './Footer';
import Spark from '../img/Spark-head.png';

function About() {
  return (
    <>
      <Navbar />
      <div className='container-box'>
        <div className='about-container'>
          <div className='about-column column-1'>
            <h1>About Spark</h1>
            <p>
              This is a project at Blekinge Institute of Technology in the course of web development
              in virtual teams. The project involves developing a system for the company Spark, which rents electric scooters in various cities in Sweden. The
              company operates in three cities and plans to expand to more in the future with the
              help of the new system being developed by the students. The system will handle the
              logistics of scooter rentals, including the availability of scooters, the location of
              each scooter, and the management of customer accounts.
            </p>
          </div>
          <div className='about-column column-2'>
            <div className='center img'>
              <img src={Spark} className='heading-text' alt='Spark heading' />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default About;
