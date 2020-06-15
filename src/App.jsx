import React from 'react';
import './App.css';
import Player from './Player.jsx';
import ScoreGuide from './ScoreGuide';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            players: [<Player key={0}/>]
        }
    }

    addPlayer = () => {
        this.setState ({
            players: [...this.state.players, <Player key={this.state.players.length}/>]
        })
    }

    removePlayer = () => {
        this.setState ({
            players: this.state.players.slice(1)
        })
    }

    render() {
        return (
            <div>
                <div className="title">
                    <h1>Yahtzee Score Sheet</h1>
                </div>
                <div className='score-board'> 
                    <ScoreGuide />
                    {this.state.players}
                </div>
                <div className="button-div">
                    <button className="player-control" onClick={this.addPlayer}>Add Player</button>
                    <button className="player-control" onClick={this.removePlayer}>Remove Player</button>
                </div>
            </div>
        );
    }
}
