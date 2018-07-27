import React, { Component } from 'react'; 
import './CreateOrUpdate.css';

import * as PersonServices from '../services/person';

export class CreateOrUpdate extends Component {
   constructor(props){
        super(props);

        this.state = {
            person: {
                image:'defaultpic.jpg',
                name: '',
                color: '',
                welcomeMsg: 'Hello Serli',
                email:''
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onSelectPerson = (email) => {
        PersonServices.displayPerson(email)
            .then(r => r.json())
            .then(person => this.setState({person}));
    };

    componentDidMount(){
        this.onSelectPerson(this.props.match.params.email) 
    }

    getImage = (e) => {
        const files = e.currentTarget.files;
        var reader = new FileReader();

        reader.onload = (e) => {
        //  this.setState({image: e.target.result});
            const person = this.state.person;
            person.image = e.target.result;
            this.setState({person});
        }
        reader.readAsDataURL(files[0]);
    }

    handleChange = (e) => { 
        const {person} = this.state;
        person[e.target.id] = e.target.value;
        this.setState({person})
    }

    handleSubmit = (e) => {        
        e.preventDefault();
        //const status = XMLHttpRequest.status;
        let postPerson = PersonServices.updatePerson(this.state.person);
        const isPresent = this.state.person.id;

        let promesseResponse = postPerson
        .then((response) =>{
            return response.json();
        });

        promesseResponse
        .then((person)=>{
            this.props.history.push("/trombinoscope");
           
            let message = "Person with 'name: " + person.name +
                               "\ncolor: " + person.color +
                               "\nwelcomeMsg: "  + person.welcomeMsg +
                               "\nemail: '" + person.email + (isPresent ? " is updated" : " has been created");
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
        this.props.history.push(`/trombinoscope`);
    }
    
    render(){
        const { person } = this.state;
        const isPresent = person.id;
        return(
                <div className="Add-form" style={{marginBottom:'0px'}}>
                    {/* <form horizontal="true" onSubmit={this.handleSubmit}>
                    <h3>{isPresent ? "Update your profile" : "Create your profile" }</h3>   */}
                       
                        {/* code here */}
                        <form class="form" onSubmit={this.handleSubmit} >
                            <h4>{isPresent ? "Update your profile" : "Create your profile"}</h4>
                            <p type="Name:"><input placeholder="Write your name here.." id="name" value={person.name} onChange={this.handleChange.bind(this)} required></input></p>
                            <p type="Color:"><input type="color" id="color" value={person.color} onChange={this.handleChange.bind(this)} style={{height: "20px"}}></input></p>
                            <p type="Welcome message:"><input placeholder="Write your welcome message.." id="welcomeMsg" value={person.welcomeMsg} onChange={this.handleChange.bind(this)}></input></p>
                            <p type="Email:"><input placeholder="Write your email here.." id="email" value={person.email} onChange={this.handleChange.bind(this)} required></input></p>
                            <img className="displayImg" src={person.image} alt="visage" responsive/>
                            <input className="" type="file" onChange={this.getImage} placeholder="Picture" accept="image/*" id="image"/>
                            <button>{isPresent ? "Update :)" : "Add :)"}</button> {''}
                            <button onClick={ () => { this.goToHomePage()} }>Cancel</button>
                            </form>
                        {/*  */}
                        
                    {/* </form> */}
                    
                </div>
            )
    }
  
}


/* <FormGroup >
    <Col componentClass={ControlLabel} sm={6}>Name</Col>
    <Col sm={4} style={{marginBottom:'5px'}}>
        <FormControl type="text" placeholder="Name" id="name" value={person.name} onChange={this.handleChange.bind(this)} required/>
    </Col>
</FormGroup>

<FormGroup>
    <Col componentClass={ControlLabel} sm={6}>Color</Col>
    <Col sm={4} style={{marginBottom:'5px'}}>
        <FormControl type="color" placeholder="Color" id="color" value={person.color} onChange={this.handleChange.bind(this)} />
    </Col>
</FormGroup>

<FormGroup >
    <Col componentClass={ControlLabel} sm={6}>Welcome message</Col>
    <Col sm={4} style={{marginBottom:'5px'}}>
        <FormControl type="text" placeholder="Welcome message" id="welcomeMsg" value={person.welcomeMsg} onChange={this.handleChange.bind(this)}/>
    </Col>
</FormGroup>

<FormGroup >
    <Col componentClass={ControlLabel} sm={6}>Email</Col>
    <Col sm={4} style={{marginBottom:'5px'}}>
        <FormControl type="email" placeholder="Email" id="email" value={person.email} onChange={this.handleChange.bind(this)}/>
    </Col>
</FormGroup>

<FormGroup >
    <Col componentClass={ControlLabel} sm={6}>Image</Col>
    <Col componentClass={ControlLabel} sm={4}>
        <Image className="displayImg" src={person.image} alt="visage" responsive/>
        <FormControl className="hideInput" type="file" onChange={this.getImage} placeholder="Picture" accept="image/*" id="image"/>
    </Col>
</FormGroup>

<FormGroup controlId="formHorizontalButton">
    <Col smOffset={4} sm={8}>
        <Button type="submit">{isPresent ? "Update :)" : "Add :)"} </Button>                           
    </Col>
</FormGroup> */