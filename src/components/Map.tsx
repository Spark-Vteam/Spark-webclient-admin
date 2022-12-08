import { useState, useEffect } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import MarkerClusterGroup from 'react-leaflet-cluster';
import PixiOverlay from 'react-leaflet-pixi-overlay';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import mapsModel from '../models/mapModels';
import mapModule from '../modules/mapModule';
import Navbar from './Navbar';
import './Map.css';
// import testLocations from '../Data/lund-test-locations.json'

import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';

import { EditControl } from 'react-leaflet-draw';

function Map() {
  const [bikes, setBikes] = useState<Array<any>>([]);
  const [stations, setStations] = useState<Array<any>>([]);
  const [, setCity] = useState<string>('');
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [mapLayers, setMapLayers] = useState<Array<any>>([]);
  const redOption = { color: 'red' };

  /**
   * fetch bikes from API
   * @returns {Promise<void>}
   */
  async function fetchBikes(): Promise<void> {
    const stations = await mapsModel.getBikes();
    setBikes(stations);
  }

  useEffect(() => {
    (async () => {
      await fetchBikes();
    })();
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
   * Check which icon bike should have on map depending on status
   * @param {any} scooter Current bike
   * @returns {L.Icon<L.IconOptions> | undefined}
   */
  function checkIcon(scooter: any): L.Icon<L.IconOptions> | undefined {
    const scooterIcon = mapModule.sIcon(scooter);
    return scooterIcon;
  }

  /**
   * Set status message
   * @param {any} scooter Current bike
   * @returns {string}
   */
  function setStatus(scooter: any): string {
    const message = mapModule.statusMessage(scooter);
    return message;
  }

  /**
   * Set parking icon
   * @returns {L.Icon}
   */
  function parkingIcon(): L.Icon {
    return mapModule.pIcon();
  }

  // Insert coordinates in database
  /**
   * Create geofence on map
   * @param {any} e Position to create geofence
   * @returns {void}
   */
  function _onCreate(e: any): void {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const { leafletId } = layer;

      setMapLayers((layers) => [...layers, { id: leafletId, latlngs: layer.getLatLngs()[0] }]);
    }
  }

  // Update coordinates in database
  /**
   * Update geofence on map
   * @param {any} e Position to create geofence
   * @returns {void}
   */
  function _onEditPath(e: any): void {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ leafletId, editing }: any) => {
      setMapLayers((layers) =>
        layers.map((l) => (l.id === leafletId ? { ...l, latlngs: { ...editing.latlngs[0] } } : l)),
      );
    });
  }

  // Delete coordinates in database
  /**
   * Delete geofence on map
   * @param {any} e Position to create geofence
   * @returns {void}
   */
  function _onDeleted(e: any): void {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ leafletId }: any) => {
      setMapLayers((layers) =>
        layers.filter((layers) => layers.filter((l: any) => l.id !== leafletId)),
      );
    });
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
    (bike: any) => bike.id < 400 && bike.Status !== 40,
    // bike.Status === 10 ||
    // bike.Status === 20 ||
    // bike.Status === 30 ||
    // bike.Status === 50,
  );

  /** @type {Array} filter bikes depending on status */
  const filteredStations: Array<any> = stations.filter(
    (station: any) => station.id < 100,
    // bike.Status === 10 ||
    // bike.Status === 20 ||
    // bike.Status === 30 ||
    // bike.Status === 50,
  );


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
            <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <MarkerClusterGroup disableClusteringAtZoom={15} chunkedLoading>
              {filteredBikes.map((location: any) => (
                <Marker
                  key={location.id}
                  position={location.Position.split(',')}
                  icon={checkIcon(location)}
                >
                  <Popup key={location.id}>
                    ID: {location.id} <br />
                    Status: {setStatus(location)} <br />
                    Battery: {location.Battery}% <br />
                    <a href='#'>Move bike</a>
                  </Popup>
                </Marker>
              ))}
              </MarkerClusterGroup>
              <MarkerClusterGroup disableClusteringAtZoom={15} chunkedLoading>
              {filteredStations.map((station: any) => (
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
              ))}
              </MarkerClusterGroup>
              <FeatureGroup>
                <EditControl
                  position='topright'
                  onEdited={_onEditPath}
                  onCreated={_onCreate}
                  onDeleted={_onDeleted}
                  draw={{
                    rectangle: false,
                    circle: false,
                    polyline: false,
                    circlemarker: false,
                    marker: false,
                  }}
                />
              </FeatureGroup>{' '}
              {/* Fetch geofence positions from db */}
              <Polygon
                pathOptions={redOption}
                // Test coordinates, change to geofence api endpoint
                positions={[
                  [55.7154749638867, 13.190239814751019],
                  [55.714991177018184, 13.188040006736431],
                  [55.71666360282453, 13.186885455057052],
                  [55.71691758080317, 13.187100070473088],
                  [55.71717155713039, 13.188688224551896],
                  [55.71689339249541, 13.191392378794184],
                  [55.71685711000568, 13.193903379162057],
                  [55.7164217175, 13.19634999490506],
                  [55.71545416122276, 13.19851761060723],
                  [55.715296931063996, 13.198775149106515],
                  [55.714704288623274, 13.198860995272932],
                  [55.71244248891907, 13.195105225491954],
                  [55.712043334200686, 13.19302345595624],
                  [55.712950498116875, 13.192014763500758],
                  [55.71314402369265, 13.191091917211729],
                  [55.71505503727621, 13.190126147839456],
                ]}
              >
                <Popup>No parking</Popup>
              </Polygon>
            </MapContainer>
            <pre className='text-left'>{JSON.stringify(mapLayers)}</pre>
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
