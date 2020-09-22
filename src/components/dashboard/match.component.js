import React, { Component } from "react";
import { authenticateUser } from '../../services/fetchCricketMatches.service';
import DateTimePicker from 'react-datetime-picker';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            matchname : '',
            matchtime:'',
            matchEndTime:'',
            formErrors:{matchname:'',matchtime : '',success: '', matchEndTime:''},
            matchnameValid:false,
            matchtimeValid:false,
            matchEndTimeValid:false,
            formValid:false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        
    }
    handleUserInput = (name,value) => {
        let formtDt = "";
        if (name !== 'matchname') {
            let dt = new Date(value);
            formtDt = [dt.getFullYear(), dt.getMonth()+1,dt.getDate()].join('-')+' '+  [dt.getHours(), dt.getMinutes()].join(':');
        }
        this.setState({[name]:value},() => {
            if (name !== 'matchname') {
                this.validateField(name,value)
            } else {
                this.validateField(name,formtDt.toString())

            }
        })
    }
    validateField(fieldName,value){
        let fieldValidationErrors = this.state.formErrors;
        let matchnameValid = this.state.matchnameValid;
        let matchtimeValid = this.state.matchtimeValid;
        let matchendtimeValid = this.state.matchEndTimeValid;
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
            case 'matchEndTime':
            if (value && value.length > 0) {
                matchendtimeValid = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/.test(value);
                fieldValidationErrors.matchEndTime = matchendtimeValid ? '' : 'false';
            } else {
                fieldValidationErrors.matchEndTime = '';
            }                
            break;
            default:
            break;
        }
        this.setState({ formErrors:fieldValidationErrors,
                        matchnameValid:matchnameValid,
                    matchtimeValid:matchtimeValid, matchEndTimeValid: matchendtimeValid}, this.validateForm);
    }
    validateForm(){
        this.setState({ formValid: this.state.matchnameValid && this.state.matchtimeValid && this.state.matchEndTimeValid});
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
                        State Date And Time Should Be (YYYY-MM-DD HH:SS) 24 Hours Format
                    </div>)}
                    {(this.state.formErrors.matchEndTime === 'false' && <div className="alert alert-danger" role="alert">
                        End Date And Time Should Be (YYYY-MM-DD HH:SS) 24 Hours Format
                    </div>)}
                    {(this.state.formValid && this.state.formErrors.success === 'false' && <div className="alert alert-danger" role="alert">
                    Authentication Failed . Please Contact Admin
                    </div>)}
                    <div className="form-group">
                        <label>Match Name</label>
                        <input type="text" className="form-control" value={this.state.matchname} onChange={(input) =>this.handleUserInput('matchname',input.target.value)} placeholder="Enter Match Name" />
                    </div>

                    <div className="form-group">
                        <label>Match Start Time</label>
                        <DateTimePicker onChange={(input) =>this.handleUserInput('matchtime',input)} value={this.state.matchtime}/>
                    </div>

                    <div className="form-group">
                        <label>Match End Time</label>
                        <DateTimePicker onChange={(input) =>this.handleUserInput('matchEndTime',input)} value={this.state.matchEndTime}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={!(this.state.matchnameValid && this.state.matchtimeValid)}>Submit</button>
                </form>
            </div>
        );
    }
}