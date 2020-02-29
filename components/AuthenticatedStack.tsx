import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabNav from './MainTabNav';
import AddItem from './closet/AddItem';

const Stack = createStackNavigator();

type AuthenticatedStackProps = {
    token: string
}

const AuthenticatedStack: React.FC<AuthenticatedStackProps> = ({ token }) => {
    return (
        <Stack.Navigator
            initialRouteName="MainTabNav"
            headerMode="none"
        >
            <Stack.Screen
                name="MainTabNav"
                component={MainTabNav}
            />
            <Stack.Screen
                name="AddItem"
                component={AddItem}
            />
        </Stack.Navigator>
    );
}

export default AuthenticatedStack;