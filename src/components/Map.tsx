import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import mapsModel from '../models/mapModels';
import mapModule from '../modules/mapModule';
import Navbar from './Navbar';
import Geofence from './Geofence';
import SearchForm from './SearchForm';
import SearchFormStations from './SearchFormStations';
import Stations from './Stations';
import Bikes from './Bikes';
import ActiveBikesPrint from './ActiveBikesPrint';
import DrawGeofence from './DrawGeofence';
import ActiveBikes from './ActiveBikes';
// import ChargingStations from './ChargingStations';
import { Bike, Station } from '../interfaces/maps';
import Footer from './Footer';
import './css/Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';

function Map({ stations, geofence }: any) {
  const [bikes, setBikes] = useState<Array<Bike>>([]);
  const [city, setCity] = useState<string>('');
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [bikesByCity, setBikesByCity] = useState<Array<Bike>>([]);
  const [stationsByCity, setStationsByCity] = useState<Array<Station>>([]);
  const [activeBikesByCity, setActiveBikesByCity] = useState<Array<Bike>>([]);
  const mapRef = useRef(null);

  /**
   *
   * fetch bikes from API
   * @returns {Promise<void>}
   */
  async function fetchBikes(): Promise<void> {
    const stations = await mapsModel.getBikes();
    setBikes(stations);
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    (async () => {
      await fetchBikes();
      // console.log('Fetching bikes from API');
    })();
    // }, 5000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Sets coordinates and city
   * @param {any} event Current city
   * @returns {void}
   */
  function setCityCoordinates(event: any): void {
    const values = mapModule.setCityC(event);
    setLatitude(values[0]);
    setLongitude(values[1]);
    setCity(values[2]);

    if (event.target.value === 'Lund') {
      /** @type {Array} filter bikes depending on city */
      const filteredBikes: Array<Bike> = bikes.filter(
        (bike: Bike) => bike.id < 1501 && bike.Status !== 20,
      );

      const filteredStations: Array<Station> = stations.filter(
        (station: Station) => station.id < 101,
      );

      /** @type {Array} filter bikes depending on status */
      const activeBikes: Array<any> = bikes.filter(
        (bike: any) => bike.id < 1501 && bike.Status === 20,
      );

      setStationsByCity(filteredStations);
      setBikesByCity(filteredBikes);
      setActiveBikesByCity(activeBikes);
      // console.log(filteredStations);
    } else {
      /** @type {Array} filter bikes depending on city */
      const filteredBikes: Array<Bike> = bikes.filter(
        (bike: Bike) => bike.id > 1500 && bike.Status !== 20,
      );

      const filteredStations: Array<Station> = stations.filter(
        (station: Station) => station.id > 100,
      );

      /** @type {Array} filter bikes depending on status */
      const activeBikes: Array<any> = bikes.filter(
        (bike: any) => bike.id > 1500 && bike.Status === 20,
      );

      setBikesByCity(filteredBikes);
      setStationsByCity(filteredStations);
      setActiveBikesByCity(activeBikes);
    }
  }

  /**
   * Resets city
   * @returns {void}
   */
  function resetCity(): void {
    setCity('');
    setLatitude(undefined);
    setLongitude(undefined);
  }

  // /** @type {Array} filter bikes depending on status */
  // const activeBikes: Array<any> = bikes.filter((bike: any) => bike.Status === 20);

  return (
    <>
      <Navbar />
      {longitude !== undefined && latitude !== undefined ? (
        <>
          <div className='container-1'>
            <div className='flex-container'>
              <div className='child child1'>
                <div className='btn-container'>
                  <Link to='/map' className='customers-link center'>
                    {' '}
                    <button className='option-btn' onClick={resetCity}>
                      Change city
                    </button>
                  </Link>
                </div>
                <div className='map-container'>
                  <MapContainer
                    key={1}
                    center={[latitude, longitude]}
                    zoom={13}
                    scrollWheelZoom={true}
                    ref={mapRef}
                  >
                    {/* <MapEvents /> */}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Bikes filteredBikes={bikesByCity} />
                    <ActiveBikes activeBikes={activeBikesByCity} />
                    <Stations filteredStations={stationsByCity} />
                    <DrawGeofence />
                    <Geofence geofence={geofence} />
                  </MapContainer>
                  <div className='flex-form'>
                    <SearchForm markers={bikesByCity.concat(activeBikesByCity)} map={mapRef} />
                    <SearchFormStations markers={stationsByCity} map={mapRef} />
                  </div>
                </div>
              </div>
              <div className='child child2'>
                <div className='active-container'>
                  <ActiveBikesPrint activeBikes={activeBikesByCity} city={city} />
                </div>
              </div>
            </div>
          </div>
          <div className='container-2'>
            {/* <ChargingStations stations={stationsByCity} /> */}
          </div>
          {/* <Footer /> */}
        </>
      ) : (
        <div className='container'>
          <div className='center'>
            <h1>Choose a city</h1>
            <button className='btn' onClick={setCityCoordinates} value='Lund'>
              Lund
            </button>
            <br></br>
            <button className='btn margin-top' onClick={setCityCoordinates} value='Stockholm'>
              Stockholm
            </button>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Map;
