import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Incoming from './Incoming';
import Outgoing from './Outgoing';

type TransactionsProps = {
    
}

const Tab = createMaterialTopTabNavigator();

const TransactionsRouter: React.FC<TransactionsProps> = () =>  {

    return (
        <Tab.Navigator
            initialRouteName="Incoming"
            tabBarOptions={{
                labelStyle: {fontSize: 15, fontWeight: "bold"}
            }}
            style={{ backgroundColor: "black"}}
            labeled={false}
        >
            <Tab.Screen
                name="Incoming"
                component={Incoming}
                // options={{
                //     tabBarIcon: ({ focused, color}) => (
                //         <View style={{height: 40, width: 40}}>
                            
                //         </View>
                //     ),
                // }}
            />
            <Tab.Screen
                name="Outgoing"
                component={Outgoing}
                // options={{
                //     tabBarIcon: ({ focused, color }) => (
                //         <View style={{height: 40, width: 40, backgroundColor: "blue"}}>
                //             <Text>Hello</Text>
                //         </View>
                //     ),
                // }}
            />
        </Tab.Navigator>
    )
}

export default TransactionsRouter;