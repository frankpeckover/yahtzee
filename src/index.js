import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));

draggable(document.getElementById('dice'));

function draggable(element) {
	console.log(element);
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
