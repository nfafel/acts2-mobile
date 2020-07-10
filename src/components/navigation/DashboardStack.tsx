import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardBottomTabNav from './DashboardBottomTabNav';
import AddItem from '../closet/addItem/AddItem';

const Stack = createStackNavigator();

// Anything that should hide the dashboard bottom tab nav should be placed in this stack
const DashboardStack: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="DashboardBottomTabNav"
            headerMode="none"
        >
            <Stack.Screen
                name="DashboardBottomTabNav"
                component={DashboardBottomTabNav}
            />
            <Stack.Screen
                name="AddItem"
                component={AddItem}
            />
        </Stack.Navigator>
    );
}

export default DashboardStack;
