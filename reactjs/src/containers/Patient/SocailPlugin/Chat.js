import React, { Component } from 'react';
import { connect } from "react-redux";


class Chat extends Component {
    constructor(props){
        super(props)
        this.state={
          
        }
    }
     
    componentDidMount(){
       
   
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"d2311defe4cde74adff468ea416ae88","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
/* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */

}

    async componentDidUpdate(prevProps,prevState,snapshot){
        if(this.props.language !== prevProps.language){

         
        }
    }

    


    render() {
        return (
            
           <div></div>
        );
    }
    }


const mapStateToProps = state => {
    return {
        language:state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
