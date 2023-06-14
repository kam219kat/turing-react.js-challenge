import React from 'react';

const Paginater = ({
  totalPages,
  hasPrevPage,
  prevPage,
  hasNextPage,
  nextPage,
  page,
}) =>
  page != totalPages ? (
    <div className="contactInfoPaginatorWrapper">
      <div>
        Page {page} of {totalPages}
      </div>
      <div>
        <button disabled={hasPrevPage} onClick={prevPage}>
          prev
        </button>
        <button disabled={hasNextPage} onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  ) : (
    <></>
  );

export default Paginater;
