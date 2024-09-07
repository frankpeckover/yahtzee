import React, { useState } from 'react';
import '../styles/yahtzee.css';
import '../styles/footer.css';

export function PlayerNumberField(props) {

    const [isDisabled, setIsDisabled] = useState(false);

	return (
		<input
            style={{ backgroundColor: isDisabled ? 'black' : 'none' }}
            onDoubleClick={() => {setIsDisabled(true) }}
            disabled={isDisabled}
            type="number"
            onChange={props.onChange}
            name={props.name}
            placeholder={props.placeholder ? props.placeholder : props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            min={0}
            max={props.base * 5}
        />
	);
}
