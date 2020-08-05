import React from 'react';
import './player.css';

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
			grandTotal: 0
		};
		console.log(this.state);
	}

	handleChange = (event) => {
		if (event.target.value === '' || event.target.value === null) {
			this.setState(
				{
					[event.target.name]: 0
				},
				this.topSubTotal
			);
		} else {
			this.setState(
				{
					[event.target.name]: parseInt(event.target.value)
				},
				this.topSubTotal
			);
		}
	};

	handleCheckbox = (event) => {
		const newArray = this.state[event.target.name];
		newArray[0] = !newArray[0];
		this.setState(
			{
				[event.target.name]: newArray
			},
			this.topSubTotal
		);
		console.log(this.state);
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

	render() {
		return (
			<div className="player">
				<div style={({ display: 'flex' }, { height: '25px' }, { width: '100%' })}>
					<input className="name-input" type="text" placeholder="Player name..." />
					<button className="name-button">OK</button>
				</div>
				<div className="scores">
					<input type="number" onChange={this.handleChange} name="ones" placeholder="Ones" min="0" max="5" />
					<input type="number" onChange={this.handleChange} name="twos" placeholder="Twos" min="0" max="10" />
					<input
						type="number"
						onChange={this.handleChange}
						name="threes"
						placeholder="Threes"
						min="0"
						max="15"
					/>
					<input
						type="number"
						onChange={this.handleChange}
						name="fours"
						placeholder="Fours"
						min="0"
						max="20"
					/>
					<input
						type="number"
						onChange={this.handleChange}
						name="fives"
						placeholder="Fives"
						min="0"
						max="25"
					/>
					<input
						type="number"
						onChange={this.handleChange}
						name="sixes"
						placeholder="Sixes"
						min="0"
						max="30"
					/>
					<p>
						<strong>{this.state.topSubTotal}</strong>
					</p>
					<p>
						<strong>{this.state.bonus[0] ? 'Bonus Achieved!' : 'Score too low'}</strong>
					</p>
					<p>
						<strong>{this.state.topTotal}</strong>
					</p>

					<input
						type="number"
						onChange={this.handleChange}
						name="threeKind"
						placeholder="3 of a kind"
						min="0"
						max="30"
					/>
					<input
						type="number"
						onChange={this.handleChange}
						name="fourKind"
						placeholder="4 of a kind"
						min="0"
						max="30"
					/>
					<input type="checkbox" onChange={this.handleCheckbox} name="fullHouse" />
					<input type="checkbox" onChange={this.handleCheckbox} name="shortStraight" />
					<input type="checkbox" onChange={this.handleCheckbox} name="longStraight" />
					<input
						type="number"
						onChange={this.handleChange}
						name="chance"
						placeholder="Chance"
						min="0"
						max="30"
					/>
					<input type="checkbox" onChange={this.handleCheckbox} name="yahtzee" />
					<input type="checkbox" onChange={this.handleCheckbox} name="yahtzeeBonus" />
					<p>
						<strong>{this.state.bottomTotal}</strong>
					</p>
					<p>
						<strong>{this.state.grandTotal}</strong>
					</p>
				</div>
			</div>
		);
	}
}
