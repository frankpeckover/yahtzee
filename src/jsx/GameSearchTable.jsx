import React from 'react';
import '../styles/yahtzee.css';
import '../styles/footer.css';

export function GameSearchTable(props) {
	return (
		<table className="game-search-table">
            {props.games.length <= 0 ? <p style={{width: '100%', margin: 'auto'}}>No games Found</p> : null}
            <thead>
                <tr>
                    <th style={{ margin : 'auto' }} scope='col'>GameID</th>
                    <th style={{ margin : 'auto' }} scope='col'># Players</th>
                    <th style={{ margin : 'auto' }} scope='col'>Status</th>
                    <th style={{ margin : 'auto' }} scope='col'>Date Played</th>
                    <th style={{ margin : 'auto' }} scope='col'></th>
                </tr>
            </thead>
            <tbody>
                {props.games.map((game, index) => (
                    <tr	key={index}>
                        <td style={{ margin : 'auto' }}>{game.gameID}</td>
                        <td style={{ margin : 'auto' }}>{game.numPlayers}</td>
                        <td style={{ margin : 'auto' }}>{game.status.toString()}</td>
                        <td style={{ margin : 'auto' }}>{game.dateCreated}</td>
                        <td style={{ margin : 'auto' }}><button type="button" onClick={ () => props.clickHandler(game.gameID) }>View</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
	);
}
