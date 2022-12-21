import { useState } from 'react';
import { Props } from '../interfaces/maps';


const Pagination = (props: Props) => {
  const { currentPage, totalPages, handlePageChange } = props;
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(5);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      if (currentPage - 1 < start) {
        setStart(start - 1);
        setEnd(end - 1);
      }
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
      if (currentPage + 1 > end) {
        setStart(start + 1);
        setEnd(end + 1);
      }
    }
  };

  return (
    <div className='pagination'>
      <button className='next-prev' onClick={handlePreviousClick} disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).slice(start - 1, end).map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active pages' : 'pages'}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button className='next-prev' onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
