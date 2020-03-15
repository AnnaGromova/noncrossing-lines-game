import React from 'react';
import {Button} from '../Button';

export function GameEnd(props) {
    return (
        <div className="full-screen screen">
            <Button onClick={props.onGameRestart}>
                restart
            </Button>
        </div>
    )
}
