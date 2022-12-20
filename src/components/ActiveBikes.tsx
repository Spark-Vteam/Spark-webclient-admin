import { Fragment } from 'react';
import BikeMarker from './BikeMarker';
import { Bike, ActiveBikeProps } from '../interfaces/maps';

function ActiveBikes({ activeBikes }: ActiveBikeProps) {
  return (
    <div>
      {activeBikes.map((bike: Bike) => (
        <Fragment key={bike.id}>
          <BikeMarker data={bike ?? {}}> </BikeMarker>
        </Fragment>
      ))}
    </div>
  );
}

export default ActiveBikes;
