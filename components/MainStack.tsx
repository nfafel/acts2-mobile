import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './authenticationPage/Login';
import Registration from './authenticationPage/Registration';
import AuthenticatedRouter from './AuthenticatedRouter';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

type MainStackProps = {
    token: string
}

const MainStack: React.FC<MainStackProps> = ({ token }) => {
    return (
        <Stack.Navigator
            initialRouteName={token === "" ? "Login" : "AuthenticatedRouter"}
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
                name="AuthenticatedRouter"
                component={AuthenticatedRouter}
            />
        </Stack.Navigator>
    );
}

const mapStateToProps = function(state: any) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps)(MainStack);