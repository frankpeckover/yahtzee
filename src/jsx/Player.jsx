import React from 'react';
import '../styles/player.css';
import '../styles/yahtzee.css';
import SignInModal from './SignInModal';
import { PlayerNumberField } from './PlayerNumberField';
import { PlayerCheckboxField } from './PlayerCheckboxField';

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
		const score = props.score || {};

		this.state = {
			userID: score.userID || 0,
			playerName: score.playerName || '',

			ones: score.ones || 0,
			twos: score.twos || 0,
			threes: score.threes || 0,
			fours: score.fours || 0,
			fives: score.fives || 0,
			sixes: score.sixes || 0,

			bonus: score.bonus || false,
			topSubTotal: score.topSubTotal || 0,
			topTotal: score.topTotal || 0,

			threeKind: score.threeKind || 0,
			fourKind: score.fourKind || 0,
			fullHouse: score.fullHouse || false,
			shortStraight: score.shortStraight || false,
			longStraight: score.longStraight || false,
			chance: score.chance || 0,
			yahtzee: score.yahtzee || false,
			yahtzeeBonus: score.yahtzeeBonus || false,
			bottomTotal: score.bottomTotal || 0,

			grandTotal: score.grandTotal || 0,

			isModalVisible: false,
			isGuest: false
		};
	}

	resetScore = () => {
		this.setState({
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
		})
		//console.log(`Reset state for player: ${this.props.index}`)
	}

	handleValueChange = (event) => {
		let target = event.target;
		
		let num = 0;
		if (target.value === '' || target.value === null) {
			num = 0;
		} else {
			num = Math.min(Math.max(parseInt(target.value), 0), parseInt(target.max));
		}
		this.setState({
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
		this.setState({
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
		this.setState({
				topSubTotal: value
			},
			this.bonus
		);
	};

	topTotal = () => {
		let value = this.state.bonus ? this.state.topSubTotal + this.scoreValues.bonus : this.state.topSubTotal;
		this.setState({
				topTotal: value
			},
			this.bottomTotal
		);
	};

	bonus = () => {
		this.setState({
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
		this.setState({
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

	handleLogin = (id, name) => {
		this.setState({ userID: id, playerName: name })
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
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'ones'} 
						base={1} />
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'twos'} 
						base={2} />
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'threes'} 
						base={3} />
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'fours'} 
						base={4} />
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'fives'} 
						base={5} />
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'sixes'} 
						base={6} />
					<p className="justify-left">{this.state.topSubTotal}</p>
					<p className="justify-left">
						{this.state.bonus ? 'Bonus Achieved!' : `Score too low (${63 - this.state.topSubTotal}) `}
					</p>
					<p className="justify-left" style={{ borderBottom: '2px solid var(--colour-primary)' }}>
						{this.state.topTotal}
					</p>
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'threeKind'} 
						placeholder={'Three of a Kind'}
						base={6} />
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'fourKind'} 
						placeholder={'Four of a Kind'}
						base={6} />
					<div className="fill justify-left">
						<PlayerCheckboxField 
							isPrefilled={this.props.score}
							name={'fullHouse'}
							onChange={this.handleCheckbox} />
					</div>
					<div className="fill justify-left">
						<PlayerCheckboxField 
							isPrefilled={this.props.score}
							name={'shortStraight'}
							onChange={this.handleCheckbox} />
					</div>
					<div className="fill justify-left">
						<PlayerCheckboxField 
							isPrefilled={this.props.score}
							name={'longStraight'}
							onChange={this.handleCheckbox} />
					</div>
					<PlayerNumberField
						isPrefilled={this.props.score}
						onChange={this.handleValueChange} 
						name={'chance'}
						base={6} />
					<div className="fill justify-left">
						<PlayerCheckboxField 
							isPrefilled={this.props.score}
							name={'yahtzee'}
							onChange={this.handleCheckbox}/>
					</div>
					<div className="fill justify-left">
						<PlayerCheckboxField 
							isPrefilled={this.props.score}
							name={'yahtzeeBonus'}
							onChange={this.handleCheckbox}/>
					</div>
					<p className="justify-left">{this.state.bottomTotal}</p>
					<p className="justify-left">{this.state.grandTotal}</p>
				</div>
			</div>
		);
	}
}
