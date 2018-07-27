import React, { Component } from 'react'; 
import * as LunchServices from '../services/Lunch';
import * as PersonServices from '../services/person';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import '../components/CreateOrUpdate.css';


export class CreateUpdate extends Component {
   constructor(props){
        super(props);

        this.state = {
            persons :[],
            dates : [],
            newPerson:{},
            lunch: {
                image:'assiette_default.jpg',
                plat: '',
                description: '',
                composition: '',
                date :'',
                person:{}
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    
    onSelectLunch = (id) => {
        if(id){
        LunchServices.displayLunch(id)
            .then(r => r.json())
            .then(lunch => this.setState({lunch}));
        }
    };

    componentDidMount = async ()=>{
        this.onSelectLunch(this.props.match.params.id);
        this.displayPerson();
        this.getLunchDate();
        let admin = JSON.parse(sessionStorage.getItem('isAdmin'));
        this.setState({admin});
        let userEmail = sessionStorage.getItem('Email');
        this.setState({userEmail});
        await this.displayPersonbyEmail(userEmail);
        this.state.lunch.person = this.state.newPerson;
        sessionStorage.setItem('nom',this.state.newPerson.name);
    }

    displayPersonbyEmail = (email) => {
        return PersonServices.displayPerson(email)
        .then(r => r.json())
        .then(newPerson =>{
            this.setState({newPerson})
        });
    }

    getImage = (e) => {
        const files = e.currentTarget.files;
        var reader = new FileReader();

        reader.onload = (e) => {
          //this.setState({image: e.target.result});
            const lunch = this.state.lunch;
            lunch.image = e.target.result;
            this.setState({lunch});
        }
        reader.readAsDataURL(files[0]);
    }

    displayPerson(){
        PersonServices.getPersonList()
        .then(r => r.json())
        .then(persons =>{
            this.setState({persons})
        });
    }

    getLunchDate(){
        LunchServices.getLunchDate()
        .then(r => r.json())
        .then(dates =>{
            this.setState({dates})
        });
    }

    handleChange = (e) => {
        const {lunch} = this.state;
        lunch[e.target.id] = e.target.value;
        this.setState({lunch})
    }

    displayPersonById = (id)=>{
        PersonServices.displayPersonById(id)
        .then(r => r.json())
        .then(person => {this.setState({person})});
    }

    handleChangePers = (e) => {
        const {lunch} = this.state;
        const person = lunch.person;
        person.id = e.target.value;
        lunch.person = person;
        this.setState({lunch});
    }

    handleChangeDate = (date) =>{
        const {lunch} = this.state;
        lunch.date = date;
        this.setState({lunch});
    }

    handleSubmit = (e) => {        
        e.preventDefault();
        let postLunch = LunchServices.updateLunch(this.state.lunch);
        const isPresent = this.state.lunch.id;
        let promesseResponse = postLunch
        .then((response) =>{
            return response.json();
        });

        promesseResponse
        .then((lunch)=>{
            this.props.history.push("/lunchvue");
            let message = "Lunch with plat : " + lunch.plat +
                               "\ndescription : " + lunch.description +
                               "\ncomposition : "  + lunch.composition +
                               "\nperson :" + lunch.person.name +
                               "\ndate :" +  moment(lunch.date).format('L') +
                               "\nid : " + lunch.id + (isPresent ? " est modifié. " : " est créé.");
            alert(message);
        })
        .catch((response)=>{
            console.log("error", response);
            response.json().then((error)=>{
                alert(error.message);
            })
        })
    }
    
    goToHomePage =() => {
        this.props.history.push(`/lunchvue`);
    }
    
    render(){
        const { lunch, persons, newPerson} = this.state;
        const isPresent = lunch.id;
        let {admin} = this.state;
        //let name = newPerson.name;
        console.log('admin', admin);
        
        return(
                <div className="Add-form" style={{marginBottom:'0px'}}>
                        <form className="form" name ="formulaire" onSubmit={this.handleSubmit} >
                            <h4>{isPresent ? "Update the lunch" : "Create a new lunch"}</h4><br/>
                            <div >Plat :<input placeholder="Ecrivez le nom de votre repas.." id="plat" value={lunch.plat} onChange={this.handleChange.bind(this)} ></input></div><br/>
                            <div> Description :<input placeholder="Ecrivez la description de votre repas.." id="description" value={lunch.description} onChange={this.handleChange.bind(this)} ></input></div><br/>
                            <div> Composition :<input placeholder="Ecrivez la composition de votre repas.." id="composition" value={lunch.composition} onChange={this.handleChange.bind(this)}></input></div><br/>
                            <div > Date :
                                <DatePicker key={lunch.id} value ={ moment(lunch.date).format('L')} excludeDates={this.state.dates} onSelect={this.handleSelect} onChange={this.handleChangeDate}></DatePicker>
                            </div><br/>
                        
                            <div >Personne :  
                                {(admin  ? 
                                    <select 
                                    name = "myselect" 
                                    value = {lunch.person.id}
                                    onChange = {this.handleChangePers}>
                                    
                                    <option/>
                                        {
                                            persons.map(person => (
                                                <option key ={person.id} value ={person.id} > {person.name}</option>
                                            ))
                                        }
                                    </select> : newPerson.name
                                )}
                            </div><br/>
                            <img className="displayImg" src={lunch.image} alt="repas" /><br/>
                            <input className="" type="file" onChange={this.getImage} placeholder="Picture" accept="image/*" id="image"/>
                            <button >{isPresent ? "Update" : "Add"} </button> {''}
                            <button onClick={ () => { this.goToHomePage()} }>Cancel</button>
                            </form>
                    
                </div>
            )
    }
  
}
