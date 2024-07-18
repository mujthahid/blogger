import React from 'react';
import { Button } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';


const Pagination = ({ currentPage, totalPages, onPageChange, pagesToShow = 10 }) => {
    const pageNeighbours = Math.floor(pagesToShow / 2);

    const handlePageChange = (page) => {
        onPageChange(page);
        window.scrollTo(0, 0);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = Math.max(1, currentPage - pageNeighbours); i <= Math.min(totalPages, currentPage + pageNeighbours); i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                {currentPage > 1 && (

                    <Button data-testid="skip-previous-button" onClick={() => handlePageChange(currentPage - 1)}>
                        <SkipPreviousIcon htmlColor='black' />
                    </Button>

                )}
                {pageNumbers.map((page) => (
                    <Button sx={{ color: 'black' }} data-testid={`page-button-${page}`} key={page} onClick={() => handlePageChange(page)} disabled={currentPage === page}>
                        {page}
                    </Button>
                ))}
                {currentPage + pagesToShow <= totalPages && (
                    <>
                        <Button data-testid="skip-next-button" onClick={() => handlePageChange(currentPage + 1)}>
                            <SkipNextIcon htmlColor='black' />
                        </Button>
                    </>
                )}
            </>
        );
    };

    return (
        <div>
            {renderPagination()}
        </div>
    );
};

export default Pagination;
