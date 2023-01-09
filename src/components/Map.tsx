import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import mapsModel from '../models/mapModels';
import mapModule from '../modules/mapModule';
import Navbar from './NavbarMap';
import Geofence from './Geofence';
import SearchForm from './SearchForm';
import SearchFormStations from './SearchFormStations';
import Stations from './Stations';
import Bikes from './Bikes';
import ActiveBikesPrint from './ActiveBikesPrint';
import ActiveBikes from './ActiveBikes';
import BikeList from './BikeList';
import { Bike, Station } from '../interfaces/maps';
import Footer from './Footer';
import FooterStart from './FooterStart';
import './css/Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';
import Home from './Home';

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
    if (city) {
      const fetchedBikes = await mapsModel.getBikesByCity(city);
      console.log(fetchedBikes);
      setBikes(fetchedBikes);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        fetchBikes();
      })();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [city]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (city === 'lund') {
      /** @type {Array} filter bikes depending on city */
      const filteredBikes: Array<Bike> = bikes.filter(
        (bike: Bike) => bike.City === 'lund' && bike.Status !== 20,
      );
      const filteredStations: Array<Station> = stations.filter(
        (station: Station) => station.City === 'Lund',
      );
      /** @type {Array} filter bikes depending on status */
      const activeBikes: Array<any> = bikes.filter(
        (bike: any) => bike.City === 'lund' && bike.Status === 20,
      );

      setStationsByCity(filteredStations);
      setBikesByCity(filteredBikes);
      setActiveBikesByCity(activeBikes);
    } else if (city === 'stockholm') {
      /** @type {Array} filter bikes depending on city */
      const filteredBikes: Array<Bike> = bikes.filter(
        (bike: Bike) => bike.City === 'stockholm' && bike.Status !== 20,
      );
      const filteredStations: Array<Station> = stations.filter(
        (station: Station) => station.City === 'Stockholm',
      );

      /** @type {Array} filter bikes depending on status */
      const activeBikes: Array<any> = bikes.filter(
        (bike: any) => bike.City === 'stockholm' && bike.Status === 20,
      );

      setBikesByCity(filteredBikes);
      setStationsByCity(filteredStations);
      setActiveBikesByCity(activeBikes);
    } else {
      /** @type {Array} filter bikes depending on city */
      const filteredBikes: Array<Bike> = bikes.filter(
        (bike: Bike) => bike.id > 2735 && bike.Status !== 20,
      );

      const filteredStations: Array<Station> = stations.filter(
        (station: Station) => station.id > 347,
      );

      /** @type {Array} filter bikes depending on status */
      const activeBikes: Array<any> = bikes.filter(
        (bike: any) => bike.id > 2735 && bike.Status === 20,
      );

      setBikesByCity(filteredBikes);
      setStationsByCity(filteredStations);
      setActiveBikesByCity(activeBikes);
    }
  }, [bikes, city]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Sets coordinates and city
   * @param {any} event Current city
   * @returns {void}
   */
  function setCityCoordinates(event: any): void {
    console.log('byter stad till', event.target.value);
    const values = mapModule.setCityC(event.target.value);
    setLatitude(values[0]);
    setLongitude(values[1]);
    setCity(event.target.value);
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

  if (localStorage.getItem('token')) {
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
                      {/* <DrawGeofence /> */}
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
              <BikeList filteredBikes={bikesByCity.concat(activeBikesByCity)} />
            </div>
            <Footer />
          </>
        ) : (
          <div className='container'>
            <div className='center'>
              <h1>Choose a city</h1>
              <button className='btn' onClick={setCityCoordinates} value='lund'>
                Lund
              </button>
              <br></br>
              <button className='btn margin-top' onClick={setCityCoordinates} value='stockholm'>
                Stockholm
              </button>
              <br></br>
              <button className='btn margin-top' onClick={setCityCoordinates} value='karlskrona'>
                Karlskrona
              </button>
            </div>
            <FooterStart />
          </div>
        )}
      </>
    );
  } else {
    return <Home />;
  }
}

export default Map;
