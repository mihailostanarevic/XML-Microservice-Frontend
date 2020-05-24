import { Button, Checkbox, Form, Icon, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const FormItem = Form.Item;

class LoginForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onLogin(this.props, ()=>{window.location('/dash')});

    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Username" onChange={(e)=>{this.props.updateUser(e)}}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password" onChange={(e)=>{this.props.updatePass(e)}}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <br />
                    <a className="login-form-forgot" href="">Forgot password</a> <br />
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <br />
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        );
    }

}

const NormalLoginForm = Form.create()(LoginForm);

const select = state => ({
    session: state.session
});

export default connect(select)(NormalLoginForm);