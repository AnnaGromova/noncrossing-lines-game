import React from 'react';
import {Button} from "../../Button";
import PropTypes from 'prop-types';
import './ModalMessage.css';

export function ModalMessage(props) {
    return (
        <div className="screen-content-center full-screen animation-fade-in modal">
            <div className="modal_message">
                {props.message}
            </div>
            <Button onClick={props.onButtonClick}>
                продолжить
            </Button>
        </div>
    )
}

ModalMessage.propTypes = {
    message: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired
};
