import Navbar from './Navbar';
import Footer from './Footer';

function Policy() {
  return (
    <div>
      <Navbar />
      <div className='policy-container'>
        <div className='policy-column'>
          <h1>Policy</h1>
          <p>
            Electric Bikes, also known as e-scooters, have become a popular mode of transportation
            in recent years. In Sweden, the use of e-scooters is regulated by law. To learn more
            about the specific laws governing e-scooters in Sweden, please visit
          </p>
          <a href='https://www.transportstyrelsen.se/elsparkcykel'>
            The Swedish Transport Agency website
          </a>
          <p>
            which provides information on the rules and regulations surrounding the use of
            e-scooters in Sweden, including where they are allowed to be used, the maximum speed at
            which they can be operated, and the required age for riders. It is important to be aware
            of these laws and to follow them when using an e-scooter. By doing so, you can help
            ensure the safety of yourself and others on the road.
          </p>

          <p>
            At Spark, we take the rules and regulations surrounding e-scooters very seriously. We
            use a variety of tools to ensure that our users are following the rules, including
            geofencing technology to create slow and forbidden driving zones, and by providing
            designated parking spaces for our users to ensure that they are not parking illegally.
            We encourage all of our users to familiarize themselves with the rules and to follow
            them at all times while using our e-scooters.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Policy;
