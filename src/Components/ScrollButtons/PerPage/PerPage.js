import React from 'react';

const perPage = ({resetPagination}) => {
    return (
        <div>
            <select id="page-numbers" onChange={(e) => {
                resetPagination(e)}}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
            </select>
            <label htmlFor="page-numbers">Entries per page</label>
        </div>
    )
}

export default perPage;