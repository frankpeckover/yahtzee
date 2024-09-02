import React from 'react';
import '../styles/yahtzee.css';
import Player from './Player';
import ScoreGuide from './ScoreGuide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

export default class Yahtzee extends React.Component {
	constructor() {
		super();
		this.state = {
			players: [0, 1, 2].map(id => React.createRef())
		};
	}

	//this actually needs to be on the client side
	submitScore = (state) => {
		fetch('/save-score', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(state)
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));
	}

	submitAllScores = () => {
		this.state.players.forEach(playerRef => {
			this.submitScore(playerRef.current.state)
		});
	}

	clearPlayers = () => {
		this.setState({
			players: [0, 1, 2].map(id => React.createRef()), // Reset refs for 3 players
		});
	}

	addPlayer = () => {
		if (this.state.players.length < 6) {
			this.setState(prevState => ({
				players: [...prevState.players, React.createRef()]
			}));
		}
	};

	removePlayer = () => {
		if (this.state.players.length > 1) {
			this.setState(prevState => ({
				players: prevState.players.slice(0, -1)
			}));
		}
	};

	render() {
		return (
			<div>
				<div className="blocker">
					<p className="blocker-text">Error 404: Mobile Display Not Found</p>
				</div>
				<div className="title">
					<h1>Yahtzee Score Sheet</h1>
				</div>
				<div className="fill align-top" style={{ padding: '1%' }}>
					<ScoreGuide />
					{this.state.players.map((ref, index) => (
						<Player index={index} key={index} ref={ref} />
					))}
					<div className="column player-buttons" style={{ padding: '1%' }}>
						<button className="player-control-button" onClick={this.addPlayer}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
						<button className="player-control-button" onClick={this.removePlayer}>
							<FontAwesomeIcon icon={faMinus} />
						</button>
						<button className="player-control-button" onClick={() => {
							this.submitAllScores();
							this.clearPlayers();
							}}>
							<FontAwesomeIcon icon={faSync} />
						</button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
