import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from "lodash";

class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            firstName:"",
            lastName:"",
            address:""
        }
        this.listenToEmitter()
    }

    listenToEmitter=()=>{
        emitter.on('EVENT_CLEAR_MODAL_DATA',data=>{
           this.setState({
                email:"",
                password:"",
                firstName:"",
                lastName:"",
                address:""
           })
        })
    }

    componentDidMount() {
        let user= this.props.currentUser
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email:user.email,
                password:"harcode",
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address
            })
        }

    }


    toggle=()=>{
        this.props.toggleFormParent()
    }

    handleOnchangeInput=(event,id)=>{
        //bad code
        // this.state[id]=event.target.value
        // this.setState({
        //     ...this.state
        // },()=>{
        //     console.log('check bad state:', this.state);
        // })
        //good code
        let coppyState={...this.state}
        coppyState[id]=event.target.value
        this.setState({
            ...coppyState
        },()=>{
           
        })
    }
    checkValidateInput=()=>{
        let isValid=true
        let arrInput=['email','password','firstName','lastName','address']
        for( let i=0;i< arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid=false
                alert("Missing parameter:"+ arrInput[i])
                break
            }
        }
        return isValid
    }

    handleSaveUser = ()=>{
         let isValid= this.checkValidateInput()
         if(isValid=== true){
            //call api create modal
            this.props.editUser(this.state)
         }
        console.log("data modal", this.state);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={"modal-user-container"}
            size="lg"
            centered
            >
          <ModalHeader toggle={()=>{this.toggle()}}>Edit a new user</ModalHeader>
          <ModalBody>
            <div className='modal-user-body'>
                <div className='input-container'>
                    <label>Email</label>
                    <input 
                    type='text' 
                    onChange={(event)=>{this.handleOnchangeInput(event,"email")}}
                    value={this.state.email}
                    disabled
                    ></input>
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input 
                    type='password' 
                    onChange={(event)=>{this.handleOnchangeInput(event,"password")}}
                    value={this.state.password}
                    disabled
                    ></input>
                </div>
            </div>
            <div className='modal-user-body'>
                <div className='input-container'>
                    <label>First Name</label>
                    <input 
                    type='text' 
                    onChange={(event)=>{this.handleOnchangeInput(event,"firstName")}}
                    value={this.state.firstName}
                    ></input>
                </div>
                <div className='input-container'>
                    <label>Last Name</label>
                    <input 
                    type='text' 
                    onChange={(event)=>{this.handleOnchangeInput(event,"lastName")}}
                    value={this.state.lastName}
                    ></input>
                </div>
            </div>
            <div className='modal-user-body'>
                <div className='input-container2'>
                    <label>Address</label>
                    <input 
                    type='text' 
                    onChange={(event)=>{this.handleOnchangeInput(event,"address")}}
                    value={this.state.address}
                    ></input>
                </div>
            </div>
            
          </ModalBody>
          <ModalFooter>
            <Button 
            color="primary" 
            className='px-3' 
            onClick={()=>{this.handleSaveUser()}}

            >
                Save changes</Button>{' '}
            <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>Close</Button>
          </ModalFooter>
        </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
