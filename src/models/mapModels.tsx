const mapsModel = {
  getStations: async function getStations() {
    const response = await fetch('http://localhost:4000/stations')

    const stations = await response.json()

    return stations
  },
  getBikes: async function getBikes() {
    const response = await fetch('http://localhost:4000/bikes')

    const bikes = await response.json()

    return bikes
  },
}

export default mapsModel
