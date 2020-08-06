import React from 'react';
import './App.css';
import Player from './Player';
import ScoreGuide from './ScoreGuide';
import Dice from './Dice';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			players: [
				<Player key={0} />
			],
			dice: [
				<Dice roll={this.roll} key={0} />,
				<Dice key={1} />,
				<Dice key={2} />,
				<Dice key={3} />,
				<Dice key={4} />
			]
		};
	}

	addPlayer = () => {
		if (this.state.players.length < 6) {
			this.setState({
				players: [
					...this.state.players,
					<Player key={this.state.players.length} />
				]
			});
		}
	};

	removePlayer = () => {
		if (this.state.players.length > 1) {
			this.setState({
				players: this.state.players.slice(0, this.state.players.length - 1)
			});
		}
	};

	render() {
		return (
			<div>
				<div className="title">
					<h1>Yahtzee Score Sheet</h1>
				</div>
				<div className="fill align-top" style={{ padding: '1%' }}>
					<ScoreGuide />
					{this.state.players}
				</div>
				<div className="fill center" style={{ padding: '1%' }}>
					<button className="player-control-button" onClick={this.addPlayer}>
						Add Player
					</button>
					<button className="player-control-button" onClick={this.removePlayer}>
						Remove Player
					</button>
				</div>
				<div className="dice fill center">{this.state.dice}</div>
				<button href="#" onClick={this.roll}>
					-- Roll --
				</button>
			</div>
		);
	}
}
