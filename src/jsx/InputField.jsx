import React from 'react';
import '../styles/player.css';
import '../styles/yahtzee.css';

export default class InputField extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
            <input
                onDoubleClick={this.handleDoubleClick}
                type="number"
                onChange={this.handleValueChange}
                name="ones"
                placeholder="Ones"
                min="0"
                max="5"
            />
		);
	}
}
