import React, { Component } from 'react';
import {Route, HashRouter, NavLink} from 'react-router-dom';
import { List } from "./components/List";
import  {Add } from "./components/Add";
import Person from "./components/Person";
import { Trombinoscope } from "./components/Trombinoscope";
import * as PersonServices from './services/person'; 

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        persons:[], 
    };
  }


  render() {
    return (
      <HashRouter>
        <div className="App">
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <img src='logo_Serli.png' className="App-logo" alt="logo" />
              <h1 className="App-title">Trombinoscope</h1>
            </header>
            <div className="">
                 <p/>     
            </div>
            



            <div className="App-container">
              <div className="">                            
                <NavLink to="/list">List</NavLink>
              </div>
              <div className="">                            
                <NavLink to="/trombinoscope">Trombinoscope</NavLink>
              </div>
              <div className="">                            
                <NavLink to="/add">Add person</NavLink>
              </div>
            </div>
            
            <div>
                <Route path="/list" component={List}/>
                <Route path="/trombinoscope" component={Trombinoscope}/>
                <Route path="/add" component={Add}/>
                <Route path="/person/:email" component={Person}/>

            </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
