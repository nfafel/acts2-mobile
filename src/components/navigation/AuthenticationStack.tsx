import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../authenticationPage/Login';
import Registration from '../authenticationPage/Registration';
import DashboardStack from './DashboardStack';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

type AuthenticationStackProps = {
    token: string
}

const AuthenticationStack: React.FC<AuthenticationStackProps> = ({ token }) => {
    return (
        <Stack.Navigator
            initialRouteName={token === "" ? "Login" : "DashboardStack"}
            headerMode="none"
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Registration"
                component={Registration}
            />
            <Stack.Screen
                name="DashboardStack"
                component={DashboardStack}
            />
        </Stack.Navigator>
    );
}

const mapStateToProps = function(state: any) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps)(AuthenticationStack);