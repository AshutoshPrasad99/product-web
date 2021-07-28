import axios from 'axios';
import React, { Component } from 'react';

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            repassword: '',
            indicator: '',
            color: '',
            passwordLengthMsg: '',
            confirmPasswordMsg:'',
        };
        this.inputFname = this.inputFname.bind(this);
        this.inputLname = this.inputLname.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.inputRepassword = this.inputRepassword.bind(this);
        this.register = this.register.bind(this);
    }
    inputFname(e) {
        this.setState({ fname: e.target.value })
    }
    inputLname(e) {
        this.setState({ lname: e.target.value })
    }
    inputEmail(e) {
        this.setState({ email: e.target.value })
    }
    inputPassword(e) {
        if(strongRegex.test(e.target.value)) {
            this.setState({ indicator: "Strong", color:'#0F9D58' });
        } else if(mediumRegex.test(e.target.value)) {
            this.setState({ indicator: "Medium", color:'#F4B400' });
        } else {
            this.setState({ indicator: "Weak", color:'#DB4437' });
        }
        this.setState({ password: e.target.value })
        
        if(e.target.value > 7){
            this.setState({passwordLengthMsg : ''})
        }
    }
    inputRepassword(e) {
        this.setState({ repassword: e.target.value })
        if(e.target.value === this.state.password){
            this.setState({confirmPasswordMsg : ''})
        }
    }
    register(e) {
        if (this.state.fname !='' && this.state.lname !='' && this.state.password !='' && this.state.email !='') {
            if(this.state.password.length > 7)
            {
                if (this.state.password == this.state.repassword) {
                    // e.preventDefault();
                    const obj = {
                        Fname: this.state.fname,
                        Lname: this.state.lname,
                        Email: this.state.email,
                        Password: this.state.password
                    }
                    console.log(obj);
                    axios.post('https://rcteambuilder.com/signUp.php', obj)
    
                    this.state = {
                        fname: '',
                        lname: '',
                        email: '',
                        password: '',
                        repassword: '',
                        indicator: '',
                        color: '',
                        confirmPasswordMsg:'',
                    }
                
                    window.location.replace('/');
                }else{
                    this.setState({confirmPasswordMsg: 'Confirm Password should be same as Password.'})
                }
            }else{
                this.setState({passwordLengthMsg: 'Password length should be 8 or greater.'})
            }
        }
    }
    redirect() {
        window.location.replace('/')
    }

    render() {
        return (
            <div className="container-login">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card shadow-sm my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="login-form">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Register</h1>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" id="exampleInputFirstName" name="fname" placeholder="Enter First Name" value={this.state.fname} onChange={this.inputFname} required />
                                                </div>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" id="exampleInputLastName" name="lname" placeholder="Enter Last Name" value={this.state.lname} onChange={this.inputLname} required />
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" name="email" placeholder="Enter Email Address" value={this.state.email} onChange={this.inputEmail} required />
                                                </div>
                                                <div className="form-group">
                                                    <div className="d-flex flex-row">
                                                        <label>Password</label>
                                                        <h6 style={{ color: this.state.color }}>{this.state.indicator}</h6>
                                                    </div>
                                                    <input type="password" className="form-control" id="exampleInputPassword" name="password" placeholder="Password" value={this.state.password} onChange={this.inputPassword} required />
                                                    <h6 style={{color: '#DB4437'}}>{this.state.passwordLengthMsg}</h6>
                                                </div>
                                                <div className="form-group">
                                                    <label>Confirm Password</label>
                                                    <input type="password" className="form-control" id="exampleInputPasswordRepeat" name="repassword" placeholder="Confirm Password" value={this.state.repassword} onChange={this.inputRepassword} required />
                                                    <h6 style={{color: '#DB4437'}}>{this.state.confirmPasswordMsg}</h6>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.register}>Register</button>
                                                </div>
                                                <hr />
                                                <a href="index.html" className="btn btn-google btn-block">
                                                    <i className="fab fa-google fa-fw"></i> Register with Google
                                                </a>
                                                <a href="index.html" className="btn btn-facebook btn-block">
                                                    <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                                </a>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="font-weight-bold small" style={{cursor:'pointer'}} onClick={this.redirect.bind(this)}>Already have an account?</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}