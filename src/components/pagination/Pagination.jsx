import React from 'react'

const Pagination = ({ page, setPage, total }) => {

    const handlePrev = (num) => {
        if (page > num) {
            setPage(page - num);
        } else {
            setPage(total);
        };
    };

    const handleNext = (num) => {
        if (page <= total - num) {
            setPage(page + num);
        } else {
            setPage(1);
        };
    };

    const renderPages = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > total) {
            endPage = total;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        };

        const pages = [];

        for (let i = startPage ; i <= endPage ; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className='pagination__btn'
                    style={{ fontWeight: i === page ? 'bold' : 'normal'}}
                >
                    {i}                    
                </button>
            );
        };
        return pages;
    };

  return (
    <div>
      
    </div>
  )
}

export default Pagination
