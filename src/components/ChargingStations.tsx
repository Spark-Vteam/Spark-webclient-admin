import { Fragment } from 'react';
import { Station, StationProps } from '../interfaces/maps';

function ChargingStations({ stations }: StationProps) {
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
