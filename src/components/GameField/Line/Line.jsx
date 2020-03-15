import React from 'react';

function Line(props) {
    return (
        <line x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2}
              stroke="#d8d8d8" strokeWidth="3"/>
    )
}

export const LineContainer = React.memo(Line);
