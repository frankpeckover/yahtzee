import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));

var colours = [
	'#00ffd9'
];
createStar(document.getElementById('starHolder'), colours);

function createStar(starHolder, colours) {
	var star = document.createElement('div');
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let size = Math.floor(Math.random() * Math.floor(3)) + 1;
	let pos = Math.floor(Math.random() * (w - size * 2) + size);
	let animationDuration = size ** 0.5 * 20;
	let colour = colours[Math.floor(Math.random() * colours.length)];
	star.classList.add('star');
	star.classList.add('center');
	star.style.boxShadow = `${size}px ${size}px ${size}px ${size}px ${colour}`;
	star.style.left = `${pos}px`;
	star.style.animationDuration = `${animationDuration}s`;
	starHolder.appendChild(star);

	setTimeout(() => {
		starHolder.removeChild(star);
	}, animationDuration * 1000);

	setTimeout(() => {
		createStar(starHolder, colours);
	}, 0.5 * 1000);
}

draggable(document.getElementById('dice'));

function draggable(element) {
	var isMouseDown = false;

	var mouseX;
	var mouseY;

	var elementX = 0;
	var elementY = 0;

	element.addEventListener('mousedown', onMouseDown);

	function onMouseDown(event) {
		mouseX = event.clientX;
		mouseY = event.clientY;
		isMouseDown = true;
	}

	element.addEventListener('mouseup', onMouseUp);

	function onMouseUp(event) {
		isMouseDown = false;
		elementX = parseInt(element.style.left) || 0;
		elementY = parseInt(element.style.top) || 0;
	}

	element.addEventListener('mousemove', onMouseMove);

	function onMouseMove(event) {
		if (!isMouseDown) return;
		var deltaX = event.clientX - mouseX;
		var deltaY = event.clientY - mouseY;
		element.style.left = elementX + deltaX + 'px';
		element.style.top = elementY + deltaY + 'px';
	}
}
