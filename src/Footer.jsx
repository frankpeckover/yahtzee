import React from 'react';
import './yahtzee.css';
import './footer.css';
import './Rules.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCopyright } from '@fortawesome/free-solid-svg-icons';
import Rules from './Rules.jsx';

export default class Footer extends React.Component {
	constructor() {
		super();
		this.state = {
			colours: [
				'#00ffd9',
				'#00fbff',
				'#00ffa6'
			],
			creatingStars: true,
			starHolder: null,
			scoresToShow: 10,
			scores: []
		};
	}

	componentDidMount = () => {
		this.setState({
			starHolder: document.getElementById('starHolder')
		});
		this.getScores();
	};

	toggleStars = () => {
		this.setState(
			{
				creatingStars: !this.state.creatingStars
			},
			this.createStar
		);
	};

	getScores = () => {
		const URL = '/scores';
		fetch(URL)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ scores: this.bubbleSort(data) });
			})
			.catch((err) => console.log(`Cannot connect because: ${err}`));
	};

	bubbleSort = (data) => {
		let swapped = true;
		while (swapped) {
			swapped = false;
			for (let i = 1; i < data.length; i++) {
				if (data[i].score > data[i - 1].score) {
					swapped = true;
					data = this.swap(data, i, i - 1);
				}
			}
		}
		return data;
	};

	swap = (array, indexOne, indexTwo) => {
		let newArr = [
			...array
		];
		let temp = newArr[indexOne];
		newArr[indexOne] = newArr[indexTwo];
		newArr[indexTwo] = temp;
		return newArr;
	};

	createStar = () => {
		var star = document.createElement('div');
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let size = Math.floor(Math.random() * Math.floor(3)) + 1;
		let pos = Math.floor(Math.random() * (w - size * 2) + size);
		let animationDuration = size ** 0.5 * 20;
		let colour = this.state.colours[Math.floor(Math.random() * this.state.colours.length)];
		star.classList.add('star');
		star.classList.add('center');
		star.style.boxShadow = `${size}px ${size}px ${size}px ${size}px ${colour}`;
		star.style.left = `${pos}px`;
		star.style.animationDuration = `${animationDuration}s`;
		this.state.starHolder.appendChild(star);

		setTimeout(() => {
			this.state.starHolder.removeChild(star);
		}, animationDuration * 1000);

		if (this.state.creatingStars) {
			setTimeout(() => {
				this.createStar();
			}, 300);
		}
	};

	render() {
		return (
			<div className="footer column">
				<button id="starHolder" className="center" onClick={this.toggleStars}>
					<FontAwesomeIcon icon={faStar} />
				</button>
				<div className="score-rules-div">
					<div id="scores" className="column scores-data-container">
						<h3>Player Scores</h3>
						{this.state.scores.map((entry, i) => {
							if (i < this.state.scoresToShow) {
								return (
									<div key={i} className="score-div fill">
										<p>{entry.username}</p>
										<p>:</p>
										<p>{entry.score}</p>
									</div>
								);
							}
						})}
					</div>
					<div style={{ textAlign: 'left', padding: '1%' }} className="center">
						<Rules />
					</div>
				</div>
				<p className="center">
					<FontAwesomeIcon icon={faCopyright} />
					Website by Amalgam 2020. All rights reserved
				</p>
			</div>
		);
	}
}
