const mapsModel = {
  getStations: async function getStations() {
    const response = await fetch('http://localhost:4000/station');

    const stations = await response.json();

    return stations.data;
  },
  getBikes: async function getBikes() {
    const response = await fetch('http://localhost:4000/bike');

    const bikes = await response.json();

    // return bikes;
    return bikes.data;
  },
  getGeofence: async function getGeofence() {
    const response = await fetch('http://localhost:4000/geofence');

    const geofence = await response.json();

    // return geofence;
    return geofence.data;
  },
  getStationBike: async function getStationBike() {
    const response = await fetch('http://localhost:4000/bike/charging');

    const bike = await response.json();

    // return bike;
    return bike.data;
  },
};

export default mapsModel;
