import React from 'react';
import PropTypes from 'prop-types';
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

Point.propTypes = {
    number: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onmousedown: PropTypes.func.isRequired,
    onmouseup: PropTypes.func.isRequired
};

export const PointContainer = React.memo(Point);
