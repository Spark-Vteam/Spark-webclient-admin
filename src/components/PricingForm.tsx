import React, { useState } from 'react';

interface Props {
  initialValues: {
    Description: string;
    DiscountEndCharging: number;
    DiscountEndParkingZone: number;
    DiscountStartFree: number;
    Minute: number;
    Parking: number;
    Start: number;
    Type: string;
    id: string;
  };
  onSubmit: (values: {
    Description: string;
    DiscountEndCharging: number;
    DiscountEndParkingZone: number;
    DiscountStartFree: number;
    Minute: number;
    Parking: number;
    Start: number;
    Type: string;
    id: string;
  }) => void;
}

const PricingForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className='pricing-container'>
      <form className='pricing-form' onSubmit={handleSubmit}>
        <legend>Update pricing</legend>
        <div style={{ display: 'block' }}>
          <label htmlFor='Description' />
          Description:
        </div>
        <div style={{ display: 'block' }}>
          <input
            type='text'
            name='Description'
            value={formValues.Description}
            onChange={handleChange}
          />
        </div>
        <br />
        <div style={{ display: 'block' }}>
          <label htmlFor='DiscountEndCharging' />
          DiscountEndCharging:
        </div>
        <div style={{ display: 'block' }}>
          <input
            type='number'
            name='DiscountEndCharging'
            value={formValues.DiscountEndCharging}
            onChange={handleChange}
          />
        </div>
        <br />
        <div style={{ display: 'block' }}>
          <label htmlFor='DiscountEndParkingZone' />
          DiscountEndParkingZone:
        </div>
        <div style={{ display: 'block' }}>
          <input
            type='number'
            name='DiscountEndParkingZone'
            value={formValues.DiscountEndParkingZone}
            onChange={handleChange}
          />
        </div>
        <br />
        <div style={{ display: 'block' }}>
          <label htmlFor='DiscountStartFree' />
        </div>
        DiscountStartFree:
        <div style={{ display: 'block' }}>
          <input
            type='number'
            name='DiscountStartFree'
            value={formValues.DiscountStartFree}
            onChange={handleChange}
          />
        </div>
        <br />
        <div style={{ display: 'block' }}>
          <label htmlFor='Minute' />
        </div>
        Minute:
        <div style={{ display: 'block' }}>
          <input type='number' name='Minute' value={formValues.Minute} onChange={handleChange} />
        </div>
        <br />
        <div style={{ display: 'block' }}>
          <label htmlFor='Parking' />
        </div>
        Parking:
        <div style={{ display: 'block' }}>
          <input type='number' name='Parking' value={formValues.Parking} onChange={handleChange} />
        </div>
        <br />
        <div style={{ display: 'block' }}>
          <label htmlFor='Start' />
        </div>
        Start:
        <div style={{ display: 'block' }}>
          <input type='number' name='Start' value={formValues.Start} onChange={handleChange} />
        </div>
        <br />
        <div style={{ display: 'block' }}>
          <label htmlFor='Type' />
        </div>
        Type:
        <div style={{ display: 'block' }}>
          <input type='text' name='Type' value={formValues.Type} onChange={handleChange} />
        </div>
        <br />
        <div className='btn-container-login'>
          <button className='btn-logout' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PricingForm;
