import 'react-leaflet-cluster';
import { createPathComponent } from '@react-leaflet/core';
import L from 'leaflet';

// eslint-disable-next-lineclear
const MarkerClusterGroup = createPathComponent(({ children: _c, ...props }, ctx) => {
  const clusterProps: Record<string, any> = {};
  const clusterEvents: Record<string, any> = {};

  console.log(_c);

  // Splitting props and events to different objects
  Object.entries(props).forEach(([propName, prop]) =>
    propName.startsWith('on') ? (clusterEvents[propName] = prop) : (clusterProps[propName] = prop),
  );

  // Creating markerClusterGroup Leaflet element
  const markerClusterGroup = L.markerClusterGroup(clusterProps);

  // Initializing event listeners
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    markerClusterGroup.on(clusterEvent, callback);
  });

  return {
    instance: markerClusterGroup,
    context: { ...ctx, layerContainer: markerClusterGroup },
  };
});

export default MarkerClusterGroup;
