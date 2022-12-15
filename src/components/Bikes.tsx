// import { useState, useEffect } from 'react';
// import userModel from '../models/userModels';
import { Fragment } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from './MarkerClusterGroup';
import mapModule from '../modules/mapModule';

function Bikes({ filteredBikes }: any) {
  /**
   * Set status message
   * @param {any} scooter Current bike
   * @returns {string}
   */
  function setStatus(scooter: any): string {
    const message = mapModule.statusMessage(scooter);
    return message;
  }
  /**
   * Check which icon bike should have on map depending on status
   * @param {any} scooter Current bike
   * @returns {L.Icon<L.IconOptions> | undefined}
   */
  function checkIcon(scooter: any): L.Icon<L.IconOptions> | undefined {
    const scooterIcon = mapModule.sIcon(scooter);
    return scooterIcon;
  }
  return (
    <div>
      <MarkerClusterGroup>
        {filteredBikes.map((location: any) => (
          <Fragment key={location.id}>
            <Marker
              key={location.id}
              position={location.Position.split(',')}
              icon={checkIcon(location)}
            >
              <Popup key={location.id}>
                ID: {location.id} <br />
                Status: {setStatus(location)} <br />
                Battery: {location.Battery}% <br />
                <a href='#'>Move bike</a>
              </Popup>
            </Marker>
          </Fragment>
        ))}
      </MarkerClusterGroup>
    </div>
  );
}

export default Bikes;
