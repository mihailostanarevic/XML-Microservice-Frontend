import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './Forms/RegisterForm';



class Registration extends Component{
    render(){
        return(
            <div>
                <SignupForm />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        route: state.session
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Registration);
