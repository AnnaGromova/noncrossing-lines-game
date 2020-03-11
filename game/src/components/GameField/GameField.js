import React from 'react';
import {Point} from '../Point/Point';
import {Line} from '../Line/Line';
import './GameField.css';

const config = require('../../config');
const configPoints = config.points;
const configEdges = config.edges;

export class GameField extends React.Component {
    state = {
        points: configPoints
    };

    pointId = 0;

    getPoints = () => {
        return (
            Object.entries(this.state.points)
                .map(([number, {x, y}], index) => <Point number={number} x={x} y={y} id={index + 1} onmousedown={this.addMoveListener} onmouseup={this.removeMoveListener} />)
        )
    };

    getEdges = () => {
        return (
            Object.entries(configEdges).map(([point, linkedPoints]) => {
                return (
                    linkedPoints.map(linkedPoint =>
                        <Line
                            x1={this.state.points[point].x}
                            y1={this.state.points[point].y}
                            x2={this.state.points[linkedPoint].x}
                            y2={this.state.points[linkedPoint].y}
                        />
                    )
                )
            })
        )
    };

    checkCrossing = () => {
        let lookedPoints = [];
        let isContainCrossing = false;
        Object.entries(configEdges).forEach(([point, linkedPoints]) => {
            lookedPoints.push(point);
            linkedPoints.forEach(linkedPoint => {
                Object.entries(configEdges).forEach(([secondPoint, secondLinkedPoints]) => {
                    secondLinkedPoints.forEach(secondLinkedPoint => {
                        if (linkedPoint !== secondPoint
                            && linkedPoint !== secondLinkedPoint
                            && lookedPoints.indexOf(secondPoint) === -1) {
                            if (this.isCrossingEdges(point, linkedPoint, secondPoint, secondLinkedPoint))
                                isContainCrossing = true;
                        }
                    });
                });
            });
        });

        return isContainCrossing;
    };

    isCrossingEdges = (point, linkedPoint, secondPoint, secondLinkedPoint) => {
        const x1 = this.state.points[point].x;
        const y1 = this.state.points[point].y;
        const x2 = this.state.points[linkedPoint].x;
        const y2 = this.state.points[linkedPoint].y;
        const x3 = this.state.points[secondPoint].x;
        const y3 = this.state.points[secondPoint].y;
        const x4 = this.state.points[secondLinkedPoint].x;
        const y4 = this.state.points[secondLinkedPoint].y;
        const k1 = (y2-y1)/(x2-x1);
        const k2 = (y4-y3)/(x4-x3);
        if (Math.abs(k1 - k2) > 0.000009) {
            const b1 = y1 - k1 * x1;
            const b2 = y3 - k2 * x3;
            const crossingX = (b1 - b2) / (k2 - k1);
            const crossingY = k1 * crossingX + b1;
            if (crossingX > 0
                && crossingY > 0
                && crossingX > Math.min(x1, x2)
                && crossingX < Math.max(x1, x2)
                && crossingY > Math.min(y1, y2)
                && crossingY < Math.max(y1, y2)
                && crossingX > Math.min(x3, x4)
                && crossingX < Math.max(x3, x4)
                && crossingY > Math.min(y3, y4)
                && crossingY < Math.max(y3, y4)) {
                return true;
            }
        }
        return false;
    };

    move = e => {
        this.setState({ points: {...this.state.points, [this.pointId]: { x: e.pageX, y: e.pageY }} });
    };

    addMoveListener = (pointId) => {
        this.pointId = pointId;
        document.addEventListener('mousemove', this.move);
    };

    removeMoveListener = () => {
        document.removeEventListener('mousemove', this.move);
        if (!this.checkCrossing())
            alert("you win!");
    };

    render() {
        return (
            <svg className="field">
                {this.getEdges()}
                {this.getPoints()}
            </svg>
        );
    }
}
