import React from 'react';

const Rules = () => {
	return (
		<div style={{ padding: '0 5%' }}>
			<h3 className="center" style={{ color: 'white' }}>
				-- Rules --
			</h3>
			<p>
				Yahtzee is played in a similar manner to poker. Each player takes turns at rolling the die a maximum of
				3 times in an attempt to create the height scoring combination as seen on the score sheet. The player
				with the heighest grand total at the end of the game is the winner.
				<br />
				-Scoring-
				<br />
				Ones, Twos, Threes, Fours, Fives and Sixes - Sum up the total off each respective number. ie, if you
				rolled 3, 4's add 12 to the Fours row
				<br />
				3 of a kind, 4 of a kind, Chance - Sum the entire set of die. ie, 3, 4, 1, 3, 3 would total 14 for 3 of
				a kind
				<br />
				Full House, Long Straight, Short Straight and Yahtzee - There are fixed values for each off these rows,
				simply check the box
			</p>
		</div>
	);
};

export default Rules;
