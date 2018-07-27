import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Trombinoscope.css';

export default class TrombiCard extends Component{
    
    static propTypes = {
        person: PropTypes.object,
    };

    constructor(props){
        super(props);
        this.state = {
            person: {},
        }
    };
    // supprimer une personne

    componentDidMount() {
        let admin = JSON.parse(sessionStorage.getItem('isAdmin'));
        this.setState({admin});
      };

    render(){ 
        const {person} = this.props;
        const image = person.image;
        const color = person.color;
        let {admin} = this.state;

        return(
            <div className="" >
            {/* <div className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4" > */}
                    <div className="card">
                        <div className="card-image-trombi" style={{border: "solid 2px", color}}>
                                {
                                    image ?
                                    <img className="displayImg-trombi" src={image} alt="visage"/>
                                    :<img className="displayImg-trombi" src={'default.jp'} alt="default" />
                                }
                        </div>
                        <div className="card-information-trombi">
                            <div>
                                <label>Name:</label> {person.name}
                            </div>
                            <div>
                                <label>Color:</label> 
                                <span className="person-color" style={{backgroundColor:person.color} }/>
                            </div>
                            <div>
                                <label>Welcome message:</label> {person.welcomeMsg}
                            </div>
                            <div>
                                <label>Email:</label> {person.email}
                            </div>
                            {(admin  ? 
                                <div className="card-action ">
                                <a className="edit" title="Edit" data-toggle="tooltip"><Link to={`/update/${person.email}`}><i class="material-icons">&#xE254;</i></Link></a>
                                <a className="delete" title="Delete" data-toggle="tooltip" style={{cursor: "pointer"}} onClick={ () => {this.props.deletePerson(person)} }><i class="material-icons">&#xE872;</i></a>
                                </div>: null) 
                            }
                           
                        </div>
                        <div>
                            <Link to={`/person/${person.email}`}>
                                {
                                    person.name
                                }
                            </Link>              
                        </div>

                    </div> 
            </div>
        )
    }
}
