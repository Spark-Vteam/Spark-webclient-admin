import { useEffect, useState } from 'react';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';
import L from 'leaflet';
// import { Bike, DataProps } from '../interfaces/maps';
import Active from '../img/pin/Activedot.png';

export default function BikeMarker({ data }: any) {
  const lat = data.Position.split(',')[0];
  const lng = data.Position.split(',')[1];
  const [prevPos, setPrevPos] = useState<any>([lat, lng]);

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  const icon = L.icon({
    iconSize: [20, 20],
    popupAnchor: [2, -20],
    iconUrl: Active,
  });

  return (
    <>
      <LeafletTrackingMarker
        icon={icon}
        position={[lat, lng]}
        previousPosition={prevPos}
        duration={5000}
        keepAtCenter={false}
        rotationAngle={0}
      ></LeafletTrackingMarker>
    </>
  );
}
