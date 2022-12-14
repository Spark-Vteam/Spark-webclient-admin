const redOption = { color: 'red' }; // 30
const yellowOption = { color: 'yellow' }; // 10
const orangeOption = { color: 'orange' }; // 20
const greyOption = { color: 'grey' }; // 40
const blueOption = { color: 'blue' }; // 50

const geofenceModule = {
  checkColor: function checkColor(type: number): any {
    if (type >= 10 && type < 20) {
      return yellowOption;
    } else if (type === 20) {
      return orangeOption;
    } else if (type === 30) {
      return redOption;
    } else if (type === 50) {
      return blueOption;
    } else return greyOption;
  },
  checkStatus: function checkStatus(type: number): string {
    if (type >= 10 && type < 20) {
      return 'Slow zone';
    } else if (type === 20) {
      return 'Parking forbidden';
    } else if (type === 30) {
      return 'Driving forbidden';
    } else if (type === 50) {
      return 'Parking';
    } else return 'Inactive zone';
  },
};

export default geofenceModule;
