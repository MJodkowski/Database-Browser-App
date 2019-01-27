import React from 'react';
import './PageButton.css';

const pageButton = props => {
    return (
        <button className="page-button" disabled={props.disabled} onClick={() => props.clickHandler(props.number)}>{props.number}</button>
    );
}

export default pageButton;