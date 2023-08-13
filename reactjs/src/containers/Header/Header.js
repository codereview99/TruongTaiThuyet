import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorsMenu } from './menuApp';
import './Header.scss';
import {USER_ROLE, languages} from "../../utils"
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            MenuApp:[]
        }
    }
    handleChangeLanguage=(language)=>{
        this.props.changelanguageAppRedux(language)
    }
    componentDidMount(){
        let userInfo= this.props.userInfo
        let menu=[]
        if(userInfo && !_.isEmpty(userInfo)){
            let role= userInfo.roleId
            if(role === USER_ROLE.ADMIN){
                menu=adminMenu
            }
            if(role === USER_ROLE.DOCTOR){
                menu=doctorsMenu
            }
        }

        this.setState({
            MenuApp:menu
        })
    }

    render() {
        console.log("check user info", this.props.userInfo);

        const { processLogout,language,userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.MenuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id="homeheader.welcome"/> {userInfo && userInfo.firstName ? userInfo.firstName+" "+userInfo.lastName :""} !
                    </span>
                    <div className={language === languages.VI ? "language-vi active" : "language-vi"}><span onClick={()=> this.handleChangeLanguage(languages.VI)}>VN</span></div>
                    <div className={language === languages.EN ? "language-en active" : "language-en"}><span onClick={()=> this.handleChangeLanguage(languages.EN)}>EN</span></div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,  
        language:state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changelanguageAppRedux:(language)=>dispatch(actions.changelanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
