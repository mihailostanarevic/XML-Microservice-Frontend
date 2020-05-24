import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, message} from 'antd';
import NormalLoginForm from './Forms/LoginForm';
import { login } from '../apis/sessions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }

    }

    updateUser=(e)=>{
        //console.log(e.target.value);
        this.setState({
            username: e.target.value
        });
    }

    updatePass=(e)=>{
        //console.log(e.target.value);
        this.setState({
            password: e.target.value
        });
    }

    render() {

        return (
            <Row type="flex" justify="center" align="middle" gutter={16} className="row">
                {this.props.error ? message.error('There was an error logging in \n' + this.props.error): null }
                <Col span={14}>
                    <h1>Login Template</h1>
                    <p>Welcome to the login template featuring react, redux and ant design. Feel free to use this template and adjust it accordingly.
                    </p>
                </Col>
                <Col span={10}>
                    <Divider orientation="left"><h2>Login</h2></Divider>
                    <NormalLoginForm username={this.state.username} password={this.state.password}
                                     updateUser={this.updateUser} updatePass={this.updatePass}
                                     onLogin={this.props.onLogin}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.session.isLoggedIn,
        session: state.session,
        error: state.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userData, cb) => { dispatch(login(userData, cb)); },
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Login);