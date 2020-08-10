import React, { Component } from "react";
import { authenticateUser } from '../../services/fetchCricketMatches.service';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            matchname : '',
            matchtime:'',
            formErrors:{matchname:'',matchtime : '',success: ''},
            matchnameValid:false,
            matchtimeValid:false,
            formValid:false
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
        let matchnameValid = this.state.matchnameValid;
        let matchtimeValid = this.state.matchtimeValid;
        fieldValidationErrors.success = '';
        switch(fieldName){
            case 'matchname':
            if (value && value.length > 0) {
                matchnameValid = /^[A-Za-z0-9\s]{6,10}$/.test(value);
                fieldValidationErrors.matchname = matchnameValid ? '' : 'false';
            } else {
                fieldValidationErrors.matchname = '';
            } 
            break;
            case 'matchtime':
            if (value && value.length > 0) {
                matchtimeValid = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/.test(value);
                fieldValidationErrors.matchtime = matchtimeValid ? '' : 'false';
            } else {
                fieldValidationErrors.matchtime = '';
            }                
            break;
            default:
            break;
        }
        this.setState({ formErrors:fieldValidationErrors,
                        matchnameValid:matchnameValid,
                    matchtimeValid:matchtimeValid }, this.validateForm);
    }
    validateForm(){
        this.setState({ formValid: this.state.matchnameValid && this.state.matchtimeValid });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { formValid, matchname, matchtime, formErrors } = this.state;
        console.log(formValid);
        if (formValid) {
            authenticateUser(matchname, matchtime)
            .then(res => {
                this.props.history.push("/dashboard");
            })
            .catch(error => {
                console.log('Error in authenticating User:: ', error);
                this.props.history.push("/dashboard");
                let fieldValidationErrors = formErrors;
                fieldValidationErrors.success = 'false';
                this.setState({ formErrors:fieldValidationErrors});
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
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>Add Match</h3>
                    {(this.state.formErrors.matchname === 'false' && <div className="alert alert-danger" role="alert">
                        Match Name Should Contain 6-10 Charaters of Alpha Numerics
                    </div>)}
                    {(this.state.formErrors.matchtime === 'false' && <div className="alert alert-danger" role="alert">
                        Date And Time Should Be (YYYY-MM-DD HH:SS) 24 Hours Format
                    </div>)}
                    {(this.state.formValid && this.state.formErrors.success === 'false' && <div className="alert alert-danger" role="alert">
                    Authentication Failed . Please Contact Admin
                    </div>)}
                    <div className="form-group">
                        <label>Match Name</label>
                        <input type="text" className="form-control" value={this.state.matchname} onChange={(input) =>this.handleUserInput('matchname',input.target.value)} placeholder="Enter Match Name" />
                    </div>

                    <div className="form-group">
                        <label>Match Date And Time (YYYY-MM-DD HH:SS) 24 Hours</label>
                        <input type="text" className="form-control" value={this.state.matchtime} onChange={(input) =>this.handleUserInput('matchtime',input.target.value)} placeholder="Enter Format Of YYYY-MM-DD HH:SS" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={!(this.state.matchnameValid && this.state.matchtimeValid)}>Submit</button>
                </form>
            </div>
        );
    }
}