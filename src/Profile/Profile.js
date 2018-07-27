import React, { Component } from 'react';
import './Profile.css';
import '../components/Trombinoscope.css';

class Profile extends Component {

    login() {
        this.props.auth.login();
      }

  componentWillMount() {
    //this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    //if(userProfile == null){
      if (!userProfile) {
        getProfile((err, profile) => {
          const admin = profile['https://auth0-serli/metadata/app_metadata'].is_admin;
          const isAdmin = profile && profile['https://auth0-serli/metadata/app_metadata'] && admin
          const email = profile.email;
          sessionStorage.setItem('isAdmin', isAdmin);
          sessionStorage.setItem('Email', email);
          this.setState({ profile, isAdmin });

        });
      } else {
        this.setState({ profile: userProfile });
      }
    //}
  }
  

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                vous êtes connecté
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                Vous n'êtes pas connecté{' '}
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  SVP connectez-vous 
                </button>
                {' '}pour continuez.
              </h4>
            )
        }
      </div>
    )
  }
}

export default Profile;