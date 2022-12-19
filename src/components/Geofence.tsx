import { Fragment } from 'react';
import geofenceModule from '../modules/geofenceModule';
import { Popup, Polygon } from 'react-leaflet';

function Geofence({ geofence }: any) {
  function checkColor(type: number) {
    return geofenceModule.checkColor(type);
  }

  function checkStatus(type: number): string {
    return geofenceModule.checkStatus(type);
  }

  // console.log(JSON.parse(location.Coordinates);
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
