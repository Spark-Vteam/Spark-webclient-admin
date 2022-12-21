import { Fragment } from 'react';
import { Bike, BikeProps } from '../interfaces/maps';
import { useState, useEffect } from 'react';
import mapsModel from '../models/mapModels';
import mapModule from '../modules/mapModule';
import Pagination from './Pagination';

function BikeList({ filteredBikes }: BikeProps) {
  const [bike, setBikes] = useState<Array<Bike>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const totalPages = Math.ceil(filteredBikes.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBikes.slice(indexOfFirstRow, indexOfLastRow);

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
   * fetch station bikes
   * @returns {Promise<void>}
   */
  async function fetchStationBike(): Promise<void> {
    const fetchedBikes = await mapsModel.getStationBike();
    setBikes(fetchedBikes);
  }

  useEffect(() => {
    (async () => {
      await fetchStationBike();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(bike);

  return (
    <>
      <div className='table-wrapper'>
        <h3 className='header-black'>Bikes in system</h3>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Bike id</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Battery</th>
              <th>Status</th>
            </tr>
          </thead>
          {currentRows.map((bike: Bike) => (
            <Fragment key={bike.id}>
              <tbody>
                <tr>
                  <td>{bike.id}</td>
                  <td>{bike.Position.split(',')[0]}</td>
                  <td>{bike.Position.split(',')[1]}</td>
                  <td>{bike.Battery}%</td>
                  <td>{setStatus(bike)}</td>
                </tr>
              </tbody>
            </Fragment>
          ))}
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default BikeList;
