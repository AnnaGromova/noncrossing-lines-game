import React from 'react';

export class Line extends React.Component {
    render() {
        return (
            <line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2}
                  stroke="#d5d5d5" stroke-width="3" />
        )
    }
}