import { useState } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

function DrawGeofence() {
  const [mapLayers, setMapLayers] = useState<Array<any>>([]);

  // Insert coordinates in database
  /**
   * Create geofence on map
   * @param {any} e Position to create geofence
   * @returns {void}
   */
  function _onCreate(e: any): void {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const { leafletId } = layer;

      setMapLayers((layers) => [...layers, { id: leafletId, latlngs: layer.getLatLngs()[0] }]);
    }
  }

  // Update coordinates in database
  /**
   * Update geofence on map
   * @param {any} e Position to create geofence
   * @returns {void}
   */
  function _onEditPath(e: any): void {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ leafletId, editing }: any) => {
      setMapLayers((layers) =>
        layers.map((l) => (l.id === leafletId ? { ...l, latlngs: { ...editing.latlngs[0] } } : l)),
      );
    });
  }

  // Delete coordinates in database
  /**
   * Delete geofence on map
   * @param {any} e Position to create geofence
   * @returns {void}
   */
  function _onDeleted(e: any): void {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ leafletId }: any) => {
      setMapLayers((layers) =>
        layers.filter((layers) => layers.filter((l: any) => l.id !== leafletId)),
      );
    });
  }
  return (
    <div>
      <FeatureGroup>
        <EditControl
          position='topright'
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
      </FeatureGroup>{' '}
      <pre className='text-left'>{JSON.stringify(mapLayers)}</pre>
    </div>
    
  );
}

export default DrawGeofence;
