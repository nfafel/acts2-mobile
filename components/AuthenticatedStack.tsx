import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabNav from './MainTabNav';
import AddItem from './closet/AddItem';
import Camera from './closet/Camera';

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
            <Stack.Screen
                name="Camera"
                component={Camera}
            />
        </Stack.Navigator>
    );
}

export default AuthenticatedStack;