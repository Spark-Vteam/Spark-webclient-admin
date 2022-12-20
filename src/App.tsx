import { useState, useEffect } from 'react';
import Map from './components/Map';
import Home from './components/Home';
import Users from './components/Users';
import SingleUser from './components/SingleUser';
import './App.css';
import './components/Footer.css';
import './components/Typography.css';
import './components/Buttons.css';
import './components/Navbar.css';
import './components/User.css';
import './components/Stations.css';
import './components/Form.css';
import mapsModel from './models/mapModels';
import { Station, GeofenceInterface } from './interfaces/maps';

import { Routes, Route } from 'react-router-dom';

function App() {
  const [stations, setStations] = useState<Array<Station>>([]);
  const [geofence, setGeofence] = useState<Array<GeofenceInterface>>([]);

  /**
   * fetch stations from API
   * @returns {Promise<void>}
   */
  async function fetchStation(): Promise<void> {
    const getStations = await mapsModel.getStations();
    setStations(getStations);
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

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/map' element={<Map stations={stations} geofence={geofence} />} />
      <Route path='/users' element={<Users />} />
      <Route path={'/user/:id'} element={<SingleUser />} />
    </Routes>
  );
}

export default App;
