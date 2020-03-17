import React from 'react';
import PropTypes from 'prop-types';
import './Point.css';

function Point(props) {
    const handleMouseDown = () => props.onMouseDown(props.number);

    return (
        <g className="point" transform={`translate(${props.x}, ${props.y})`}
           onMouseDown={handleMouseDown} onMouseUp={props.onMouseUp}>
            <circle className="point_circle" r="20"/>
            <text alignmentBaseline="central" textAnchor="middle"
                  className="point_content">{props.number}</text>
        </g>
    )
}

Point.propTypes = {
    number: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired
};

export const PointContainer = React.memo(Point);
