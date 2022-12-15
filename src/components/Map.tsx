import { useState, useEffect, Fragment } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import MarkerClusterGroup from './MarkerClusterGroup';
import BikeMarker from './BikeMarker';
// import PixiOverlay from 'react-leaflet-pixi-overlay';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import mapsModel from '../models/mapModels';
import mapModule from '../modules/mapModule';
import Navbar from './Navbar';
import './Map.css';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  FeatureGroup,
  Polygon,
  useMapEvents,
} from 'react-leaflet';

import { EditControl } from 'react-leaflet-draw';

function Map() {
  const [bikes, setBikes] = useState<Array<any>>([]);
  const [stations, setStations] = useState<Array<any>>([]);
  const [, setCity] = useState<string>('');
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [mapLayers, setMapLayers] = useState<Array<any>>([]);
  const [geofence, setGeofence] = useState<Array<any>>([]);
  const [mapBounds, setMapBounds] = useState<Array<any>>([]);

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
    // const interval = setInterval(() => {
    (async () => {
      await fetchBikes();
      // console.log('Fetching bikes from API');
    })();
    // }, 2000);
    // return () => {
    //   clearInterval(interval);
    // };
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
    (bike: any) => bike.id < 400 && bike.Status !== 40 && bike.Status !== 20,
  );

  /** @type {Array} filter bikes depending on status */
  const activeBikes: Array<any> = bikes.filter((bike: any) => bike.Status === 20);

  /** @type {Array} filter bikes depending on status */
  const filteredStations: Array<any> = stations.filter((station: any) => station.id < 100);

  // /** @type {Array} filter bikes depending on status */
  // const mapGeofence: Array<any> = geofence.map((geo: any) => console.log(geo.Coordinates));

  // console.log(mapGeofence);

  //Set Mapbounds on map to fetch bikes within map.
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
              <MarkerClusterGroup>
                {filteredBikes.map((location: any) => (
                  <Fragment key={location.id}>
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
                  </Fragment>
                ))}
              </MarkerClusterGroup>
              {activeBikes.map((bike: any) => (
                <Fragment key={bike.id}>
                  <BikeMarker data={bike ?? {}}>
                    {' '}
                    <Popup key={bike.id}>
                      ID: {bike.id} <br />
                      Status: {setStatus(bike)} <br />
                      Battery: {bike.Battery}% <br />
                      <a href='#'>Stop bike</a>
                    </Popup>
                  </BikeMarker>
                </Fragment>
              ))}
              <MarkerClusterGroup>
                {filteredStations.map((station: any) => (
                  <Fragment key={station.id}>
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
                  </Fragment>
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
              {geofence.map(
                (location: any) => (
                  console.log([location.Coordinates]),
                  (
                    <Polygon pathOptions={redOption} positions={[JSON.parse(location.Coordinates)]}>
                      <Popup>No parking</Popup>
                    </Polygon>
                  )
                ),
              )}
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
