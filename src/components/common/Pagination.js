import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  paginate,
  currentPage,
  pagesToShow,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const showPrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const showNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  // Calculate the range of page numbers to display
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  // Generate the array of page numbers to display
  const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
    (num) => startPage + num
  );

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={showPrevious}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={showNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
