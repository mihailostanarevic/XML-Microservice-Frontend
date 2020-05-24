import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'antd';


class Dashboard extends Component {
    render() {
        console.log(this.props.session);
        console.log(this.props.contacts);
        return (
            <Row>
                <Col>
                    Congratz, you've logged in!
                </Col>
            </Row>
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


export default connect(mapDispatchToProps, mapStateToProps)(Dashboard);

