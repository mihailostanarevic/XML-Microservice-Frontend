import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './Login';
import Dashboard from './Dashboard';
import Registration from './Registration';


const { Content } = Layout;


class Main extends Component {
    render() {
        return (
            <Layout>
                <Content>
                    <Router>
                        <Switch>
                            <Route exact={true} path='/' component={Login} />
                            <Route path='/dash' component={Dashboard} />
                            <Route path='/register' component={Registration} />
                        </Switch>
                    </Router>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(Main);
