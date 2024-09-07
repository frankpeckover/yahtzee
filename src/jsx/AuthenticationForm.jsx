import React from 'react';

function AuthenticationForm (props) {
	return (
        <form onSubmit={props.submitLogIn}>
            <input 
                type='text' 
                name='username'
                id={`username_${props.index}`}
                value={props.username} 
                placeholder='Username'
                onChange={props.handleInputChange}>
            </input>
            { props.passwordRequired ? 
            (<input 
                type='password' 
                name='password'
                id={`password_${props.index}`}
                value={props.password}
                onChange={props.handleInputChange}>
            </input>) : null }
            <button type='submit'>{ (props.authenticationMode).toUpperCase() }</button>
        </form>
    )
}

export default AuthenticationForm;