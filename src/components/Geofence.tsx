import { Fragment } from 'react';
import geofenceModule from '../modules/geofenceModule';
import { Popup, Polygon } from 'react-leaflet';
import { GeofenceInterface, GeofenceProps } from '../interfaces/maps';

function Geofence({ geofence }: GeofenceProps) {
  function checkColor(type: number) {
    return geofenceModule.checkColor(type);
  }

  function checkStatus(type: number): string {
    return geofenceModule.checkStatus(type);
  }

  // console.log(JSON.parse(location.Coordinates);
  return (
    <div>
      {geofence.map((location: GeofenceInterface) => (
        <Fragment key={location.id}>
          <Polygon
            pathOptions={checkColor(location.Type)}
            positions={[JSON.parse(location.Coordinates)]}
          >
            <Popup key={location.id}>
              {location.Info} <br />
              {checkStatus(location.Type)}
            </Popup>
          </Polygon>
        </Fragment>
      ))}
    </div>
  );
}

export default Geofence;
