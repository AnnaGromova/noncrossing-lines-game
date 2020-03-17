import React from 'react';
import PropTypes from 'prop-types';

function Line(props) {
    return (
        <line x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2}
              stroke="#d8d8d8" strokeWidth="3"/>
    )
}

Line.propTypes = {
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired
};

export const LineContainer = React.memo(Line);
