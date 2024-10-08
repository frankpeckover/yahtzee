import React, { useState, useEffect } from 'react';
import '../styles/yahtzee.css';
import '../styles/modal.css';
import ReactDOM from 'react-dom';
import Player from './Player';
import ScoreGuide from './ScoreGuide';

import { GameSearchTable } from './GameSearchTable';

function GameSearchModal() {

    const [games, setGames] = useState([]);
    const [scores, setScores] = useState([]);
    const [username, setUsername] = useState('');

    const loadGamesByUsername = (e) => {

        if (username == false)
        {
            return
        }

        e.preventDefault();

		fetch(`/games?username=${username}`, {
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			}
		})
		.then(response => response.json())
		.then(data => {
            //console.log(data);
            setGames(data); 
        })
		.catch(error => console.error('Error:', error));
	}

    const loadScoresByGameID = (gameID) => {

        if (gameID == false)
        {
            console.log(gameID)
            return
        }

		fetch(`/game?gameID=${gameID}`, {
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			}
		})
		.then(response => {
            //console.log(response);
            return response.json();
        })
		.then(data => {
            setScores(data)
        })
		.catch(error => console.error('Error:', error));
	}

    useEffect(() => {
        if (scores.length > 0) {
            displayGame();  // This runs only when scores are updated
        }
    }, [scores]);

    const displayGame = () => {
        const secondaryWindow = window.open('', '_blank');
        secondaryWindow.document.open();

        secondaryWindow.document.write(`
        <html>
            <head>
                <title>Previous Game</title>
                <link rel="stylesheet" href="http://localhost:82/static/css/main.9b9c421a.chunk.css" />
            </head>
            <body>
                <div id="scheduling-grid"></div>
            </body>
        </html>
        `);

        const secondaryRoot = secondaryWindow.document.getElementById('scheduling-grid');

        const secondaryRootInstance = ReactDOM.createRoot(secondaryRoot);

        secondaryRootInstance.render(
            <div className="fill align-top" style={{ padding: '1%'}}>
                <ScoreGuide />
                {scores.map((score, index) => (
                    <Player index={index} score={score} />
                ))}
            </div>
        )
    }

	return (
        <div className='game-search-modal'>

            <form style={{height: '35px'}} onSubmit={loadGamesByUsername}>
                <input 
                    style={{width: '80%', height: '100%'}}
                    type='text' 
                    name='username'
                    id={`username`}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'>
                </input>
                <button 
                    style={{height: '100%'}}
                    type='submit'>Search</button>
            </form>

            <GameSearchTable games={ games } clickHandler={ 
                (gameID) => { loadScoresByGameID(gameID) }} />

        </div>
    )
}

export default GameSearchModal;