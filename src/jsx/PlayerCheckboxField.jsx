import React, { useState } from 'react';
import '../styles/yahtzee.css';
import '../styles/footer.css';

export function PlayerCheckboxField(props) {

    const [isDisabled, setIsDisabled] = useState(false);

	return (
        props.isPrefilled ?
        <p className='justify-left'>{props.isPrefilled[props.name].toString()}</p> :
		<input
            style={{ opacity: isDisabled ? 0 : 100 }}
            onDoubleClick={() => {setIsDisabled(true) }}
            onChange={props.onChange}
            disabled={isDisabled}
            type="checkbox"
            name={props.name}
        />
	);
}
