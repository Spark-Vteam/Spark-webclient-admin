// import { useState, useEffect } from 'react';
// import userModel from '../models/userModels';
import { Fragment } from 'react';
import { Popup } from 'react-leaflet';
import BikeMarker from './BikeMarker';
import mapModule from '../modules/mapModule';

function ActiveBikes({ activeBikes }: any) {
  /**
   * Set status message
   * @param {any} scooter Current bike
   * @returns {string}
   */
  function setStatus(scooter: any): string {
    const message = mapModule.statusMessage(scooter);
    return message;
  }

  return (
    <div>
      {activeBikes.map((bike: any) => (
        <Fragment key={bike.id}>
          <BikeMarker data={bike ?? {}}>
            {' '}
            <Popup key={bike.id}>
              ID: {bike.id} <br />
              Status: {setStatus(bike)} <br />
              Battery: {bike.Battery}% <br />
              <a href='#'>Stop bike</a>
            </Popup>
          </BikeMarker>
        </Fragment>
      ))}
    </div>
  );
}

export default ActiveBikes;
