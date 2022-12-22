import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { PricingInterface, PricingProps } from '../interfaces/pricing';
import pricingModel from '../models/pricingModel';
import PricingForm from './PricingForm'; // Lägg till import för PricingForm

function Pricing() {
  const [pricing, setPricing] = useState<Array<PricingInterface>>([]);
  const [selectedPricing, setSelectedPricing] = useState<PricingInterface | null>(null); // Lägg till statet selectedPricing och setSelectedPricing

  /**
   * fetch station pricing
   * @returns {Promise<void>}
   */
  async function fetchPricing(): Promise<void> {
    const getPricing = await pricingModel.getPricing();
    setPricing(getPricing);
  }

  useEffect(() => {
    (async () => {
      await fetchPricing();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Lägg till funktionen handleEdit
  const handleEdit = (pricing: PricingInterface) => {
    setSelectedPricing(pricing);
  };

  // Lägg till funktionen handleUpdate
  const handleUpdate = async (values: {
    Description: string;
    DiscountEndCharging: number;
    DiscountEndParkingZone: number;
    DiscountStartFee: number;
    Minute: number;
    Parking: number;
    Start: number;
    Type: string;
    id: string;
  }) => {
    const newValues = {
      description: values.Description,
      discountEndCharging: values.DiscountEndCharging,
      discountEndParkingZone: values.DiscountEndParkingZone,
      discountStartFee: values.DiscountStartFee,
      minute: values.Minute,
      parking: values.Parking,
      start: values.Start,
      type: values.Type,
    };
    await pricingModel.updatePricing(values.id, newValues); // Uppdatera pricing objektet i databasen
    setSelectedPricing(null); // Återställ selectedPricing
    await fetchPricing(); // Hämta uppdaterade prisuppgifter från databasen
  };

  console.log(pricing);
  return (
    <>
      <Navbar />
      <div className='table-wrapper'>
        <p>Pricing</p>
        {/* Rendera formulärkomponenten endast om selectedPricing är inte null */}
        {selectedPricing && <PricingForm initialValues={selectedPricing} onSubmit={handleUpdate} />}
        {/* Lägg till tabell för att visa prisuppgifter */}
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>DiscountEndCharging</th>
              <th>DiscountEndParkingZone</th>
              <th>DiscountStartFree</th>
              <th>Minute</th>
              <th>Parking</th>
              <th>Start</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pricing.map((p) => (
              <tr key={p.id}>
                <td>{p.Description}</td>
                <td>{p.DiscountEndCharging}</td>
                <td>{p.DiscountEndParkingZone}</td>
                <td>{p.DiscountStartFee}</td>
                <td>{p.Minute}</td>
                <td>{p.Parking}</td>
                <td>{p.Start}</td>
                <td>{p.Type}</td>
                <td>
                  {/* Lägg till knappar för att redigera och ta bort prisuppgifter */}
                  <button type='button' onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Pricing;
