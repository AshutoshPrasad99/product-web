import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component
{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            validateMsg:'',
        };
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.login = this.login.bind(this);
    }

    inputEmail(e){
        this.setState({email: e.target.value})
        this.setState({validateMsg:''})
    }
    inputPassword(e){
        this.setState({password: e.target.value})
        this.setState({validateMsg:''})
    }

    login(e){
        e.preventDefault();
        const obj = {
            Email : this.state.email,
            Password : this.state.password
        }
        // console.log(obj);
        axios.post('https://rcteambuilder.com/loginAdmin.php',obj)
        .then(response => {
          console.log(response.data.adminId)
            if(response.data.adminId > 0)
            {
              window.sessionStorage.setItem('firstName',response.data.fname);
              window.sessionStorage.setItem('lastName',response.data.lname);
              window.location.replace('/dashboard');
              this.state = {
                email:'',
                password:'',
                validateMsg:'',
              }
            }else{
              this.setState({validateMsg: 'Incorrect login credentials.'})
                // window.location.reload()
            }
        })
        
        
        
    }

    redirect(){
        window.location.replace('/sign-up')
    }

    render(){
        return(
            <div className="container-login">
    <div className="row justify-content-center">
      <div className="col-xl-6 col-lg-12 col-md-9">
        <div className="card shadow-sm my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="login-form">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Login</h1>
                  </div>
                  <form className="user">
                    <div className="form-group">
                      <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address" value={this.state.email} onChange={this.inputEmail} required/>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" value={this.state.password} onChange={this.inputPassword} required/>
                      <h6 style={{color: '#DB4437'}}>{this.state.validateMsg}</h6>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small" style={{lineHeight: 1.5}}>
                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <a href="index.html" className="btn btn-primary btn-block" onClick={this.login}>Login</a>
                    </div>
                    <hr/>
                    <a href="#" className="btn btn-google btn-block">
                      <i className="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="#" className="btn btn-facebook btn-block">
                      <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a>
                  </form>
                  <hr/>
                  <div className="text-center">
                    <a className="font-weight-bold small" style={{cursor:'pointer'}} onClick={this.redirect.bind(this)}>Create an Account!</a>
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