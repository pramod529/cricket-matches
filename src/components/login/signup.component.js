import React, { Component } from "react";
import { registerUser } from '../../services/fetchCricketMatches.service';

export default class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            username : '',
            password:'',
            firstName:'',
            lastName:'',
            formErrors:{username:'',password : '',success: ''},
            usernameValid:false,
            passwordValid:false,
            firstNameValid:false,
            lastNameValid:false,
            formValid:false,
            submit:false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        fieldValidationErrors.success = '';
        switch(fieldName){
            case 'firstName':
            if (value && value.length > 0) {
                firstNameValid = /^[A-Za-z\s]{3,20}$/.test(value);
                fieldValidationErrors.firstName = firstNameValid ? '' : 'false';
            } else {
                fieldValidationErrors.firstName = '';
            } 
            break;
            case 'lastName':
            if (value && value.length > 0) {
                lastNameValid = /^[A-Za-z\s]{3,20}$/.test(value);
                fieldValidationErrors.lastName = lastNameValid ? '' : 'false';
            } else {
                fieldValidationErrors.lastName = '';
            } 
            break;
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
                        usernameValid:usernameValid,firstNameValid:firstNameValid,lastNameValid:lastNameValid,
                    passwordValid:passwordValid }, this.validateForm);
    }
    validateForm(){
        this.setState({ formValid: this.state.usernameValid && this.state.firstNameValid && this.state.lastNameValid && this.state.lastNameValid});
    }
    handleSubmit(e) {
        e.preventDefault();
        const { formValid, username, password,firstName,lastName, formErrors } = this.state;
        this.setState({ submit:true});
        if (formValid) {
            registerUser(username, password,firstName,lastName)
            .then(res => {
                this.props.history.push('/', {});
                this.setState({ submit:false});
            })
            .catch(error => {
                console.log('Error in authenticating User:: ', error);
                this.props.history.push('/', {});
                let fieldValidationErrors = formErrors;
                fieldValidationErrors.success = 'false';
                this.setState({ formErrors:fieldValidationErrors,submit:false});
                return;
            });       
        } 
    }
    handleLogin() {
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="auth-inner">
                <form onSubmit={e => this.handleSubmit(e)}>
                    {this.state.submit && <div id="overlay" >
                        <div class="spinner"></div>
                        <br/>
                        Loading...
                    </div>}
                    <h3>Sign Up</h3>
                    {(this.state.formErrors.firstName === 'false' && <div className="alert alert-danger" role="alert">
                        First Name Should Contain 3-20 Charaters
                    </div>)}
                    {(this.state.formErrors.lastName === 'false' && <div className="alert alert-danger" role="alert">
                        Last Name Should Contain 3-20 Charaters
                    </div>)}
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
                        <label>First name</label>
                        <input type="text" className="form-control" value={this.state.firstName} onChange={(input) =>this.handleUserInput('firstName',input.target.value)} placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" value={this.state.lastName} onChange={(input) =>this.handleUserInput('lastName',input.target.value)} placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" value={this.state.username} onChange={(input) =>this.handleUserInput('username',input.target.value)} placeholder="User Name" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={(input) =>this.handleUserInput('password',input.target.value)} className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={!(this.state.firstNameValid && this.state.lastNameValid && this.state.usernameValid && this.state.passwordValid)}>Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a className="anchor-href" onClick={this.handleLogin}>sign in?</a>
                    </p>
                </form>
            </div>
        );
    }
}