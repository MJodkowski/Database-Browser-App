import React from 'react';
import './PageButton.css';

const pageButton = props => {
    const {disabled, number, clickHandler} = props;
    return (
        <button className="page-button" disabled={disabled} onClick={() => clickHandler(number)}>{number}</button>
    );
}

export default pageButton;