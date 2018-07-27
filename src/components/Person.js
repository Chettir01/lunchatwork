import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Pager} from 'react-bootstrap';

import './Person.css';
import * as PersonServices from '../services/person';

export class  Person extends Component{
    
    static propTypes = {
        person: PropTypes.object,
    };

    constructor(props){
        super(props);
        
        this.state = {
            person: {},
        }
    };
    
    componentDidMount() {
        this.onSelectPerson(this.props.match.params.email) ;
    };
    
    onSelectPerson = (email) => {
        PersonServices.displayPerson(email)
            .then(r => r.json())
            .then(person => this.setState({person}));
    };
 
    handleDelete = (person) => {
        PersonServices.removePerson(person.email).then(()=>{
            this.props.history.push("/list");
            let message = person.name + " has been deleted";
            alert(message);
        }); 
    };
    
    render(){    
        const {person} = this.state;
        const image = person.image;
        return(
            <div className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4">
                <h3 className="person-title">Person informations</h3>
                    <div className="card"> 
                        {/* className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4" */}
                        <div className="card-image ">
                            <label htmlFor="img">{image ? <Image className="displayImg" src={image} alt="visage" responsive/>:<Image className="card-image" src={'defaultpic.jp'} alt="default" responsive/>}</label>
                            <input id="img" type="file" accept="image/*" className="hideInput" onChange={this.inputFileChange} />
                        </div>
                       
                        <div className="card-information">
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
                        </div>
                    </div> 
                    <div className="card-action">
                        <Pager>
                            <Pager.Item><Link to={`/update/${person.email}`}>Update</Link></Pager.Item>{' '}
                            <Pager.Item data-toggle="modal" data-target="#myModal">Delete</Pager.Item>{' '}

                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog modal-sm">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Are you sure?</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>Do you really want to delete "{person.name}" <br/>This process cannot be undone</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={ ()=>{this.handleDelete(person)} } >Delete</button>
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            <Pager.Item><Link to="/trombinoscope">Previous</Link></Pager.Item>
                        </Pager>

                    </div>
            </div>
        )
    }
}