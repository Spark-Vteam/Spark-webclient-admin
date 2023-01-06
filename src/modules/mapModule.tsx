import L from 'leaflet';
import active from '../img/pin/Active.png';
import available from '../img/pin/Available.png';
import service from '../img/pin/Service.png';
import charging from '../img/pin/Charging.png';
import isCharging from '../img/pin/IsCharging.png';
import parking from '../img/pin/ChargingStation.png';

const mapModule = {
  setCityC: function setCityC(city: string): Array<any> {
    if (city === 'stockholm') {
      return [59.334591, 18.06324, 'stockholm'];
    } else if (city === 'lund') {
      return [55.70584, 13.19321, 'lund'];
    } else if (city === 'karlskrona') {
      return [56.16156, 15.58661, 'karlskrona'];
    } else {
      throw console.error('City does not exist');
    }
  },
  sIcon: function sIcon(scooter: any): L.Icon<L.IconOptions> | undefined {
    let scooterIcon;

    if (scooter.Status < 20) {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: available,
      });
    } else if (scooter.Status < 30) {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: active,
      });
    } else if (scooter.Status === 30) {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: charging,
      });
    } else if (scooter.Status === 40) {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: isCharging,
      });
    } else if (scooter.Status === 50) {
      scooterIcon = L.icon({
        iconSize: [35, 38],
        iconAnchor: [13, 41],
        iconUrl: service,
      });
    }
    return scooterIcon;
  },
  pIcon: function pIcon(): L.Icon {
    const parkingIcon = L.icon({
      iconSize: [35, 38],
      iconAnchor: [13, 41],
      iconUrl: parking,
    });

    return parkingIcon;
  },
  statusMessage: function statusMessage(scooter: any): string {
    let message = '';

    if (scooter.Status >= 10 && scooter.Status < 20) {
      message = 'Bike is available';
    } else if (scooter.Status === 20) {
      message = 'Bike is active';
    } else if (scooter.Status === 30) {
      message = 'Bike has no battery';
    } else if (scooter.Status === 40) {
      message = 'Bike is charging';
    } else if (scooter.Status === 50) {
      message = 'Bike needs maintenance';
    } else {
      message = 'Could not load status message';
    }

    return message;
  },
};

export default mapModule;
