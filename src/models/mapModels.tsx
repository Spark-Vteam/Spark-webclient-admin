const mapsModel = {
  getStations: async function getStations() {
    const response = await fetch('http://localhost:4000/v1/station', {
      headers: {
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      }
    });

    const stations = await response.json();

    return stations.data;
  },
  getBikes: async function getBikes() {
    const response = await fetch('http://localhost:4000/v1/bike', {
      headers: {
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      }
    });

    const bikes = await response.json();

    // return bikes;
    return bikes.data;
  },
  getBikesByCity: async function getBikesByCity(city: string) {
    const response = await fetch(`http://localhost:4000/v1/bike/city/${city}`, {
      headers: {
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      }
    });

    const bikes = await response.json();

    // return bikes;
    return bikes.data;
  },
  getGeofence: async function getGeofence() {
    const response = await fetch('http://localhost:4000/v1/geofence', {
      headers: {
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      }
    });

    const geofence = await response.json();

    // return geofence;
    return geofence.data;
  },
  getStationBike: async function getStationBike() {
    const response = await fetch('http://localhost:4000/v1/bike/charging', {
      headers: {
        'key': '18c364b7-641e-440e-849a-20a3c67036a1'
      }
    });

    const bike = await response.json();

    // return bike;
    return bike.data;
  },
};

export default mapsModel;
