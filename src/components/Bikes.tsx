import { Fragment } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from './MarkerClusterGroup';
import mapModule from '../modules/mapModule';
import { Bike, BikeProps } from '../interfaces/maps';

function Bikes({ filteredBikes }: BikeProps) {
  /**
   * Set status message
   * @param {Bike} scooter Current bike
   * @returns {string}
   */
  function setStatus(scooter: Bike): string {
    const message = mapModule.statusMessage(scooter);
    return message;
  }
  /**
   * Check which icon bike should have on map depending on status
   * @param {Bike} scooter Current bike
   * @returns {L.Icon<L.IconOptions> | undefined}
   */
  function checkIcon(scooter: Bike): L.Icon<L.IconOptions> | undefined {
    const scooterIcon = mapModule.sIcon(scooter);
    return scooterIcon;
  }
  return (
    <div>
      <MarkerClusterGroup>
        {filteredBikes.map((location: Bike) => (
          <Fragment key={location.id}>
            <Marker
              key={location.id}
              position={location.Position.split(',').map(Number) as [number, number]}
              icon={checkIcon(location)}
            >
              <Popup key={location.id}>
                ID: {location.id} <br />
                Status: {setStatus(location)} <br />
                Battery: {location.Battery}% <br />
              </Popup>
            </Marker>
          </Fragment>
        ))}
      </MarkerClusterGroup>
    </div>
  );
}

export default Bikes;
