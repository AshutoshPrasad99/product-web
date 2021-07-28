import React, { Component } from 'react'
import './custom.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './component/login';
import ContactUsTable from "./component/contactus";
import Dashboard from './component/dashboard';
import SignUp from './component/sign-up';
import BlogPost from './component/blog-post';
import CreateBlogPost from './component/create-blog-post';
import EditBlog from './component/editBlog';



export default class App extends Component
{
    render(){
        return(
            <Router>
              <Switch>
                <Route exact path='/'><Login/></Route>
                <Route exact path='/sign-up'><SignUp/></Route>
                <Route exact path='/dashboard'><Dashboard/></Route>
                <Route exact path='/contactus'><ContactUsTable/></Route>
                <Route exact path='/blogpost'><BlogPost/></Route>
                <Route exact path='/createpost'><CreateBlogPost/></Route>
                <Route exact path='/editBlog'><EditBlog/></Route>
                
              </Switch>  
            </Router>
        );
    }
}