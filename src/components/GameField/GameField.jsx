import React from 'react';
import PropTypes from 'prop-types';
import {Point} from './Point';
import {Line} from './Line';
import {Button} from "../Button";
import './GameField.css';
import {IntersectionChecker} from '../../services/IntersectionChecker';
import {LevelsIterator} from '../../services/LevelsIterator';
import icon_refresh from './images/refresh.svg';

export class GameField extends React.Component {
    levelsIterator = new LevelsIterator();
    startState = {
        points: null,
        edges: null
    };
    activePoint = undefined;

    state = this.startState;

    componentDidMount() {
        this.generateNextLevel();
    }

    generateNextLevel() {
        const file = this.levelsIterator.getNextLevel();
        if (file) {
            this.startState = {points: file.points, edges: file.edges};
            this.setState(this.startState);
        } else {
            this.props.onGameEnd();
        }
    }

    setStartState = () => {
        this.setState(this.startState);
    };

    getPoints = () => this.state.points &&
        Object.entries(this.state.points)
            .map(([number, {x, y}]) =>
                <Point
                    key={number}
                    number={number}
                    x={x}
                    y={y}
                    onmousedown={this.setActivePoint}
                    onmouseup={this.removeActivePoint}
                />);

    getEdges = () => this.state.edges &&
        Object.entries(this.state.edges).map(([point, linkedPoints]) =>
            linkedPoints.map(linkedPoint =>
                <Line
                    key={`${point}${linkedPoint}`}
                    x1={this.state.points[point].x}
                    y1={this.state.points[point].y}
                    x2={this.state.points[linkedPoint].x}
                    y2={this.state.points[linkedPoint].y}
                />
            )
        );

    move = e => this.activePoint &&
        this.setState(
            {
                points:
                    {
                        ...this.state.points,
                        [this.activePoint]: {x: e.pageX, y: e.pageY}
                    }
            }
        );

    setActivePoint = pointId => this.activePoint = pointId;

    removeActivePoint = () => {
        this.activePoint = undefined;
        if (!IntersectionChecker.checkCrossing(this.state.points, this.state.edges)) {
            this.generateNextLevel();
        }
    };

    render() {
        return (
            <div className="game-screen">
                <header className="game-screen__header">
                    <div className="level-info">
                        Уровень: {Number(this.levelsIterator.currentLevel) + 1} из {this.levelsIterator.levelsCount}
                    </div>
                    <Button onClick={this.setStartState} size="small" color="none">
                        <img src={icon_refresh} alt="сбросить"/>
                    </Button>
                </header>
                <svg className="full-screen" onMouseMove={this.move}>
                    {this.getEdges()}
                    {this.getPoints()}
                </svg>
            </div>
        );
    }
}

GameField.propTypes = {
    onGameEnd: PropTypes.func.isRequired
};
