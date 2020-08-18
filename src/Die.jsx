import React from 'react';
import './die.css';

const Die = (props) => (
	<div
		id={props.identifier}
		onClick={props.toggleRoll}
		style={props.roll ? { border: '1px solid var(--colour-primary)' } : { border: '2px solid red' }}
		className="die"
	>
		<p className="center fill">{props.value}</p>
	</div>
);

export default Die;
