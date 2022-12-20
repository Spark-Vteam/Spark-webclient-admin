import { useState } from 'react';

function SearchForm(props: any) {
  const [searchString, setSearchString] = useState('');

  const allMarkers = props.markers;

  function handleSubmit(event: any) {
    event.preventDefault();

    const foundMarker = allMarkers.filter((marker: any) => String(marker.id) === searchString);
    if (foundMarker.length !== 0) {
      const marker = allMarkers.filter((marker: any) => String(marker.id) === searchString);
      const getMarker = marker[0];
      console.log(getMarker);
      props.map.current.setView(
        [getMarker.Position.split(',')[0], getMarker.Position.split(',')[1]],
        18,
      );
    }
  }

  return (
    <div className='search-bike'>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          placeholder='Search by bike id...'
          type='text'
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
        <button className='search-bike-btn' type='submit'>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
