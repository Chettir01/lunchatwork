import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import { List } from "./components/List";
import { CreateOrUpdate } from "./components/CreateOrUpdate";
import { CreateUpdate } from "./componentlunch/CreateUpdate";
import { Person } from "./components/Person";
import { Trombinoscope } from "./components/Trombinoscope";
import { Lunch } from "./componentlunch/Lunch"; 
import { LunchVue }from "./componentlunch/LunchVue"; 
import Profile from './Profile/Profile';


const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Profile auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
        <div>
          <Route path="/list" component={List}/>
          <Route path="/trombinoscope" component={Trombinoscope}/>
          <Route path="/create" component={CreateOrUpdate}/>
          <Route path="/person/:email" component={Person}/>
          <Route path="/update/:email" component={CreateOrUpdate}/> 
        </div>

        <div>
          <Route path="/lunchvue" component={LunchVue}/>
          <Route path="/createLunch" component={CreateUpdate}/>
          <Route path="/lunch/:plat" component={Lunch}/>
          <Route path="/updateLunch/:id" component={CreateUpdate}/> 
        </div>
      </div>
    </Router>
  );
}