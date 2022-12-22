import React, { useState } from 'react';

interface Props {
  initialValues: {
    Description: string;
    DiscountEndCharging: number;
    DiscountEndParkingZone: number;
    DiscountStartFee: number;
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
    DiscountStartFee: number;
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
    <form onSubmit={handleSubmit}>
      <label htmlFor='Description'>
        Description:
        <input
          type='text'
          name='Description'
          value={formValues.Description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor='DiscountEndCharging'>
        DiscountEndCharging:
        <input
          type='number'
          name='DiscountEndCharging'
          value={formValues.DiscountEndCharging}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor='DiscountEndParkingZone'>
        DiscountEndParkingZone:
        <input
          type='number'
          name='DiscountEndParkingZone'
          value={formValues.DiscountEndParkingZone}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor='DiscountStartFree'>
        DiscountStartFree:
        <input
          type='number'
          name='DiscountStartFree'
          value={formValues.DiscountStartFee}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor='Minute'>
        Minute:
        <input type='number' name='Minute' value={formValues.Minute} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor='Parking'>
        Parking:
        <input type='number' name='Parking' value={formValues.Parking} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor='Start'>
        Start:
        <input type='number' name='Start' value={formValues.Start} onChange={handleChange} />
      </label>
      <br />
      <label htmlFor='Type'>
        Type:
        <input type='text' name='Type' value={formValues.Type} onChange={handleChange} />
      </label>
      <br />
      <button type='submit'>Save</button>
    </form>
  );
};

export default PricingForm;
