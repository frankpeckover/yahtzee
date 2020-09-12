import React from 'react';

const Rules = () => {
	return (
		<div className="fill column">
			<p style={{ marginBottom: '1%' }} className="center">
				-- Rules --
			</p>
			<p className="center">
				Yahtzee is played in a similar manner to poker. Each player takes turns at rolling the die a maximum of
				3 times in an attempt to create the height scoring combination as seen on the score sheet. The player
				with the heighest grand total at the end of the game is the winner.
				<br />
				-Scoring-
				<br />
				Ones, Two, Threes, Fours, Fives and Sixes - Sum up the total off each respective number. ie, if you
				rolled 3, 4's add 12 to the Fours row
				<br />
				3 of a kind, 4 of a kind, chance - Sum the entire set of die. ie, 3, 4, 1, 3, 3 would total 14 for 3 off
				a kind
				<br />
				Full house, Long straight, Short straight and Yahtzee - There are fixed values for each off these rows,
				simply check the box
			</p>
		</div>
	);
};

export default Rules;
