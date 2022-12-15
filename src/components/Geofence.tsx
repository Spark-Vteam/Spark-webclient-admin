// import { useState, useEffect } from 'react';
// import userModel from '../models/userModels';
import { Fragment } from 'react';
import { Popup, Polygon } from 'react-leaflet';

function Geofence({ geofence }: any) {
  console.log(geofence);
  const redOption = { color: 'red' }; //30
  const yellowOption = { color: 'yellow' }; //10
  const orangeOption = { color: 'orange' }; // 20
  const greyOption = { color: 'grey' }; // 40

  function checkColor(type: number) {
    if (type === 10) {
      return yellowOption;
    } else if (type === 20) {
      return orangeOption;
    } else if (type === 30) {
      return redOption;
    } else return greyOption;
  }

  function checkStatus(type: number): string {
    if (type === 10) {
      return 'Slow zone';
    } else if (type === 20) {
      return 'Parking forbidden';
    } else if (type === 30) {
      return 'Driving forbidden';
    } else return 'Inactive zone';
  }

  return (
    <div>
      {geofence.map((location: any) => (
        <Fragment key={location.id}>
          <Polygon
            pathOptions={checkColor(location.Type)}
            positions={[JSON.parse(location.Coordinates)]}
          >
            <Popup>{checkStatus(location.Type)}</Popup>
          </Polygon>
        </Fragment>
      ))}
    </div>
  );
}

export default Geofence;
