import { useEffect, useState } from 'react';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';
import L, { Popup } from 'leaflet';

import Active from '../img/pin/Active.png';

const icon = L.icon({
  iconSize: [45, 45],
  popupAnchor: [2, -20],
  iconUrl: Active,
});

export default function BikeMarker({ data }: any) {
  const lat = data.Position.split(',')[0];
  const lng = data.Position.split(',')[1];
  const [prevPos, setPrevPos] = useState<any>([lat, lng]);

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <>
      <LeafletTrackingMarker
        icon={icon}
        position={[lat, lng]}
        previousPosition={prevPos}
        duration={2000}
        keepAtCenter={false}
        rotationAngle={0}
      ></LeafletTrackingMarker>
    </>
  );
}
