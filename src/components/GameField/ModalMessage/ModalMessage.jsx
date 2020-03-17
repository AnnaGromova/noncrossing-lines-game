import React from 'react';
import {Button} from "../../Button";
import PropTypes from 'prop-types';
import './ModalMessage.css';

export class ModalMessage extends React.Component {
    render() {
        return (
            <div className="screen-content-center full-screen animation-fade-in modal">
                <div className="modal_message">
                    {this.props.message}
                </div>
                <Button onClick={this.props.buttonOnClick}>
                    продолжить
                </Button>
            </div>
        )
    }
}

ModalMessage.propTypes = {
    message: PropTypes.string,
    buttonOnClick: PropTypes.func.isRequired
};
