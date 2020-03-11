import React from 'react';
import './Point.css';

export class Point extends React.Component {
    render() {
        return (
            <g className="point" transform={`translate(${this.props.x}, ${this.props.y})`}
               onMouseDown={() => this.props.onmousedown(this.props.id)} onMouseUp={this.props.onmouseup}>
                <circle r="20" fill="#d5d5d5" />
                <text fill="#000" alignmentBaseline="central" textAnchor="middle" className="point_content">{this.props.number}</text>
            </g>
        )
    }
}
