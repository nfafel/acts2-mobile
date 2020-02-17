import React, {Component} from 'react';
import {
  Text, TouchableOpacity
} from 'react-native';

import { connect } from "react-redux";
import {logoutUser} from '../redux/actions';

type AuthenticatedRouterProps = {
    token: string,
    logoutUser: Function
}

class AuthenticatedRouter extends Component<AuthenticatedRouterProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.logoutUser()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        )
    }
}

const mapDispatchToProps = function(dispatch: any) {
    return {
        logoutUser: () => {
            dispatch( logoutUser() )
        },
    }
}

const mapStateToProps = function(state: any) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRouter);