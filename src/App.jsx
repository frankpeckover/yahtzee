import React from 'react';
import './app.css';
import Player from './Player';
import ScoreGuide from './ScoreGuide';
import DieContainer from './DieContainer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './index.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			players: [
				<Player key={0} />
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
				<div id="starHolder" />
				<div className="blocker center">
					<p style={{ color: 'white' }} className="fill center">
						Error 404: Mobile Display Not Found
					</p>
				</div>
				<div className="nav">
					<a href="" />
				</div>
				<div className="title">
					<h1>Yahtzee Score Sheet</h1>
				</div>
				<div className="fill align-top" style={{ padding: '1%' }}>
					<ScoreGuide />
					{this.state.players}
					<div className="column player-buttons" style={{ padding: '1%' }}>
						<button className="player-control-button" onClick={this.addPlayer}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
						<button className="player-control-button" onClick={this.removePlayer}>
							<FontAwesomeIcon icon={faMinus} />
						</button>
					</div>
				</div>
				<div id="dice" className="dice column">
					<div style={{ margin: '1%' }} className="head">
						<p className="center">Drag Me</p>
					</div>
					<DieContainer />
				</div>
			</div>
		);
	}
}
