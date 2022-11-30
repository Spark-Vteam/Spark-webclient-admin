const mapsModel = {
  getStations: async function getStations() {
    const response = await fetch('http://localhost:4000/station');

    const stations = await response.json();

    return stations[0];
  },
  getBikes: async function getBikes() {
    const response = await fetch('http://localhost:4000/bike');

    const bikes = await response.json();

    // return bikes;
    return bikes[0];
  }
};

export default mapsModel;
