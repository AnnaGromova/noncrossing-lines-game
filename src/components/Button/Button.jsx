import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/** props: {size: 'small' | 'large', color: 'none' | 'grey'} */
function Button(props) {
    return (
        <button onClick={props.onClick} className={`button button--${props.size} button--color-${props.color}`}>
            {props.children}
        </button>
    )
}

Button.defaultProps = {
    size: 'large',
    color: 'grey'
};

Button.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export const ButtonContainer = React.memo(Button);
