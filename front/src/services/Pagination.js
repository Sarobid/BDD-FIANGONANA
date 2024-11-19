import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import "./style.css";

function PaginationComponent({ numActive, totalCount, rowsPerPage, onPage }) {
    
    const handlePageClick = (pageNumber) => {
        if (onPage && pageNumber !== numActive) {
            onPage(pageNumber);
        }
    };

    const renderPaginationItems = () => {
        //alert(totalCount+" "+rowsPerPage)
        const totalPage = Math.ceil(totalCount / rowsPerPage); // Calcul du nombre total de pages
        let items = [];
        let deb = 1;
        if(numActive > 1){
            deb = numActive - 1;
        }
        let count = 0;
        for (let page = deb; page <= totalPage; page++) {
            count++;
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === numActive}
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </Pagination.Item>
            );
            if(count === 5 ){
                break;
            }
        }
        return items;
    };
    const [items,setItems] = useState([])
    useEffect(() => {
        setItems(renderPaginationItems());
    }, [numActive, totalCount, rowsPerPage]);
    
    return (
        <div className="d-flex flex-column align-items-center">
            <p>{`Total : ${totalCount}`}</p>
            <Pagination>{items.map((item) => item)}</Pagination>
        </div>
    );
}

PaginationComponent.propTypes = {
    numActive: PropTypes.number.isRequired,  // Page active actuelle
    totalCount: PropTypes.number.isRequired, // Nombre total de lignes sans pagination
    rowsPerPage: PropTypes.number.isRequired, // Nombre de lignes par page
    onPage: PropTypes.func.isRequired,       // Callback pour gérer le changement de page
};

export default PaginationComponent;
