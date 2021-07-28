import React, { Component } from 'react'
import '../custom.css'
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class CreateBlogPost extends Component
{
  constructor(props)
    {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.register = this.register.bind(this);


        this.state={
            title: '',
            type: 'Inspirational',
            image: null,
            content: '',
            loader:0

        }
    }
    
    onChangeTitle(e){
        this.setState({title: e.target.value});
        // console.log(e.target.value);
    }
    onChangeType(e){
        this.setState({type: e.target.value});
        // console.log(e.target.value);
    }
    onChangeImage(e){
        this.setState({image: e.target.files[0]});
        // console.log(e.target.value);
    }
    onChangeContent(e){
      this.setState({content: e.target.value});
      // console.log(e.target.value);
  }


  register(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",this.state.title);
        formData.append("type",this.state.type);
        formData.append("image",this.state.image);
        formData.append("content",this.state.content);
        
        const obj = {
            title: this.state.title,
            type: this.state.type,
            image: this.state.image,
            content: this.state.content
        };
        axios.post('https://rcteambuilder.com/create-blog-files.php',formData)
        // .then(response => {
        //   console.log(response.data)
        // })
        this.setState({loader:1})
        setTimeout(function(){window.location.replace('/blogpost')},2000)
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
                          <ul className="navbar-nav ml-auto ">
                            
                            <div className="topbar-divider d-none d-sm-block"></div>
                              <li className="nav-item dropdown no-arrow">
                                <div className="nav-link">
                                  <img className="img-profile rounded-circle" src="img/boy.png" style={{maxWidth: '60px'}} />
                                  <span className="ml-2 d-none d-lg-inline text-white small">{window.sessionStorage.getItem('firstName')+' '+window.sessionStorage.getItem('lastName')}</span>
                                </div>
                              </li>
                          </ul>
                        </nav>

                        <div className="App">
                        
                        </div>
                        
                        <div className="col-lg-11">
                            <div className="card shadow mb-4 pl-3">
                              <div className="card-body">
                                <form className="col-lg-11">
                                    <div className="form-group">
                                    {this.state.loader==1 && <header style={{position:'fixed',left:'55%'}}className="App-header">
                                      <img src="./tabicon.png" className="App-logo" alt="logo" />
                                    </header>}
                                      <label>Title</label>
                                      <input type="text" className="form-control" id="exampleInputTitle" name="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                                    </div>
                                    <div className="form-group">
                                      <label>Type</label>
                                      <select onChange={this.onChangeType} className="form-control">
                                          <option value="Inspirational">Inspirational</option>
                                          <option value="Educational" >Educational</option>
                                      </select>

                                    </div>
                                    <div className="form-group">
                                    <label>Image</label>
                                      <input type="file" className="form-control"  name="image"  onChange={this.onChangeImage} required/>
                                    </div>
                                    <div className="form-group">
                                      <label>Content</label>
                                      <textarea type="text" className="form-control" id="exampleInputContent" name="content" value={this.state.content} onChange={this.onChangeContent} required/>
                                    </div>
                                    <div className="form-group">
                                      <button type="submit" className="btn btn-primary btn-block" onClick={this.register}>Add Post</button>
                                      
                                    </div>
                                </form>
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