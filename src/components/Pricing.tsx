import { Fragment } from 'react';
import { Station, StationProps } from '../interfaces/maps';
import { useState, useEffect } from 'react';
import { PricingInterface, PricingProps } from '../interfaces/pricing';

function Pricing({ pricing }: PricingProps) {


  return (
    <>
      <div className='table-wrapper'>
        <p>Pricing</p>
      </div>
    </>
  );
}

export default Pricing;
