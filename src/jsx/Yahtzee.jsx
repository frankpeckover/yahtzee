import React from 'react';
import '../styles/yahtzee.css';
import Player from './Player';
import ScoreGuide from './ScoreGuide';
import GameSearchModal from './GameSearchModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faSync, faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

export default class Yahtzee extends React.Component {
	constructor() {
		super();
		this.state = {
			players: [0, 1, 2].map(id => React.createRef()),
			gameSearchModal: false
		};
	}

	//this actually needs to be on the client side
	saveGame = (states) => {
		fetch('/save-game', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(states)
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));
	}

	submitAllScores = () => {
		let states = [];
		this.state.players.forEach(playerRef => {
			states.push(playerRef.current.state)
		});
		this.saveGame(states)
		//console.log(`States for saving: ${states}`)
	}

	toggleGameSearch = () => {
		this.setState({gameSearchModal: !this.state.gameSearchModal})
	}

	clearPlayers = () => {
		// Clear all players first
		this.setState({ players: [] }, () => {
			// Optionally, add initial players after clearing
			this.setState({ players: [0, 1, 2].map(id => React.createRef()) });
		});
	}

	addPlayer = () => {
		if (this.state.players.length < 6) {
			this.setState(prevState => ({
				players: [...prevState.players, React.createRef()]
			}));
		}
		//console.log(`Added player: ${this.state.players}`)
	};

	removePlayer = () => {
		if (this.state.players.length > 1) {
			this.setState(prevState => ({
				players: prevState.players.slice(0, -1)
			}));
		}
		//console.log(`Removed player: ${this.state.players}`)
	};

	render() {
		return (
			<div>
				<div className="blocker">
					<p className="blocker-text">Error 404: Mobile Display Not Found</p>
				</div>
				{this.state.gameSearchModal ? <GameSearchModal /> : null}
				<div className="title">
					<h1>Yahtzee Score Sheet</h1>
				</div>
				<div className="fill align-top" style={{ padding: '1%' }}>
					<ScoreGuide />
					{this.state.players.map((ref, index) => (
						<Player score={null} index={index} key={index} ref={ref} />
					))}
					<div className="column player-buttons" style={{ padding: '1%' }}>
						<button className="player-control-button" onClick={this.addPlayer}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
						<button className="player-control-button" onClick={this.removePlayer}>
							<FontAwesomeIcon icon={faMinus} />
						</button>
						<button className="player-control-button" onClick={this.submitAllScores}>
							<FontAwesomeIcon icon={faUpload} />
						</button>
						<button className="player-control-button" onClick={this.toggleGameSearch}>
							<FontAwesomeIcon icon={faDownload} />
						</button>
						<button className="player-control-button" onClick={this.clearPlayers}>
							<FontAwesomeIcon icon={faSync} />
						</button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
