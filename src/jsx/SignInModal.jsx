import React from 'react';
import '../styles/yahtzee.css';
import '../styles/modal.css';
import AuthenticationForm from './AuthenticationForm';

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
                    this.props.onLogin(obj.body.userID, obj.body.username)
                }
                console.log(`${obj.body.message}`)
                this.timeMessageText(obj.body.message)
            }
        })
		.catch(error => console.error('Error:', error));
	}

    submitGuest = (e) => {
        e.preventDefault();
        if (this.state.username.length > 13)
        {
            console.log(`Username contains too many characters`)
            return;
        }
        this.props.onLogin(1, this.state.username)
    }

    handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}    

    timeMessageText = (message) => {
        var text = document.getElementById('message');
        text.innerHTML = message
        text.style.display = 'block'
        setTimeout(() => {
            text.style.display = 'none'
        }, 3000)
    }

    render() {
		return (
			<div 
                style={{ display: this.props.visible ? 'block' : 'none' }} 
                className='signin-modal'>
                <h3 id={`message`} style={{ color: 'red', fontSize: '0.75em', display: 'none' }}>
                    MESSAGE HERE
                </h3>
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
                <AuthenticationForm 
                    passwordRequired={ this.state.authenticationMode == AuthenticationMode.GUEST ? false : true } 
                    authenticationMode={this.state.authenticationMode}
                    index={this.props.index}
                    username={this.state.username}
                    password={this.state.password}
                    handleInputChange={this.handleInputChange}
                    submitLogIn={ this.state.authenticationMode == AuthenticationMode.GUEST ? this.submitGuest : this.submitLogIn }/>         
            </div>
		);
	}
}
