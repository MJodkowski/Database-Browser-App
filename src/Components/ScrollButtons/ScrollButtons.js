import React from 'react';
import './ScrollButtons.css';

const scrollButtons = (props) => {
    const displayLeft = props.pageButtons[0] === 1 ? true : false,
          displayRight = props.pageButtons[1] === props.pages ? true : false;
    if (props.pages > 10) {
        return (
        <div className="scroll-buttons">
            <button disabled={displayLeft} onClick={() => props.scroll("endleft")}>{"<<<"}</button>
            <button disabled={displayLeft} onClick={() => props.scroll("left", 10)}>{"<<"}</button>
            <button disabled={displayLeft} onClick={() => props.scroll("left", 1)}>{"<"}</button>
                {props.children}
            <button disabled={displayRight} onClick={() => props.scroll("right", 1)}>{">"}</button>
            <button disabled={displayRight} onClick={() => props.scroll("right", 10)}>{">>"}</button>
            <button disabled={displayRight} onClick={() => props.scroll("endright")}>{">>>"}</button>
        </div>
    )} else return props.children;
}

export default scrollButtons;