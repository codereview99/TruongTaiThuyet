import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'; 

// Import css files
import { FacebookShareButton, FacebookIcon } from 'react-share';

class HomeFooter extends Component {
    
    
    render() {
        
        return (
            <React.Fragment>
                <div className='homeFooter'>  
                    {/* <p>&copy; 2023 PhamMinhHieu_2019604168 <a href='https://www.topcv.vn/xem-cv/A1UDV1AIVA1WDwRWVFBSA1dUAwFRCgYAWlNTVw30ec'>I want to developer</a></p> */}
                    
                </div>
            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language:state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
