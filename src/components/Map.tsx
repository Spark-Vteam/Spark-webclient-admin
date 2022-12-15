import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import mapsModel from '../models/mapModels';
import mapModule from '../modules/mapModule';
import Navbar from './Navbar';
import Geofence from './Geofence';
import Stations from './Stations';
import Bikes from './Bikes';
import DrawGeofence from './DrawGeofence';
import './Map.css';

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

import ActiveBikes from './ActiveBikes';

function Map() {
  const [bikes, setBikes] = useState<Array<any>>([]);
  const [stations, setStations] = useState<Array<any>>([]);
  const [, setCity] = useState<string>('');
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [geofence, setGeofence] = useState<Array<any>>([]);
  const [, setMapBounds] = useState<Array<any>>([]);

  /**
   * fetch bikes from API
   * @returns {Promise<void>}
   */
  async function fetchBikes(): Promise<void> {
    const stations = await mapsModel.getBikes();
    setBikes(stations);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        await fetchBikes();
        // console.log('Fetching bikes from API');
      })();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * fetch stations from API
   * @returns {Promise<void>}
   */
  async function fetchStation(): Promise<void> {
    const stations = await mapsModel.getStations();
    setStations(stations);
  }

  useEffect(() => {
    (async () => {
      await fetchStation();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  /** @type {Array} filter bikes depending on status */
  const filteredBikes: Array<any> = bikes.filter(
    (bike: any) => bike.id < 1500 && bike.Status !== 40 && bike.Status !== 20,
  );

  /** @type {Array} filter bikes depending on status */
  const activeBikes: Array<any> = bikes.filter((bike: any) => bike.Status === 20);

  /** @type {Array} filter bikes depending on status */
  const filteredStations: Array<any> = stations.filter((station: any) => station.id < 100);

  // Set Mapbounds on map to fetch bikes within map.
  function getMapBounds(bounds: any, zoom: any, zoomThreshold = 8) {
    // console.log(bounds);
    setMapBounds([
      [bounds._northEast.lat, bounds._northEast.lng],
      [bounds._southWest.lat, bounds._southWest.lng],
    ]);
    if (zoom > zoomThreshold) {
      // console.log('make a call to the server with the bounds:', bounds);
    }
  }

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => getMapBounds(map.getBounds(), map.getZoom()),
      zoomend: () => getMapBounds(map.getBounds(), map.getZoom()),
    });
    return null;
  };

  return (
    <div>
      <Navbar />
      {longitude !== undefined && latitude !== undefined ? (
        <div>
          <div className='btn-container'>
            <Link to='/map' className='customers-link center'>
              {' '}
              <button className='option-btn' onClick={resetCity}>
                Change city
              </button>
            </Link>
          </div>
          <div className='map-container'>
            <MapContainer key={1} center={[latitude, longitude]} zoom={13} scrollWheelZoom={true}>
              <MapEvents />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Bikes filteredBikes={filteredBikes} />
              <ActiveBikes activeBikes={activeBikes} />
              <Stations filteredStations={filteredStations} />
              <DrawGeofence />
              <Geofence geofence={geofence} />
            </MapContainer>
          </div>
        </div>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Map;
