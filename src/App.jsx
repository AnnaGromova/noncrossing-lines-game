import React from 'react';
import './App.css';
import {GameStart} from './components/GameStart';
import {GameField} from './components/GameField';
import {LevelSaver} from "./services/LevelSaver";

const gameStatuses = {
    start: "start",
    running: "running",
    end: "end"
};

class App extends React.Component {
    state = {
        gameStatus: LevelSaver.getLevel() ? gameStatuses.running : gameStatuses.start
    };

    gameStart = () => {
        this.setState({gameStatus: gameStatuses.running});
    };

    gameEnd = () => {
        this.setState({gameStatus: gameStatuses.end});
    };

    renderGameScreen() {
        switch (this.state.gameStatus) {
            case gameStatuses.start:
                return <GameStart onGameStart={this.gameStart} buttonText="начать игру"/>;
            case gameStatuses.running:
                return <GameField onGameEnd={this.gameEnd}/>;
            case gameStatuses.end:
                return <GameStart onGameStart={this.gameStart} buttonText="начать заново"/>;
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="App">
                {this.renderGameScreen()}
            </div>
        );
    }
}

export default App;
