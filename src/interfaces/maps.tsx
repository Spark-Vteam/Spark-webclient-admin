export interface Bike {
  id: number;
  Position: string;
  Battery: number;
  Status: number;
  City: string;
}

export interface User {
  id: number;
  Balance: number;
  EmailAdress: string;
  FirstName: string;
  LastName: string;
  Oauth: string;
  PartialPayment: number;
  Password: string;
  PhoneNumber: string;
}

export interface Station {
  id: number;
  Name: string;
  City: string;
  Position: string;
  Available: number;
  Occupied: number;
}

export interface GeofenceInterface {
  id: number;
  Coordinates: string;
  Info: string;
  Type: number;
}

export interface SingleRent {
  Bikes_id: number;
  Destination: string;
  DestinationTimestamp: string;
  Price: number;
  Start: string;
  StartTimestamp: string;
  Status: number;
  Users_id: number;
  id: number;
}

export interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export interface GeofenceProps {
  geofence: GeofenceInterface[];
}

export interface BikeProps {
  filteredBikes: Bike[];
}

export interface ActiveBikeProps {
  activeBikes: Bike[];
}

export interface DataProps {
  data: Bike;
}

export interface StationProps {
  stations: Station[];
}

export interface SingleRentProps {
  rents: SingleRent[];
}
