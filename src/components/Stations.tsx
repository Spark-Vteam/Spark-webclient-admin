import { Fragment } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from './MarkerClusterGroup';
import mapModule from '../modules/mapModule';

function Stations({ filteredStations }: any) {
  /**
   * Set parking icon
   * @returns {L.Icon}
   */
  function parkingIcon(): L.Icon {
    return mapModule.pIcon();
  }

  return (
    <div>
      <MarkerClusterGroup>
        {filteredStations.map((station: any) => (
          <Fragment key={station.id}>
            <Marker
              key={station.station_id}
              position={station.Position.split(',')}
              icon={parkingIcon()}
            >
              <Popup key={station.id}>
                {station.Name} <br />
                ID: {station.id} <br />
                Occupied spots: {station.Occupied} <br />
                Available spots: {station.Available} <br />
              </Popup>
            </Marker>
          </Fragment>
        ))}
      </MarkerClusterGroup>
    </div>
  );
}

export default Stations;
