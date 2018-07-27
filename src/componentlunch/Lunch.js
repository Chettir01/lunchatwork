import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Pager} from 'react-bootstrap';
import * as LunchServices from '../services/Lunch';


export class  Lunch extends Component{
    
    static propTypes = {
        lunch: PropTypes.object,
    };

    constructor(props){
        super(props);
        
        this.state = {
            lunch: {},
        }
    };

    componentDidMount() {
        this.onSelectLunch(this.props.match.params.id) 
    };

    onSelectLunch = (id) => {
        LunchServices.displayLunch(id)
            .then(r => r.json())
            .then(lunch => this.setState({lunch}));
    };

    handleDelete = (lunch) => {
        
        LunchServices.removeLunch(lunch.id).then(()=>{
            this.props.history.push("/list");
            let message = lunch.plat + " has been deleted";
            alert(message);
        }); 
    };

    render(){    
        const {lunch} = this.state;
        //const image = person.image;
        return(
            <div className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4">
                <h3 className="person-title">Lunch informations</h3>
                    <div className="card"> 
                        {/* className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4" */}
                        <div className="card-image ">
                            <input id="img" type="file" accept="image/*" className="hideInput" onChange={this.inputFileChange} />
                        </div>
                       
                        <div className="card-information">
                            <div>
                                <label>Nom du plat:</label> {lunch.plat}
                            </div>
                            <div>
                                <label>Description:</label> {lunch.description}
                            </div>
                            <div>
                                <label>Composition:</label> {lunch.composition}
                            </div>
                            <div>
                                <label>Date:</label> {lunch.date}
                            </div>
                            <div>
                                <label>Person:</label> {lunch.person.name}
                            </div>
                        </div>
                    </div> 
                    <div className="card-action">
                        <Pager>
                            <Pager.Item><Link to={`/update/${lunch.id}`}>Update</Link></Pager.Item>{' '}
                            <Pager.Item data-toggle="modal" data-target="#myModal">Delete</Pager.Item>{' '}

                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog modal-sm">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Are you sure?</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>Do you really want to delete "{lunch.plat}" <br/>This process cannot be undone</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={ ()=>{this.handleDelete(lunch)} } >Delete</button>
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