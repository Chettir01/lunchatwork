import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import * as PersonServices from '../services/person';

export class List extends Component {

    static propTypes = {
        persons: PropTypes.array, 
        person: PropTypes.object
    };

    constructor(props){
        super(props);
        this.state = {
            persons: [],
            personsToDisplay: [],
            person:{},
            search: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    displayList(){
        PersonServices.getPersonList()
            .then(r => r.json())
            .then(persons => {
                this.setState({persons, personsToDisplay: persons})
            });
    }

    componentDidMount() {
        this.displayList();
    };
    
    handleSearch = (e) => {
        console.log("updateSearch", e.target.value);
        const persons = this.search(e.target.value);
        this.setState({search: e.target.value, personsToDisplay: persons});
    }

    handleDelete = (person) => {
        console.log("list", this.state.persons);
        console.log("person a supprimer", person.name);
        PersonServices.removePerson(person.email).then(()=>{
            this.displayList();
            let message = person.name + " has been deleted";
            alert(message);
        }); 
    }

    goToUpdate = (person) => {
        this.props.history.push(`/update/${person.email}`);
    }

    deletePerson=(person)=>{
        if (window.confirm(`Do you really want to delete. This process cannot be undone`)){
            this.handleDelete(person)
        }
    }

    search = (query) =>{
        const {persons} = this.state;
        return persons.filter(
            (person) => { 
            let queryObject = Object.keys(person).filter(
                (key) => {
                    return person[key].toLowerCase && person[key].toLowerCase().indexOf(query) !== -1;
                }    
            );   
            return queryObject.length > 0
            }
        );
    }

    render(){
        const personsToDisplay = this.state.personsToDisplay;
        
        return(
        <div className="list-container">
            <h4 className="">List of people present in database</h4>
            <div className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4">
            
                <div className="form-group" style={{marginBottom: "18px"}}>
                    <div className="input-group">
                        <label htmlFor="search" className="input-group-addon" style={{minWidth: "20px"}}>
                        <i className="fa fa-fw fa-search" />
                        </label>        
                        <input
                            id="query"
                            type="text"
                            value={this.state.search}
                            onChange={this.handleSearch.bind(this)}
                            className="form-control"
                            placeholder="Search..."
                        />
                    </div>
                    <p>{this.state.query}</p>
                </div>

                <div className="">
                    <ListGroup>
                        {
                            personsToDisplay.map(person =>(
                                < ListGroupItem key={person.email}>
                                        <Link to={`/person/${person.email}`}>{person.name}</Link>
                                        <div className="list-button">
                                            <button type="button" class="btn btn-default btn-sm" onClick={ ()=>{this.goToUpdate(person)} } >Update</button>
                                            <button type="button" class="btn btn-default btn-sm" onClick={ ()=>{this.deletePerson(person)} }>Delete</button>
                                        </div>
                                </ListGroupItem>
                                )
                            )    
                        }
                    </ListGroup>
                </div>

            </div>
        </div>
        )
    }
}
