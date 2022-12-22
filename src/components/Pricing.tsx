import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { PricingInterface } from '../interfaces/pricing';
import pricingModel from '../models/pricingModel';
import PricingForm from './PricingForm'; // Lägg till import för PricingForm
import './css/PricingTable.css';
import Toast from './Toast';

function Pricing() {
  const [pricing, setPricing] = useState<Array<PricingInterface>>([]);
  const [selectedPricing, setSelectedPricing] = useState<PricingInterface | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
    DiscountStartFree: number;
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
      discountStartFree: values.DiscountStartFree,
      minute: values.Minute,
      parking: values.Parking,
      start: values.Start,
      type: values.Type,
    };
    try {
      await pricingModel.updatePricing(values.id, newValues);
      setToastMessage('Pricing updated successfully!');
      setShowToast(true);
      setSelectedPricing(null);
      await fetchPricing();
    } catch (error) {
      console.error(error);
      setToastMessage('Could not update pricing, try again.');
      setShowToast(true);
    }
  };
  return (
    <>
      <Navbar />
      {showToast && <Toast message={toastMessage} />}
      <div className='table-wrapper'>
        {selectedPricing && <PricingForm initialValues={selectedPricing} onSubmit={handleUpdate} />}
        <table className='pricing-table'>
          <thead className='pricing-table-head'>
            <tr className='pricing-table-row'>
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
          <tbody className='pricing-table-body'>
            {pricing.map((p) => (
              <tr key={p.id}>
                <td>{p.Description}</td>
                <td>{p.DiscountEndCharging}</td>
                <td>{p.DiscountEndParkingZone}</td>
                <td>{p.DiscountStartFree}</td>
                <td>{p.Minute}</td>
                <td>{p.Parking}</td>
                <td>{p.Start}</td>
                <td>{p.Type}</td>
                <td>
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
