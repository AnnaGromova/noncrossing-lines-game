import React from 'react';
import './Point.css';

function Point(props) {
    const handleMouseDown = () => props.onmousedown(props.number);

    return (
        <g className="point" transform={`translate(${props.x}, ${props.y})`}
           onMouseDown={handleMouseDown} onMouseUp={props.onmouseup}>
            <circle r="20" fill="#d8d8d8"/>
            <text fill="#969696" alignmentBaseline="central" textAnchor="middle"
                  className="point_content">{props.number}</text>
        </g>
    )
}

export const PointContainer = React.memo(Point);
