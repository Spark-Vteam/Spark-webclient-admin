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
// import DrawGeofence from './DrawGeofence';
import ActiveBikes from './ActiveBikes';
import BikeList from './BikeList';
// import ChargingStations from './ChargingStations';
import { Bike, Station, GeofenceInterface } from '../interfaces/maps';
// import Footer from './Footer';
import { Map as LMap } from 'leaflet';
import './css/Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';

function Map({ stations }: any) {
  const [bikes, setBikes] = useState<Array<Bike>>([]);
  const [city, setCity] = useState<string>('lund');
  const [longitude, setLongitude] = useState<number>(13.19321);
  const [latitude, setLatitude] = useState<number>(55.70584);
  const [activeBikesByCity, setActiveBikesByCity] = useState<Array<Bike>>([]);
  const [geofence, setGeofence] = useState<Array<GeofenceInterface>>([]);
  const mapRef = useRef<LMap>(null);

  /**
   *
   * fetch bikes from API
   * @returns {Promise<void>}
   */
  async function fetchBikes(): Promise<void> {
    const fetchedBikes = await mapsModel.getBikesByCity(city);
    const activeBikes = fetchedBikes.filter((bike: any) => bike.Status === 20);
    setBikes(fetchedBikes);
    setActiveBikesByCity(activeBikes);
  }

  console.log(bikes);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        await fetchBikes();
        console.log('Fetching bikes from API');
      })();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [bikes]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * fetch geofence from API
   * @returns {Promise<void>}
   */
  async function fetchGeofence(): Promise<void> {
    const getGeofence = await mapsModel.getGeofence();
    setGeofence(getGeofence);
  }

  useEffect(() => {
    (async () => {
      await fetchGeofence();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(city);
    setCityCoordinates({ target: { value: city } });
  }, [city, mapRef.current]);

  /**
   * Sets coordinates and city
   * @param {any} event Current city
   * @returns {void}
   */
  function setCityCoordinates(event: any): void {
    const values = mapModule.setCityC(event.target.value);
    setLatitude(values[0]);
    setLongitude(values[1]);
    setCity(values[2]);

    if (mapRef.current !== null) {
      mapRef.current.setView([values[0], values[1]], 12);
    }
  }

  return (
    <>
      <Navbar />
      <>
        <div className='container-1'>
          <div className='flex-container'>
            <div className='child child1'>
              <div className='btn-container'>
                <Link to='/map' className='customers-link center'>
                  {' '}
                  <button className='option-btn' value='lund' onClick={setCityCoordinates}>
                    Lund
                  </button>
                </Link>
                <Link to='/map' className='customers-link center'>
                  {' '}
                  <button className='option-btn' value='stockholm' onClick={setCityCoordinates}>
                    Stockholm
                  </button>
                </Link>
                <Link to='/map' className='customers-link center'>
                  {' '}
                  <button className='option-btn' value='karlskrona' onClick={setCityCoordinates}>
                    Karlskrona
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
                  <Bikes filteredBikes={bikes} />
                  <ActiveBikes activeBikes={activeBikesByCity} />
                  <Stations filteredStations={stations} />
                  {/* <DrawGeofence /> */}
                  <Geofence geofence={geofence} />
                </MapContainer>
                <div className='flex-form'>
                  <SearchForm markers={bikes} map={mapRef} />
                  <SearchFormStations markers={stations} map={mapRef} />
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
          <BikeList filteredBikes={bikes} />
        </div>
        {/* <Footer /> */}
      </>
    </>
  );
}

export default Map;
