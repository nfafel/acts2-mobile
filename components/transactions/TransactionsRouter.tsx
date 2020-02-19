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
            activeColor="black"
            barStyle={{height: "8%", backgroundColor: "#c4c4c4"}}
            labeled={false}
        >
            <Tab.Screen
                name="Incoming"
                component={Incoming}
                options={{
                    tabBarIcon: ({ focused, color}) => (
                        <View style={{height: 40, width: 40}}>
                            
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Outgoing"
                component={Outgoing}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{height: 40, width: 40}}>
                            
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TransactionsRouter;