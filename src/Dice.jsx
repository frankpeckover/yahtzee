import React from 'react';
import './dice.css';

export default class Dice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roll: true,
			value: 0
		};
	}

	toggleRoll = () => {
		this.setState({
			roll: !this.state.roll
		});
		console.log(this.state);
	};

	roll = () => {
		if (this.state.roll === true) {
			this.setState({
				value: Math.floor(Math.random() * 10)
			});
		}
	};

	render() {
		return (
			<a
				style={this.state.roll ? { border: '1px solid black' } : { border: '2px solid red' }}
				className="die"
				href="#"
				onClick={this.toggleRoll}
			>
				<p className="center fill">{this.state.value}</p>
			</a>
		);
	}
}
