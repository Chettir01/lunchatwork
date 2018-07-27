import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        persons:[], 
        lunchs :[],
    };
  }

  // componentWillMount() {
  //   this.setState({ profile: {} });
  //   const { userProfile, getProfile } = this.props.auth;
  //   if (!userProfile) {
  //     getProfile((err, profile) => {
  //       const admin = profile['https://auth0-serli/metadata/app_metadata'].is_admin;
  //       const isAdmin = profile && profile['https://auth0-serli/metadata/app_metadata'] && admin
  //       const email = profile.email;
  //       sessionStorage.setItem('isAdmin', isAdmin);
  //       sessionStorage.setItem('Email', email);
  //       this.setState({ profile, isAdmin });
  //        console.log('admin',isAdmin);
  //     });
  //   } else {
  //     this.setState({ profile: userProfile });
  //   }
    
  // }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  logTest(){
    if (window.confirm(`Voulez-vous vraiment vous déconnecter?`)){
      this.logout();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App ">
        <div className="App-nav "> {/*navbar navbar-default navbar-fixed-top*/}
          <header className="App-header ">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <a href="http://www.serli.com/">
              <img src='logo_Serli.png' className="App-logo" alt="logo" />
            </a>
            <h1 className="App-title">Lunch at work</h1>
          </header>

          <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              {/* <a href="#">Auth0 - React</a> */}
              < Link className="nav-link" to="/home">Page d'accueil <span className="sr-only">(current)</span></Link>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Accueil
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Se connecter
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this,'lunchvue')}
                  >
                    Lunch at work
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this,'trombinoscope')}
                  >
                    Trombinoscope
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logTest.bind(this)}
                  >
                    Se deconnecter
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>

         {/* <div>
                <div className="">
                
                    <button type="button" className="btn btn-primary add-new" onClick={ () => {this.goToCreate()} }><i class="fa fa-plus"></i> Add New</button>
                </div>
        </div> */}

          {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a href="http://www.serli.com/blog/article/5a0b071a900300f903c7b945#.Ww8cFqk69p8">Arthur</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav_mr-auto">
                <li class="nav-item active">
                  < Link class="nav-link" to="/trombinoscope">Home Page <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                  < Link class="nav-link" to="/lunchvue">Lunch at work</Link>
                </li>
                <li class="nav-item">
                  < Link class="nav-link" to="/list">List</Link>
                </li>
              </ul>
            </div>
          </nav> */}

        {/* </div>
        <div>
          <Redirect to="/trombinoscope" />
          <Route path="/list" component={List}/>
          <Route path="/trombinoscope" component={Trombinoscope}/>
          <Route path="/create" component={CreateOrUpdate}/>
          <Route path="/person/:email" component={Person}/>
          <Route path="/update/:email" component={CreateOrUpdate}/> 
        </div>

        <div>
          <Redirect to="/lunchvue" />
          <Route path="/lunchvue" component={LunchVue}/>
          <Route path="/createLunch" component={CreateUpdate}/>
          <Route path="/lunch/:plat" component={Lunch}/>
          <Route path="/updateLunch/:id" component={CreateUpdate}/> 
        </div>

      </div> */}

        </div>
        </div>
    )
  }
}

export default App;

