import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as LunchServices from '../services/Lunch';
import * as PersonServices from '../services/person';
import moment from 'moment';
import './LunchVue.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import * as $ from 'jquery';

export class LunchVue extends Component {

    static propTypes = {
        onSelectedLunch: PropTypes.func,
        lunches: PropTypes.array, 
        lunch: PropTypes.object
    };

    constructor(props){
        super(props);
        this.state = {
            lunches: [],
            lunchesToDisplay: [],
            lunch: {},
            search:'',
            test : false
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    componentDidMount() {
        this.displayList();
        let admin = JSON.parse(sessionStorage.getItem('isAdmin'));
        this.setState({admin});
        let email = sessionStorage.getItem('Email');
        this.setState({email});
        this.verifPerson(email);
    };

    verifPerson=(email) =>{
        PersonServices.verifPerson(email)
        .then(r => r.json())
        .then(test => this.setState({test}))
    }

    // barre de recherche
    handleSearch = (e) => {
        const lunches = this.search(e.target.value);
        this.setState({search: e.target.value, LunchesToDisplay: lunches});
    }

    search = (query) => {
        const {lunches} = this.state;
        return lunches.filter(
            (lunch) => {
                let queryObject = Object.keys(lunch).filter(
                    (key) => {
                        return lunch[key].toLowerCase && lunch[key].toLowerCase().indexOf(query) !== -1;
                    }
                );
                return queryObject.length > 0
            }
        );
    }

    displayList(){
        LunchServices.getLunchList()
            .then(r => r.json())
            .then(lunches => {
                this.setState({lunches, lunchesToDisplay: lunches})
            });
    }

    goToCreate = () => {
        this.props.history.push(`/createLunch`);
    }

    handleDelete = (lunch) => {
        LunchServices.removeLunch(lunch.id).then(()=>{
            this.displayList();
            let message = lunch.plat + " has been deleted";
            alert(message);
        }); 
    }

    deleteLunch=(lunch)=>{
        if (window.confirm(`Voulez-vous vraiment supprimer ce repas ?`)){
            this.handleDelete(lunch)
        }
    }

    render(){
        const lunchesToDisplay = this.state.lunchesToDisplay;
        let {email,admin,test} = this.state;
        console.log('test', test);
        return(
            <div className="">
            <br/><br/>
                <div className = "Jumbotron">
                    <h1 id = "myTitle"  data-heading="Frozen">List of lunches</h1>
                </div>

                <br/><br/>
                
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel" >
                        <div className="carousel-inner" >
                        {
                            lunchesToDisplay.map((lunch,index) =>
                            (
                                <div key ={index} className={"carousel-item " + (index === 0 ? "active" : "") }>  
                                    <img className="tales" length={300} width={200} height={400} 
                                    key ={lunch.id} 
                                    src={lunch.image} alt="visage"/>   
                                    <div className="carousel-caption">
                                        <h3>Plat : {lunch.plat} </h3>
                                        <p>Cuisinier : {lunch.person.name} </p>
                                        <p>Date : { moment(lunch.date).format('L') } </p>
                                        <div>
                                            {(admin  ? 
                                                <div className="card-action" id ="action">
                                                    <span className="edit" title="Edit" data-toggle="tooltip"><Link to={`/updateLunch/${lunch.id}`}><i className="material-icons">&#xE254;</i></Link></span>
                                                    <span className="delete" title="Delete" data-toggle="tooltip" style={{cursor: "pointer"}} onClick={ () => {this.deleteLunch(lunch)} }><i className="material-icons">&#xE872;</i></span>
                                                </div> : (email === lunch.person.email ?
                                                <div>
                                                    <span className="edit" title="Edit" data-toggle="tooltip"><Link to={`/updateLunch/${lunch.id}`}><i className="material-icons">&#xE254;</i></Link></span>
                                                    <span className="delete" title="Delete" data-toggle="tooltip" style={{cursor: "pointer"}} onClick={ () => {this.deleteLunch(lunch)} }><i className="material-icons">&#xE872;</i></span>
                                                    
                                                </div>  :null  
                                            )) 
                                            }
                                        </div>
                                    </div>
                                    
                                </div>
                            )) 
                        }
                        </div>
                        <a className="carousel-control-prev" href='#/lunchvue' 
                            onClick = {()=>{
                                $(".carousel").carousel('prev');
                                }
                            }
                            role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href='#/lunchvue' 
                            onClick = {()=>{
                                $(".carousel").carousel('next');
                                }
                            }
                            role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>   

                    <br/><br/>  
                    {(test  ? 
                    <div className="">
                        <button type="button" id="butt01" className="btn btn-primary add-new" onClick={ () => {this.goToCreate()} }><i className="fa fa-plus"></i> Add New</button>
                    </div> : null
                    )}
            </div>                     
        )
    }
}