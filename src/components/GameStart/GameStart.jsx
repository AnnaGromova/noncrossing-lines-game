import React from 'react';
import {Button} from '../Button';
import './GameStart.css';

export function GameStart(props) {
    return (
        <div className="full-screen screen">
            <Button onClick={props.onGameStart}>
                {props.buttonText}
            </Button>
        </div>
    )
}
