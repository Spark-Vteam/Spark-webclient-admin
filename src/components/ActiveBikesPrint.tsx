import { Fragment } from 'react';
import { Bike } from '../interfaces/maps';
import simulationModel from '../models/simulationModel';

function ActiveBikesPrint({ activeBikes, city }: any) {
  async function stopBike(event: any) {
    await simulationModel.stopSpecificBike(event.target.value);
  }

  return (
    <>
      <h3>Active bikes for {city}</h3>
      <hr />
      {activeBikes.map((bike: Bike) => (
        <Fragment key={bike.id}>
          <p data-testid='fragment'>
            ID: {bike.id} <br />
            Battery: {bike.Battery}% <br />
            Latitude: {bike.Position.split(',')[0]}
            <br />
            Longitude: {bike.Position.split(',')[1]} <br />
            {/* Vet inte om man ska stanna cykeln
            <a className='stop-bike' href='http://localhost:8000/stop/:bike.id'>
              Stop bike
            </a> */}
            <button className='stop-bike' value={bike.id} onClick={stopBike}>
              Stop bike
            </button>
          </p>
          <hr />
        </Fragment>
      ))}
    </>
  );
}

export default ActiveBikesPrint;
