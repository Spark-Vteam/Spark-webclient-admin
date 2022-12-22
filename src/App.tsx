import { useState, useEffect } from 'react';
import Map from './components/Map';
import Home from './components/Home';
import Users from './components/Users';
import PricingComp from './components/Pricing';
import SingleUser from './components/SingleUser';
import './App.css';
import './components/css/Footer.css';
import './components/css/Typography.css';
import './components/css/Buttons.css';
import './components/css/Navbar.css';
import './components/css/User.css';
import './components/css/Stations.css';
import './components/css/Form.css';
import mapsModel from './models/mapModels';
import { Station, GeofenceInterface, Bike } from './interfaces/maps';

import { Routes, Route } from 'react-router-dom';

function App() {
  const [stations, setStations] = useState<Array<Station>>([]);
  const [geofence, setGeofence] = useState<Array<GeofenceInterface>>([]);
  const [bikes, setBikes] = useState<Array<Bike>>([]);

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
   * fetch stations from API
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
   *
   * fetch bikes from API
   * @returns {Promise<void>}
   */
  async function fetchBikes(): Promise<void> {
    const fetchedBikes = await mapsModel.getBikes();
    setBikes(fetchedBikes);
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    (async () => {
      await fetchBikes();
      // console.log('Fetching bikes from API');
    })();
    // }, 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/map'
        element={<Map stations={stations} geofence={geofence} bikes={bikes} setBikes={setBikes} />}
      />
      <Route path='/users' element={<Users />} />
      <Route path='/pricing' element={<PricingComp />} />
      <Route path={'/user/:id'} element={<SingleUser />} />
    </Routes>
  );
}

export default App;
