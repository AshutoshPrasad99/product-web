import React, { Component } from 'react'
import '../custom.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

export default class BlogPost extends Component
{
  constructor(){
    super();
    this.state={
      columns: [ 
        {
          label: 'Title',
          field: 'title',
          width: 150,
        },
        {
          label: 'Type',
          field: 'type',
          width: 150,
        },
        {
          label: 'Date',
          field: 'date',
          width: 150,
        },
        {
          label: 'Edit',
          field: 'Edit',
          width: 100,
        },
        {
          label: 'Delete',
          field: 'Delete',
          width: 100,
        },
      ],
      blogData: [],
    };

    this.fetchBlogs = this.fetchBlogs.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount(){
    this.fetchBlogs();

    document.querySelector('#container-wrapper > div > div > div:nth-child(1) > div:nth-child(1)').classList="ml-auto"
    document.querySelector('#container-wrapper > div > div > div:nth-child(1) > div.ml-auto').classList="mr-auto ml-3"
    document.querySelector('#container-wrapper > div > div > div:nth-child(3) > div.col-sm-12.col-md-7').classList="ml-auto"
  }

  fetchBlogs(){
    axios.get('https://rcteambuilder.com/blogFile.php')
    .then(response => {

      for(var i=0;i<response.data.length;i++){
        const obj = [
          response.data[i].title,
          response.data[i].type,
          response.data[i].image,
          response.data[i].content,
          response.data[i].date,
        ]
        response.data[i].Edit=<button className="btn btn-primary" value={obj} onClick={this.edit}>Edit</button>
        response.data[i].Delete=<button className="btn btn-danger" value={response.data[i].title} onClick={this.delete}>Delete</button>
      }

      this.setState({ blogData: response.data })
    })
  }

  edit(e){
    var blog = e.target.value.split(',');
    localStorage.setItem('title', blog[0]);
    localStorage.setItem('type', blog[1]);
    localStorage.setItem('image', blog[2]);
    localStorage.setItem('content', blog[3]);
    localStorage.setItem('date', blog[4]);
    window.location.replace('/editBlog');
    // console.log(blog)
  }

  delete(e){
    axios.get('https://rcteambuilder.com/delete-blog.php?title='+e.target.value);
    this.fetchBlogs();
  }

  logout(){
    window.sessionStorage.clear()
    window.location.replace('/')
  }

    logo(){
        if(document.getElementById('logo2').style.display==='block'){
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
      if(session !== 0)
      {
        return(
                <div id="wrapper">
                  <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                      <div className="sidebar-brand-icon">
                        <img id="logo2"src="img/logo/logo2.png" alt="" style={{display:'block'}} />
                        <img id="logo1"src="img/logo/logo-2.png" alt="" className='ml-2'style={{display:'none'}} />
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
                        <Link to='/contactUs'>
                          <i className="fab fa-fw fa-wpforms"></i>
                          <span>Contact Us</span>
                        </Link>
                      </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item">
                      <div className="nav-link" aria-expanded="true">
                          <i className="fas fa-blog fa-lg"></i>
                          <span>Blog Post</span>
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
                          <ul className="navbar-nav ml-auto ">
                              <div className="d-flex align-items-center">
                                <a href="/createpost" className="text-white small">ADD POST</a>
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

                        
                        <div className="col-lg-12">
                            <div className="card shadow mb-4 pl-3">
                              <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">RC Product</h6>
                              </div>
                              
                              <div className="card-body">
                                <div className="container-fluid" id="container-wrapper">
                                  <div style={{width:'80%'}} className=" ml-5 mr-5 ">
                                    <MDBDataTable id='test' hover entriesOptions={[5, 10, 25, 100, this.state.blogData.length]}  entries={5} pagesAmount={4} data={{columns:this.state.columns,rows:this.state.blogData}} />
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