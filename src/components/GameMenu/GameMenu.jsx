import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../Button';
import './GameMenu.css';

export function GameMenu(props) {
    return (
        <div className="full-screen screen-content-center">
            <Button onClick={props.onGameStart}>
                {props.buttonText}
            </Button>
        </div>
    )
}

GameMenu.propTypes = {
    onGameStart: PropTypes.func.isRequired
};
