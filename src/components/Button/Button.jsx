import React from 'react';
import './Button.css';

/** props: {size: 'small' | 'large', color: 'none' | 'grey'} */
export function Button(props) {
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
