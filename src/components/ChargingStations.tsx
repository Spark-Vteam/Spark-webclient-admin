import { Fragment } from 'react';
import { Station, StationProps } from '../interfaces/maps';
import { useState, useEffect } from 'react';
import mapsModel from '../models/mapModels';
import { Bike } from '../interfaces/maps';

function ChargingStations({ stations }: StationProps) {
  const [bike, setBikes] = useState<Array<Bike>>([]);

  /**
   * fetch station bikes
   * @returns {Promise<void>}
   */
  async function fetchGeofence(): Promise<void> {
    const getGeofence = await mapsModel.getStationBike();
    setBikes(getGeofence);
  }

  useEffect(() => {
    (async () => {
      await fetchGeofence();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(bike);

  return (
    <>
      <div className='table-wrapper'>
        <h3 className='header-black'>Charging stations</h3>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Station id</th>
              <th>Name</th>
              <th>Bikes</th>
              <th>Available spots</th>
              <th>Occupied spots</th>
            </tr>
          </thead>
          {stations.map((station: Station) => (
            <Fragment key={station.id}>
              <tbody>
                <tr>
                  <td>{station.id}</td>
                  <td>{station.Name}</td>
                  <td>*PRINT OUT BIKES*</td>
                  <td>{station.Available}</td>
                  <td>{station.Occupied}</td>
                </tr>
              </tbody>
            </Fragment>
          ))}
        </table>
      </div>
    </>
  );
}

export default ChargingStations;
