import React from 'react';

const perPage = props => {
    return (
        <div>
            <select id="page-numbers" onChange={(e) => {
                props.resetPagination(e)}}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
            </select>
            <label for="page-numbers">Entries per page</label>
        </div>
    )
}

export default perPage;