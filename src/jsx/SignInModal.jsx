import React from 'react';
import '../styles/yahtzee.css';
import '../styles/modal.css';

const AuthenticationMode = {
    REGISTER: 'register',
    LOGIN: 'login',
    GUEST: 'guest'
}

export default class SignInModal extends React.Component {

	constructor() {
		super();
		this.state = {
			authenticationMode: AuthenticationMode.LOGIN,
            username: '',
			password: ''
		};
	}

	submitLogIn = (e) => {
        e.preventDefault();
		fetch(`/${this.state.authenticationMode}`, {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json()
        .then(data => ({ 
            status: response.status, 
            body: data
        })))
		.then(obj => {
            if (obj) {
                if (obj.status === 200)
                {
                    this.props.onLogin(obj.body.username)
                }
                console.log(`${obj.body.message}`)
                //Set a message popup here with obj.body.message
            }
        })
		.catch(error => console.error('Error:', error));
	}

    submitGuest = (e) => {
        e.preventDefault();
        this.props.onLogin(this.state.username)
    }

    handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}    

    renderSwitch = (authenticationMode) => {
        switch (authenticationMode) {
            case AuthenticationMode.LOGIN:
                return (
                <form onSubmit={this.submitLogIn}>
                    <input 
                        type='text' 
                        name='username'
                        id={`username_${this.props.index}`}
                        value={this.state.username} 
                        placeholder='Username'
                        onChange={this.handleInputChange}>
                    </input>
                    <input 
                        type='password' 
                        name='password'
                        id={`password_${this.props.index}`}
                        value={this.state.password}
                        onChange={this.handleInputChange}>
                    </input>
                    <button type='submit'>{ (this.state.authenticationMode).toUpperCase() }</button>
                </form>
                )
                break;
            case AuthenticationMode.REGISTER:
                return (
                <form onSubmit={this.submitLogIn}>
                    <input 
                        type='text' 
                        name='username'
                        id={`username_${this.props.index}`}
                        value={this.state.username} 
                        placeholder='Username'
                        onChange={this.handleInputChange}>
                    </input>
                    <input 
                        type='password' 
                        name='password'
                        id={`password_${this.props.index}`}
                        value={this.state.password}
                        onChange={this.handleInputChange}>
                    </input>
                    <button type='submit'>{ (this.state.authenticationMode).toUpperCase() }</button>
                </form>
                )
                break;
            case AuthenticationMode.GUEST:
                return (
                <form id={"authentication-form"} onSubmit={this.submitGuest}>
                    <input 
                        type='text' 
                        name='username'
                        id={`username_${this.props.index}`} 
                        value={this.state.username} 
                        placeholder='Guest Name'
                        onChange={this.handleInputChange}>
                    </input>
                    <button type='submit'>{ (this.state.authenticationMode).toUpperCase() }</button>
                    </form>
                )
                break;
            default:
                break;
        } 
    }

    render() {
		return (
			<div 
                style={{ display: this.props.visible ? 'block' : 'none' }} 
                className='signin-modal'>
                <div>
                    <button  
                        style={{ fontSize: '0.75em' }}
                        onClick={ () => this.setState({ authenticationMode: AuthenticationMode.LOGIN }) }>
                        LOGIN</button>
                    <button 
                        style={{ fontSize: '0.75em' }}
                        onClick={ () => this.setState({ authenticationMode: AuthenticationMode.REGISTER }) }>
                        REGISTER</button>
                    <button 
                        style={{ fontSize: '0.75em' }}
                        onClick={ () => this.setState({ authenticationMode: AuthenticationMode.GUEST }) }>
                        GUEST</button>
                </div>
                { this.renderSwitch(this.state.authenticationMode) }          
            </div>
		);
	}
}
