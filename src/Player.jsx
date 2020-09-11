import React from 'react';
import './player.css';
import './yahtzee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

export default class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerName: '',
			ones: 0,
			twos: 0,
			threes: 0,
			fours: 0,
			fives: 0,
			sixes: 0,
			threeKind: 0,
			fourKind: 0,
			fullHouse: [
				false,
				25
			],
			shortStraight: [
				false,
				30
			],
			longStraight: [
				false,
				40
			],
			chance: 0,
			yahtzee: [
				false,
				50
			],
			yahtzeeBonus: [
				false,
				100
			],

			bonus: [
				false,
				35
			],
			topSubTotal: 0,
			topTotal: 0,
			bottomTotal: 0,
			grandTotal: 0,
			nameSubmit: false,
			scoreForm: false
		};
	}

	handleValueChange = (event) => {
		let target = event.target;
		let num = 0;
		if (target.value === '' || target.value === null) {
			num = 0;
		} else {
			num = Math.min(Math.max(parseInt(target.value), 0), parseInt(target.max));
		}
		this.setState(
			{
				[target.name]: num
			},
			() => {
				this.topSubTotal();
				this.editElement(target);
			}
		);
	};

	editElement(target) {
		target.style.backgroundSize = `${this.state[target.name] / parseInt(target.max) * 100}% 1px`;
	}

	handleCheckbox = (event) => {
		const newArray = this.state[event.target.name];
		newArray[0] = !newArray[0];
		this.setState(
			{
				[event.target.name]: newArray
			},
			this.topSubTotal
		);
	};

	topSubTotal = () => {
		let value =
			this.state.ones +
			this.state.twos +
			this.state.threes +
			this.state.fours +
			this.state.fives +
			this.state.sixes;
		this.setState(
			{
				topSubTotal: value
			},
			this.bonus
		);
	};

	topTotal = () => {
		let value = this.state.bonus[0] ? this.state.topSubTotal + this.state.bonus[1] : this.state.topSubTotal;
		this.setState(
			{
				topTotal: value
			},
			this.bottomTotal
		);
	};

	bonus = () => {
		if (this.state.topSubTotal >= 63) {
			this.setState(
				{
					bonus: [
						true,
						this.state.bonus[1]
					]
				},
				this.topTotal
			);
		} else {
			this.setState(
				{
					bonus: [
						false,
						this.state.bonus[1]
					]
				},
				this.topTotal
			);
		}
	};

	bottomTotal = () => {
		let value =
			this.state.threeKind +
			this.state.fourKind +
			this.state.chance +
			(this.state.fullHouse[0] ? this.state.fullHouse[1] : 0) +
			(this.state.shortStraight[0] ? this.state.shortStraight[1] : 0) +
			(this.state.longStraight[0] ? this.state.longStraight[1] : 0) +
			(this.state.yahtzee[0] ? this.state.yahtzee[1] : 0) +
			(this.state.yahtzeeBonus[0] ? this.state.yahtzeeBonus[1] : 0);
		this.setState(
			{
				bottomTotal: value
			},
			this.grandTotal
		);
	};

	grandTotal = () => {
		let value = this.state.topTotal + this.state.bottomTotal;
		this.setState({
			grandTotal: value
		});
	};

	handleTextChange = (event) => {
		this.setState({ playerName: event.target.value });
	};

	toggleNameChange = () => {
		if (this.state.playerName === '') {
			return;
		}
		this.setState({
			nameSubmit: !this.state.nameSubmit
		});
	};

	toggleScoreForm = () => {
		this.setState({
			scoreForm: !this.state.scoreForm
		});
	};

	submitForm = (e) => {
		e.preventDefault();
		let form = new FormData(e.target);
		let request = { username: form.get('username'), password: form.get('password'), score: form.get('score') };
		console.log(request);
		var URL = '/scores';
		var xhr = new XMLHttpRequest();
		xhr.open('POST', URL, true);
		xhr.onload = () => {
			console.log(xhr.responseText);
		};

		xhr.onerror = (err) => {
			console.log(err);
		};

		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(request));
	};

	render() {
		return (
			<div className="player">
				<div id="nameField" className="fill center name-input-div">
					{this.state.nameSubmit ? (
						<h2 style={{ paddingBottom: '1%' }} onClick={this.toggleNameChange}>
							{this.state.playerName.toUpperCase()}
						</h2>
					) : (
						<div className="fill center">
							<input
								onChange={this.handleTextChange}
								className="name-input"
								type="text"
								placeholder="Player name..."
							/>
							<button onClick={this.toggleNameChange} className="name-button">
								OK
							</button>
						</div>
					)}
				</div>
				<div className="scores">
					<input
						type="number"
						onChange={this.handleValueChange}
						name="ones"
						placeholder="Ones"
						min="0"
						max="5"
					/>
					<input
						type="number"
						onChange={this.handleValueChange}
						name="twos"
						placeholder="Twos"
						min="0"
						max="10"
					/>
					<input
						type="number"
						onChange={this.handleValueChange}
						name="threes"
						placeholder="Threes"
						min="0"
						max="15"
					/>
					<input
						type="number"
						onChange={this.handleValueChange}
						name="fours"
						placeholder="Fours"
						min="0"
						max="20"
					/>
					<input
						type="number"
						onChange={this.handleValueChange}
						name="fives"
						placeholder="Fives"
						min="0"
						max="25"
					/>
					<input
						type="number"
						onChange={this.handleValueChange}
						name="sixes"
						placeholder="Sixes"
						min="0"
						max="30"
					/>
					<p className="justify-left">{this.state.topSubTotal}</p>
					<p className="justify-left">
						{this.state.bonus[0] ? 'Bonus Achieved!' : `Score too low (${63 - this.state.topSubTotal}) `}
					</p>
					<p className="justify-left" style={{ borderBottom: '2px solid var(--colour-primary)' }}>
						{this.state.topTotal}
					</p>

					<input
						type="number"
						onChange={this.handleValueChange}
						name="threeKind"
						placeholder="3 of a kind"
						min="0"
						max="30"
					/>
					<input
						type="number"
						onChange={this.handleValueChange}
						name="fourKind"
						placeholder="4 of a kind"
						min="0"
						max="30"
					/>
					<div className="fill justify-left">
						<input type="checkbox" onChange={this.handleCheckbox} name="fullHouse" />
					</div>
					<div className="fill justify-left">
						<input type="checkbox" onChange={this.handleCheckbox} name="shortStraight" />
					</div>
					<div
						style={this.state.longStraight[0] ? { animation: 'pulse 500ms 5' } : null}
						className="fill justify-left"
					>
						<input type="checkbox" onChange={this.handleCheckbox} name="longStraight" />
					</div>
					<input
						type="number"
						onChange={this.handleValueChange}
						name="chance"
						placeholder="Chance"
						min="0"
						max="30"
					/>
					<div
						style={this.state.yahtzee[0] ? { animation: 'shake 500ms 5' } : null}
						className="fill justify-left"
					>
						<input type="checkbox" onChange={this.handleCheckbox} name="yahtzee" />
					</div>
					<div className="fill justify-left">
						<input type="checkbox" onChange={this.handleCheckbox} name="yahtzeeBonus" />
					</div>
					<p className="justify-left">{this.state.bottomTotal}</p>
					<p className="justify-left">{this.state.grandTotal}</p>
					{this.state.scoreForm ? (
						<div className="score-form fill center">
							<form id="scoreForm" onSubmit={(e) => this.submitForm(e)}>
								<input name="username" id="username" type="text" placeholder="Username.." />
								<input name="password" id="password" type="password" placeholder="Password.." />
								<input name="score" type="text" value={this.state.grandTotal} readOnly />
								<button>Submit</button>
							</form>
						</div>
					) : null}
					<button className="score-form-button" onClick={this.toggleScoreForm}>
						<FontAwesomeIcon icon={faArchive} />
					</button>
				</div>
			</div>
		);
	}
}
