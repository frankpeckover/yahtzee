import React from 'react';
import './yahtzee.css';
import './footer.css';
import './Rules.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCopyright } from '@fortawesome/free-solid-svg-icons';

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
			starHolder: null
		};
	}

	componentDidMount = () => {
		this.setState({
			starHolder: document.getElementById('starHolder')
		});
	};

	toggleStars = () => {
		this.setState(
			{
				creatingStars: !this.state.creatingStars
			},
			this.createStar
		);
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
			<div className="footer fill column" id="starHolder">
				<button className="center" onClick={this.toggleStars}>
					<FontAwesomeIcon icon={faStar} />
				</button>
				<p className="center">
					<FontAwesomeIcon icon={faCopyright} />
					DUALITY 2020
				</p>
			</div>
		);
	}
}
