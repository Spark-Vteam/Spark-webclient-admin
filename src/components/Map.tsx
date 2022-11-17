import { useState, useEffect } from "react";
import L from "leaflet";
import testLocations from "../Data/lund-test-locations.json";
import logo from "../img/logo-admin.png";
import { Link } from "react-router-dom";
import active from "../img/pin/Active.png";
import available from "../img/pin/Available.png";
import service from "../img/pin/Service.png";
import charging from "../img/pin/Charging.png";
// import chargingStation from "../img/pin/ChargingStation.png";
import parking from "../img/pin/Parking.png";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  FeatureGroup,
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";

function Map(props: any) {
  const [city, setCity] = useState<string>("");
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [mapLayers, setMapLayers] = useState<Array<any>>([]);
  const [stations, setStations] = useState([]);

  function fetchStation() {
    fetch("http://localhost:4000/stations")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStations(data);
      });
  }

  useEffect(() => {
    (async () => {
      await fetchStation();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(stations);

  function setCityCoordinates(event: any) {
    if (event.target.value === "malmo") {
      setLatitude(55.60587);
      setLongitude(13.00073);
      setCity("malmo");
    } else if (event.target.value === "lund") {
      setLatitude(55.70584);
      setLongitude(13.19321);
      setCity("lund");
    } else {
      console.log("City does not exist");
    }
  }

  const filteredBikes = testLocations.data.stations.filter(
    (bike) => bike.city === city
  );

  function checkIcon(scooter: any) {
    let scooterIcon;

    if (scooter.status === "Available") {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: available,
      });
    } else if (scooter.status === "Active") {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: active,
      });
    } else if (scooter.status === "Needs charging") {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: charging,
      });
    } else if (scooter.status === "Needs service") {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: service,
      });
    }

    return scooterIcon;
  }

  function parkingIcon() {
    let parkingIcon = L.icon({
      iconSize: [35, 38],
      iconAnchor: [13, 41],
      iconUrl: parking,
    });

    return parkingIcon;
  }

  function resetCity(): void {
    setCity("");
    setLatitude(undefined);
    setLongitude(undefined);
  }

  //Insert coordinates in database
  function _onCreate(e: any) {
    console.log(typeof e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  }

  //Update coordinates in database
  function _onEditPath(e: any) {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }: any) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  }

  //Delete coordinates in database
  function _onDeleted(e: any) {
    console.log(e.target);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }: any) => {
      setMapLayers((layers) =>
        layers.filter((layers) =>
          layers.filter((l: any) => l.id !== _leaflet_id)
        )
      );
    });
  }

  console.log(mapLayers);
  return (
    <div>
      <div className="topnav">
        <img src={logo} width="50px" alt="logo" />
        <div className="topnav-right">
          <Link to="/" className="home-link">
            {" "}
            Home
          </Link>
          <Link to="/map" className="login-link">
            {" "}
            Log out
          </Link>
        </div>
      </div>
      {longitude !== undefined && latitude !== undefined ? (
        <div>
          <div className="btn-container">
            <Link to="/map" className="customers-link center">
              {" "}
              <button className="option-btn" onClick={resetCity}>
                Change city
              </button>
            </Link>
            <Link to="/users" className="customers-link center">
              {" "}
              <button className="option-btn">Customer overview</button>
            </Link>
          </div>
          <div className="map-container">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredBikes.map((location: any) => (
                <Marker
                  key={location.station_id}
                  position={[location.lat, location.lon]}
                  icon={checkIcon(location)}
                >
                  <Popup>
                    Status: {location.status} <br />
                    Battery: {location.battery}% <br />
                    <a href="#">Move bike</a>
                  </Popup>
                </Marker>
              ))}
              {stations.map((station: any) => (
                <Marker
                  key={station.station_id}
                  position={station.Position.split(",")}
                  icon={parkingIcon()}
                >
                  <Popup>
                    Name: {station.Name} <br />
                    Scooters: 48 <br />
                    <a href="#">Move bike</a>
                  </Popup>
                </Marker>
              ))}
              <FeatureGroup>
                <EditControl
                  position="topright"
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
              </FeatureGroup>{" "}
            </MapContainer>
            <pre className="text-left">{JSON.stringify(mapLayers)}</pre>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>Choose a city:</h1>
          <button className="btn" onClick={setCityCoordinates} value="lund">
            Lund
          </button>
          <br></br>
          <button
            className="btn margin-top"
            onClick={setCityCoordinates}
            value="malmo"
          >
            Malmö
          </button>
        </div>
      )}
    </div>
  );
}

export default Map;
