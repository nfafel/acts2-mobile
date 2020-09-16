import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../authenticationPage/Login';
import Registration from '../authenticationPage/Registration';
import { connect } from 'react-redux';
import DashboardBottomTabNav from './DashboardBottomTabNav';
import AddItem from '../closet/addItem/AddItem';
import ChatBoard from '../chat/ChatBoard';
import Chat from '../chat/Chat';

const Stack = createStackNavigator();

type AuthenticationStackProps = {
    token: string
}

const AuthenticationStack: React.FC<AuthenticationStackProps> = ({ token }) => {
    return (
        <Stack.Navigator
            initialRouteName={token === "" ? "Login" : "DashboardBottomTabNav"}
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
                name="DashboardBottomTabNav"
                component={DashboardBottomTabNav}
            />
            <Stack.Screen
                name="AddItem"
                component={AddItem}
            />
            <Stack.Screen
                name="ChatBoard"
                component={ChatBoard}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
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