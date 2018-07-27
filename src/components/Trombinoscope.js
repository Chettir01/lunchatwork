import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import TrombiCard from './TrombiCard';
import './Trombinoscope.css';
import * as PersonServices from '../services/person';

export class Trombinoscope extends Component {

    static propTypes = {
        onSelectedPerson: PropTypes.func,
        persons: PropTypes.array, 
        person: PropTypes.object
    };

    constructor(props){
        super(props);
        this.state = {
            persons: [],
            personsToDisplay: [],
            person: {},
            search:'',
        };
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
        let admin = sessionStorage.getItem('isAdmin');
        this.setState({admin});
      };
    // barre de recherche
    handleSearch = (e) => {
        const persons = this.search(e.target.value);
        this.setState({search: e.target.value, personsToDisplay: persons});
    }

    search = (query) => {
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

    // redirection pour créer une personne
    goToCreate = () => {
        this.props.history.push(`/create`);
    }

    // suppression d'une personne
    handleDelete = (person) => {
        PersonServices.removePerson(person.email).then(()=>{
            this.displayList();
            let message = person.name + "has been deleted";
            alert(message);
        }); 
    }

    deletePerson=(person)=>{
        if (window.confirm(`Do you really want to delete. This process cannot be undone`)){
            this.handleDelete(person)
        }
    }

    render(){
        const personsToDisplay = this.state.personsToDisplay;
        let {admin} = this.state;
        return(
            <div className="">
                <h3 className="">List of people present in database</h3>

                    {/* barre de recherche */}
                    <div className="search-bar " style={{marginBottom: "18px"}}>
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

                    {/* affichage des personnes */}
                    <div className="trombi-container">
                            {
                            personsToDisplay.map(person =>(
                                <TrombiCard key={person.email} person = {person} deletePerson = {this.deletePerson.bind(this)}/>
                                )
                            )    
                            }
                    </div>
                <div>
                    {(admin  ? 
                        <button type="button" className="btn btn-primary add-new" onClick={ () => {this.goToCreate()} }><i class="fa fa-plus"></i> Add New</button>
                        : null) 
                    }
                    {/* <button type="button" className="btn btn-primary add-new" onClick={ () => {this.goToCreate()} }><i class="fa fa-plus"></i> Add New</button> */}
                </div>  
            </div>
        )
    }
}