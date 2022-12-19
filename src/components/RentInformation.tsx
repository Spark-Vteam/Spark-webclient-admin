import { Fragment } from 'react';

function RentInformation({ rents }: any) {
  function getDate(currentDate: string) {
    const date = new Date(currentDate);
    const dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return dateMDY;
  }

  function getCity(coordinates: string) {
    if (coordinates.split(',')[0][1] === '5') {
      return 'Lund';
    }
    return 'Stockholm';
  }

  function timeDifference(timestamp1: string, timestamp2: string) {
    // Konvertera tidsstämpeln till ett Date-objekt
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    // Konvertera datumen till millisekunder med hjälp av getTime()
    const date1InMilliseconds = date1.getTime();
    const date2InMilliseconds = date2.getTime();

    // Beräkna skillnaden i millisekunder
    const differenceInMilliseconds = Math.abs(date1InMilliseconds - date2InMilliseconds);

    // Konvertera millisekunder till minuter och sekunder
    const minutes = Math.floor(differenceInMilliseconds / 1000 / 60);
    const seconds = Math.floor(differenceInMilliseconds / 1000) % 60;

    // Returnera resultatet som en sträng i formatet "X minuter Y sekunder"
    return `${minutes} minutes and ${seconds} seconds`;
  }

  return (
    <div className='rent-container'>
      <h3>Rent information</h3>
      <h4>
        <strong>Amount of trips:</strong> {rents.length}
      </h4>
      <hr />
      {rents.map((rent: any) => (
        <Fragment key={rent.id}>
          <strong>Date: </strong>
          {getDate(rent.StartTimestamp)}
          <br />
          <strong>Price: </strong>
          {rent.Price} SEK
          <br />
          <strong>City: </strong>
          {getCity(rent.Start)}
          <br />
          <strong>Duration: </strong>
          {timeDifference(rent.DestinationTimestamp, rent.StartTimestamp)}
          <hr />
        </Fragment>
      ))}
    </div>
  );
}

export default RentInformation;
