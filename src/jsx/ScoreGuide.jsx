import React from 'react';
import '../styles/scoreGuide.css';
import '../styles/yahtzee.css';

export default class ScoreGuide extends React.Component {
	render() {
		return (
			<div className="score-guide">
				<label>Ones</label>
				<label>Twos</label>
				<label>Threes</label>
				<label>Fours</label>
				<label>Fives</label>
				<label>Sixes</label>
				<label>
					<strong>TOP SUB TOTAL</strong>
				</label>
				<label>
					<strong>BONUS</strong>
				</label>
				<label>
					<strong>TOP TOTAL</strong>
				</label>

				<label>3 of a kind</label>
				<label>4 of a kind</label>
				<label>Full House</label>
				<label>Short Straight</label>
				<label>Long Straight</label>
				<label>Chance</label>
				<label>Yahtzee</label>
				<label>Yahtzee Bonus</label>
				<label>
					<strong>BOTTOM TOTAL</strong>
				</label>
				<label>
					<strong>GRAND TOTAL</strong>
				</label>
			</div>
		);
	}
}
