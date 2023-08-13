import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  {handleLoginApi}  from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            isShowPassword:false,
            errMessage:""
        }
    }
    handleOnChangeUsername=(event)=>{
        this.setState({
            username:event.target.value
        })
        
    }

    handleOnChangePassword=async(event)=>{
        await this.setState({
            password:event.target.value
        })
       
    }

    handleLogin=async()=>{
       this.setState({
        errMessage:""
       })
        
       try{
          let data=  await handleLoginApi(this.state.username,this.state.password)
          
          if(data && data.errCode !== 0){
            this.setState({
                errMessage:data.errMessage
               })
          }
          if(data && data.errCode === 0){
            this.props.userLoginSuccess(data.user)
          }
       }catch(err){
            if(err.response){
                if(err.response.data){
                    this.setState({
                        errMessage:err.response.data.message
                    })
                }
            }
            console.log(err.response);
       }
    }

    handleShowHidePassowrd=()=>{
        this.setState(
            {
                isShowPassword:!this.state.isShowPassword
            }
        )
    }

    handleKeyDown=(event)=>{
        if(event.key==='Enter'){
            this.handleLogin()
        }
    }

    render() {
        console.log('check state', this.state);
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'> Login</div>
                        <div className='col-12 form-groud login-input'>
                            <label>Username:</label>
                            <input type='text' 
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event)=>this.handleOnChangeUsername(event)}
                                ></input>
                        </div>
                        <div className='col-12 form-groud login-input'>
                            <label>Password:</label>
                            <div  className='custom-input-password'>
                            <input type={this.state.isShowPassword ? "text":"password"} 
                                className='form-control' 
                                placeholder='Enter your password' 
                                value={this.state.password}
                                onChange={(event)=>this.handleOnChangePassword(event)}
                                onKeyDown={(event)=>this.handleKeyDown(event)}
                                >
                                
                            </input>

                            <span onClick={()=>this.handleShowHidePassowrd()}>
                                <i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash" }></i>
                            </span>
                            </div>
                            
                        </div>
                        <div className='col-12' style={{color:"red"}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='login-btn' onClick={()=>this.handleLogin()}>Login</button>
                        </div>
                       
                        <div className='col-12 '>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-center'>Or login with:</span>
                        </div>
                        <div className='col-12 cocial-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-twitter twitter"></i>
                            <i className="fab fa-facebook-f facebook "></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo)=>dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
