import React, { Component } from 'react'
import '../custom.css'
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component
{
  intervalID;
  constructor(){
    super();
    this.state={
      cardData: []
    }
  }

  componentDidMount(){
    this.getData();
    this.intervalID = setInterval(this.getData.bind(this), 5000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  getData=()=>{
    axios.get('https://rcteambuilder.com/dashboard-card-data.php')
    .then(response => {
      this.setState({ cardData: response.data });
    })
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
                      <div className="nav-link">
                        <i className="fas fa-fw fa-tachometer-alt" style={{cursor:'pointer'}}></i>
                        <span className="font-weight-bolder" style={{cursor:'pointer'}}>Dashboard</span>
                      </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Features</div>

                    <li className="nav-item">
                      <div className="nav-link" aria-expanded="true">
                        <Link to='/contactUs'>
                          <i className="fab fa-fw fa-wpforms"></i>
                          <span>Contact Us</span>
                        </Link>
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
                            <div className="topbar-divider d-none d-sm-block"></div>
                              <li className="nav-item dropdown no-arrow">
                                <div className="nav-link">
                                  <img className="img-profile rounded-circle" src="img/boy.png" style={{maxWidth: '60px'}} />
                                  <span className="ml-2 d-none d-lg-inline text-white small">{window.sessionStorage.getItem('firstName')+' '+window.sessionStorage.getItem('lastName')}</span>
                                </div>
                              </li>
                          </ul>
                        </nav>
                        <div className="row mb-3 ml-3">

                          {/* Number of Users Card Example */}
                           <div className="col-xl-3 col-md-6 mb-4">
                             <div className="card h-100">
                               <div className="card-body">
                                 <div className="row align-items-center">
                                   <div className="col mr-2">
                                     <div className="text-xs font-weight-bold text-uppercase mb-1">Number of Users</div>
                                     <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.cardData[1]}</div>
                                     <div className="mt-2 mb-0 text-muted text-xs">
                                       <span>Since last month</span>
                                     </div>
                                   </div>
                                   <div className="col-auto">
                                    <i className="fas fa-users fa-2x text-info"></i>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>

                          {/* Pending Requests Card Example */}
                          <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card h-100">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-uppercase mb-1">Total Quiries</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.cardData[0]}</div>
                                  </div>
                                  <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-warning"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
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