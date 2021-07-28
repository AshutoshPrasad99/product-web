import React, { Component } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import {Link} from 'react-router-dom';

export default class ContactUsTable extends Component
{
    constructor() {
        super();

        this.fetchContactUs = this.fetchContactUs.bind(this);
        this.exportCsv=this.exportCsv.bind(this)
        this.state = {
            columns: [
               
                {
                  label: 'Name',
                  field: 'Name',
                  width: 150,
    
                },
                {
                  label: 'Email',
                  field: 'Email',
                  width: 270,
                },
                {
                  label: 'City',
                  field: 'City',
                  width: 200,
                },
                {
                  label: 'Contact',
                  field: 'Phone',
                  width: 100,
                },
                {
                  label: 'Date',
                  field: 'Date',
                  width: 150,
                },
                {
                  label: 'Message',
                  field: 'Message',
                  width: 100,
                },
              ],
              rows: []
        };

    }

    componentDidMount(){
      this.fetchContactUs();

      document.querySelector('#container-wrapper > div > div > div:nth-child(1) > div:nth-child(1)').classList="ml-auto"
      document.querySelector('#container-wrapper > div > div > div:nth-child(1) > div.ml-auto').classList="mr-auto ml-3"
      document.querySelector('#container-wrapper > div > div > div:nth-child(3) > div.col-sm-12.col-md-7').classList="ml-auto"
    }

    fetchContactUs()
    {
      axios.get('https://rcteambuilder.com/contactUsTable.php')
      .then(response => {
          this.setState({rows : response.data})
      })
      .catch(function(error){
          console.log(error);
      })
    }

    exportCsv(){
      axios.get('https://rcteambuilder.com/export-contact-us.php')
    }

    logout(){
      window.sessionStorage.clear()
      window.location.replace('/')
    }

    logo(){
      if(document.getElementById('logo2').style.display=='block'){
          document.getElementById('logo2').style.display='none'
          document.getElementById('accordionSidebar').classList.add('toggled')
          document.getElementById('logo1').style.display='block'
          
      }
      else{
          document.getElementById('accordionSidebar').classList.remove('toggled')
          document.getElementById('logo2').style.display='block'
          document.getElementById('logo1').style.display='none'
      }
          }

    render(){
      var session = window.sessionStorage.length
      if(session != 0)
      {
        return(
          <div id="wrapper">
                  <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                      <div className="sidebar-brand-icon">
                        <img id="logo2"src="img/logo/logo2.png" style={{display:'block'}} />
                        <img id="logo1"src="img/logo/logo-2.png" className='ml-2'style={{display:'none'}} />
                      </div>
                    </a>
                    <hr className="sidebar-divider my-0" />
                    <li className="nav-item">
                      <div className="nav-link" href=''>
                        <Link to='/dashboard'>
                          <i className="fas fa-fw fa-tachometer-alt" style={{cursor:'pointer'}}></i>
                          <span style={{cursor:'pointer'}}>Dashboard</span>
                        </Link>
                      </div>
                    </li>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-heading">Features</div>
                    
                    <li className="nav-item">
                      <div className="nav-link" aria-expanded="true">
                      <i className="fab fa-fw fa-wpforms"></i>
                        <span className="font-weight-bolder">Contact Us</span>
                      </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item">
                      <div className="nav-link" aria-expanded="true">
                        <Link to='/blogpost'>
                          <i className="fas fa-blog fa-lg"></i>
                          <span>Blog Post</span>
                        </Link>
                      </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item">
                      <div className="nav-link" aria-expanded="true">
                        <i className="fa fa-sign-out-alt" style={{cursor:'pointer'}} aria-hidden="true" onClick={this.logout.bind(this)}></i>
                        <a className="font-weight-bolder" style={{cursor:'pointer'}} onClick={this.logout.bind(this)}><span>Logout</span></a>
                      </div>
                    </li>
                  </ul>

                  <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                      <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                        <button onClick={this.logo} id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
                          <i className="fa fa-bars"></i>
                        </button>
                        <ul className="navbar-nav ml-auto">
                          <div className="d-flex align-items-center">
                            <a href='https://rcteambuilder.com/export-contact-us.php'className="text-white small">DOWNLOAD</a>
                          </div>
                          <div className="topbar-divider d-none d-sm-block"></div>
                            <li className="nav-item dropdown no-arrow">
                              <div className="nav-link">
                                <img className="img-profile rounded-circle" src="img/boy.png" style={{maxWidth: '60px'}} />
                                <span className="ml-2 d-none d-lg-inline text-white small">{window.sessionStorage.getItem('firstName')+' '+window.sessionStorage.getItem('lastName')}</span>
                              </div>
                            </li>
                        </ul>
                      </nav>

                      <div className="container-fluid" id="container-wrapper">
                          <div style={{width:'80%'}} className=" ml-5 mr-5 ">
                              <MDBDataTable hover entriesOptions={[5, 10, 20, 25]} entries={5} pagesAmount={4} data={this.state} />
                          </div>
                      </div>

                    </div>
                    <footer className="sticky-footer bg-white">
                      <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                          <span>copyright &copy; - developed by
                            <b><a href="https://rcteambuilder.com" target="_blank">RealCoderZ</a></b>
                          </span>
                        </div>
                      </div>
                    </footer>
                </div>
            </div>
        );
      }else{
        window.location.replace('/')
      }
    }
}