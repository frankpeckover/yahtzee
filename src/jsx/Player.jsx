import React from 'react';
import '../styles/player.css';
import '../styles/yahtzee.css';
import SignInModal from './SignInModal';

export default class Player extends React.Component {

	scoreValues = {
		fullHouse: 25,
		shortStraight: 30,
		longStraight: 40,
		yahtzee: 50,
		yahtzeeBonus: 100,
		bonus: 35,
	};

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

			bonus: false,
			topSubTotal: 0,
			topTotal: 0,

			threeKind: 0,
			fourKind: 0,
			fullHouse: false,
			shortStraight: false,
			longStraight: false,
			chance: 0,
			yahtzee: false,
			yahtzeeBonus: false,
						
			bottomTotal: 0,
			
			grandTotal: 0,

			isModalVisible: false
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
		this.setState(
			{
				[event.target.name]: !this.state[event.target.name]
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
		let value = this.state.bonus ? this.state.topSubTotal + this.scoreValues.bonus : this.state.topSubTotal;
		this.setState(
			{
				topTotal: value
			},
			this.bottomTotal
		);
	};

	bonus = () => {
		this.setState(
			{
				bonus: this.state.topSubTotal >= 63
			},
			this.topTotal
		);
	};

	bottomTotal = () => {
		let value =
			this.state.threeKind +
			this.state.fourKind +
			this.state.chance +
			(this.state.fullHouse ? this.scoreValues.fullHouse : 0) +
			(this.state.shortStraight ? this.scoreValues.shortStraight : 0) +
			(this.state.longStraight ? this.scoreValues.longStraight : 0) +
			(this.state.yahtzee ? this.scoreValues.yahtzee : 0) +
			(this.state.yahtzeeBonus ? this.scoreValues.yahtzeeBonus : 0);
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

	handleDoubleClick = (event) => {
		let target = event.target;
		target.style.background = 'black';
		target.disabled = true;

		if (target.type === 'checkbox') {
			target.style.opacity = '0';
		}
	};

	handleLogin = (name) => {
		this.setState({ playerName: name })
		this.toggleSignInModal();
	}

	toggleSignInModal = () => {
        this.setState((prevState) => ({
            isModalVisible: !prevState.isModalVisible,
        }));
    };

	render() {
		return (
			<div className="player">
				<SignInModal 
					visible={this.state.isModalVisible} 
					id={`modal ${this.props.index}`} 
					index={this.props.index} 
					onLogin={this.handleLogin} 
					onToggleSignInModal={this.toggleSignInModal}/>
				<div id="nameField" className="fill center name-input-div">
					{this.state.playerName === '' ? (
						<div className="fill center">
							<button onClick={this.toggleSignInModal} className="name-button">
							SET NAME
						</button>
					</div>
					) : (
						<h2 style={{ paddingBottom: '1%' }}>
						{this.state.playerName}
						</h2>
					)}
				</div>
				<div className="scores">
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="ones"
						placeholder="Ones"
						min="0"
						max="5"
					/>
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="twos"
						placeholder="Twos"
						min="0"
						max="10"
					/>
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="threes"
						placeholder="Threes"
						min="0"
						max="15"
					/>
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="fours"
						placeholder="Fours"
						min="0"
						max="20"
					/>
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="fives"
						placeholder="Fives"
						min="0"
						max="25"
					/>
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="sixes"
						placeholder="Sixes"
						min="0"
						max="30"
					/>
					<p className="justify-left">{this.state.topSubTotal}</p>
					<p className="justify-left">
						{this.state.bonus ? 'Bonus Achieved!' : `Score too low (${63 - this.state.topSubTotal}) `}
					</p>
					<p className="justify-left" style={{ borderBottom: '2px solid var(--colour-primary)' }}>
						{this.state.topTotal}
					</p>

					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="threeKind"
						placeholder="3 of a kind"
						min="0"
						max="30"
					/>
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="fourKind"
						placeholder="4 of a kind"
						min="0"
						max="30"
					/>
					<div className="fill justify-left">
						<input
							onDoubleClick={this.handleDoubleClick}
							type="checkbox"
							onChange={this.handleCheckbox}
							name="fullHouse"
						/>
					</div>
					<div className="fill justify-left">
						<input
							onDoubleClick={this.handleDoubleClick}
							type="checkbox"
							onChange={this.handleCheckbox}
							name="shortStraight"
						/>
					</div>
					<div
						style={this.state.longStraight ? { animation: 'pulse 500ms 5' } : null}
						className="fill justify-left"
					>
						<input
							onDoubleClick={this.handleDoubleClick}
							type="checkbox"
							onChange={this.handleCheckbox}
							name="longStraight"
						/>
					</div>
					<input
						onDoubleClick={this.handleDoubleClick}
						type="number"
						onChange={this.handleValueChange}
						name="chance"
						placeholder="Chance"
						min="0"
						max="30"
					/>
					<div
						style={this.state.yahtzee ? { animation: 'shake 500ms 5' } : null}
						className="fill justify-left"
					>
						<input
							onDoubleClick={this.handleDoubleClick}
							type="checkbox"
							onChange={this.handleCheckbox}
							name="yahtzee"
						/>
					</div>
					<div className="fill justify-left">
						<input
							onDoubleClick={this.handleDoubleClick}
							type="checkbox"
							onChange={this.handleCheckbox}
							name="yahtzeeBonus"
						/>
					</div>
					<p className="justify-left">{this.state.bottomTotal}</p>
					<p className="justify-left">{this.state.grandTotal}</p>
				</div>
			</div>
		);
	}
}
