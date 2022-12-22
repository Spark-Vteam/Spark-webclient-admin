export interface PricingInterface {
  id: string;
  Type: string;
  Description: string;
  Start: number;
  Minute: number;
  Parking: number;
  DiscountStartFee: number;
  DiscountEndParkingZone: number;
  DiscountEndCharging: number;
}

export interface PricingProps {
  pricing: PricingInterface[];
}
