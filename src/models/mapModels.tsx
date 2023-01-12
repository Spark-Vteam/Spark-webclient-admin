const key = process.env.REACT_APP_API_KEY as string;

const mapsModel = {
  getStations: async function getStations() {
    const response = await fetch('http://localhost:4000/v1/station', {
      headers: {
        key: key,
      },
    });

    const stations = await response.json();

    return stations.data;
  },
  getBikes: async function getBikes() {
    const response = await fetch('http://localhost:4000/v1/bike', {
      headers: {
        key: key,
      },
    });

    const bikes = await response.json();

    // return bikes;
    return bikes.data;
  },
  getBikesByCity: async function getBikesByCity(city: string) {
    const response = await fetch(`http://localhost:4000/v1/bike/city/${city}`, {
      headers: {
        key: key,
      },
    });

    const bikes = await response.json();

    // return bikes;
    return bikes.data;
  },
  getGeofence: async function getGeofence() {
    const response = await fetch('http://localhost:4000/v1/geofence', {
      headers: {
        key: key,
      },
    });

    const geofence = await response.json();

    // return geofence;
    return geofence.data;
  },
  getStationBike: async function getStationBike() {
    const response = await fetch('http://localhost:4000/v1/bike/charging', {
      headers: {
        key: key,
      },
    });

    const bike = await response.json();

    // return bike;
    return bike.data;
  },
};

export default mapsModel;
