import React from 'react';
import './Login.scss';
import { post } from '../utils/apiBase';
import SearchUser from './SearchUser';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            userName: '',
            password: '',
            errorMsg: ''
        };
    }
    onUserNameChange = (e) => {
        this.setState({
            userName: e.target.value
        });
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onLogin = () => {
        const { userName, password } = this.state;
        if(userName && password) {
            const loginResPromise = post('v60/admin/session', {
                username: userName,
                credential: password
            });
            loginResPromise.then(res => {
                this.setState({
                    res,
                    loginSuccess: true
                })
            }).catch((err) => {
                this.setState({
                    isError: true,
                    err,
                    loginSuccess: false,
                    errorMsg: 'Please contact the system Administrator at extension 1001 to create a new login or reset your password'
                })
            })
        }
    }

    render() {
        const { userName, password, isError, errorMsg, loginSuccess } = this.state;

        if(loginSuccess) {
            return <SearchUser />;
        }

        return (
            <div className="LoginBox">
                <div className="loginForm">
                    <h3 className="loginTitle">Login</h3>
                    <input className="userName formField" placeholder="User Name" onChange={ this.onUserNameChange } value={ userName }/>
                    <input type="password" className="password formField" placeholder="Password" value={ password } onChange={ this.onPasswordChange }></input>
                    <div className="formField">
                        <button className="loginBtn" onClick={ this.onLogin }>Login</button>
                    </div>
                    <div className="loginError">
                     { isError ? <span className="errMsg">{errorMsg}</span> : null }
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;