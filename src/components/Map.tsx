import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import testLocations from "../Data/lund-test-locations.json";
import logo from "../img/logo-admin.png";
import { Link } from "react-router-dom";
import active from "../img/pin/Active.png";
import available from "../img/pin/Available.png";
import service from "../img/pin/Service.png";
import charging from "../img/pin/Charging.png";

import { useState } from "react";

function Map() {
  const [city, setCity] = useState<string>("");
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();

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
        iconSize: [35, 35],
        iconAnchor: [13, 41],
        iconUrl: available,
      });
    } else if (scooter.status === "Active") {
      scooterIcon = L.icon({
        iconSize: [35, 35],
        iconAnchor: [13, 41],
        iconUrl: active,
      });
    } else if (scooter.status === "Needs charging") {
      scooterIcon = L.icon({
        iconSize: [35, 35],
        iconAnchor: [13, 41],
        iconUrl: charging,
      });
    } else if (scooter.status === "Needs service") {
      scooterIcon = L.icon({
        iconSize: [35, 35],
        iconAnchor: [13, 41],
        iconUrl: service,
      });
    }

    return scooterIcon;
  }

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
      <div className="container">
        <Link to="/users" className="customers-link center">
          {" "}
          Customers
        </Link>
      </div>
      {longitude !== undefined && latitude !== undefined ? (
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
            {filteredBikes.map((location) => (
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
          </MapContainer>
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
