import { Fragment } from 'react';
import { Bike, ActiveBikeProps } from '../interfaces/maps';

function ActiveBikesPrint({ activeBikes, city }: any) {
  return (
    <>
      <h3>Active bikes for {city}</h3>
      <hr />
      {activeBikes.map((bike: Bike) => (
        <Fragment key={bike.id}>
          <p>
            ID: {bike.id} <br />
            Battery: {bike.Battery}% <br />
            Latitude: {bike.Position.split(',')[0]}
            <br />
            Longitude: {bike.Position.split(',')[1]} <br />
            {/* Vet inte om man ska stanna cykeln */}
            <a className='stop-bike' href='#'>
              Stop bike
            </a>
          </p>
          <hr />
        </Fragment>
      ))}
    </>
  );
}

export default ActiveBikesPrint;
