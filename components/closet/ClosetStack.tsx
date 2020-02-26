import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './Camera';
import AddItem from './AddItem';
import Closet from './Closet';

const Stack = createStackNavigator();

const ClosetStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Closet"
      headerMode="none"
    >
        <Stack.Screen
            name="Closet"
            component={Closet}
            mode="modal"
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

export default ClosetStack;