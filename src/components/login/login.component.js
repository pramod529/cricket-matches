import React, { Component } from "react";
import { authenticateUser } from '../../services/fetchCricketMatches.service';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username : '',
            password:'',
            formErrors:{username:'',password : '',success: ''},
            usernameValid:false,
            passwordValid:false,
            formValid:false,
            submit:false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        
    }
    handleUserInput = (name,value) => {
        this.setState({[name]:value},() => {
            this.validateField(name,value)
        })
    }
    validateField(fieldName,value){
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        fieldValidationErrors.success = '';
        switch(fieldName){
            case 'username':
            if (value && value.length > 0) {
                usernameValid = /^[A-Za-z0-9]{6,10}$/.test(value);
                fieldValidationErrors.username = usernameValid ? '' : 'false';
            } else {
                fieldValidationErrors.username = '';
            } 
            break;
            case 'password':
            if (value && value.length > 0) {
                passwordValid = /^[A-Za-z0-9!@#$%^&*()_]{6,10}$/.test(value);
                fieldValidationErrors.password = passwordValid ? '' : 'false';
            } else {
                fieldValidationErrors.password = '';
            }                
            break;
            default:
            break;
        }
        this.setState({ formErrors:fieldValidationErrors,
                        usernameValid:usernameValid,
                    passwordValid:passwordValid }, this.validateForm);
    }
    validateForm(){
        this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { formValid, username, password, formErrors,submit } = this.state;
        this.setState({ submit:true});
        console.log(formValid);
        if (formValid) {
            authenticateUser(username, password)
            .then(res => {
                this.props.history.push("/dashboard");
                this.props.updateSession(true);
                sessionStorage.setItem("session", "true");
                this.setState({ submit:false});
            })
            .catch(error => {
                console.log('Error in authenticating User:: ', error);
                this.props.history.push("/dashboard");
                this.props.updateSession(true);
                sessionStorage.setItem("session", "true");
                let fieldValidationErrors = formErrors;
                fieldValidationErrors.success = 'false';
                this.setState({ formErrors:fieldValidationErrors,submit:false});
                return;
            });          
        }
    }
    handleRegistration() {
        this.props.history.push("/register");
    }
    render() {
        return (
            <div className="auth-inner">
                {this.state.submit && <div id="overlay" >
                    <div className="spinner"></div>
                    <br/>
                    Loading...
                </div>}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>Sign In</h3>
                    {(this.state.formErrors.username === 'false' && <div className="alert alert-danger" role="alert">
                        User Name Should Contain 6-10 Charaters of Alpha Numerics
                    </div>)}
                    {(this.state.formErrors.password === 'false' && <div className="alert alert-danger" role="alert">
                        Password Should Contain 6-10 Charaters Of Alpha Numerics And Special Charaters !@#$%^&*()_
                    </div>)}
                    {(this.state.formValid && this.state.formErrors.success === 'false' && <div className="alert alert-danger" role="alert">
                    Authentication Failed . Please Contact Admin
                    </div>)}
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" value={this.state.username} onChange={(input) =>this.handleUserInput('username',input.target.value)} placeholder="Enter User Name" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={(input) =>this.handleUserInput('password',input.target.value)} placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={!(this.state.usernameValid && this.state.passwordValid)}>Submit</button>
                    <p className="forgot-password text-right">
                        New User? Kindly <a className="anchor-href" onClick={this.handleRegistration}>Register</a>
                    </p>
                </form>
            </div>
        );
    }
}