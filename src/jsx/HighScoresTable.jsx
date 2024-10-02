import React from 'react';
import '../styles/yahtzee.css';
import '../styles/footer.css';

export function HighScoresTable(props) {
	return (
		<table className="high-score-table">
			<thead>
				<tr>
					<th scope='col'>Player Name</th>
					<th scope='col'>Grand Total</th>
				</tr>
			</thead>
			<tbody>
				{props.scores.map((score, index) => (
					<tr	key={index}>
						<td style={{ margin : 'auto' }}>{score.PlayerName}</td>
						<td style={{ margin : 'auto' }}>{score.GrandTotal}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
