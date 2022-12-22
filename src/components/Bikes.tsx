import { Fragment } from 'react';
import { Marker, Popup, CircleMarker } from 'react-leaflet';
import MarkerClusterGroup from './MarkerClusterGroup';
import mapModule from '../modules/mapModule';
import { Bike, BikeProps } from '../interfaces/maps';
import L from 'leaflet';

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

  /**
   * Check which icon bike should have on map depending on status
   * @param {Bike} scooter Current bike
   * @returns {string}
   */
  function checkColor(scooter: Bike): string | undefined {
    let scooterIcon;

    if (scooter.Status === 10) {
      scooterIcon = '#00ff00';
    } else if (scooter.Status === 20) {
      scooterIcon = '#0000ff';
    } else if (scooter.Status === 30) {
      scooterIcon = '#ffff00';
    } else if (scooter.Status === 40) {
      scooterIcon = '#ffa500';
    } else if (scooter.Status === 50) {
      scooterIcon = '#ff0000';
    }
    return scooterIcon;
  }

  return (
    <div>
      <MarkerClusterGroup>
        {filteredBikes.map((location: Bike) => (
          <Fragment key={location.id}>
            {/* <CircleMarker
              center={[
                parseFloat(location.Position.split(',')[0]),
                parseFloat(location.Position.split(',')[1]),
              ]}
              color={checkIcon(location)}
            > */}
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
