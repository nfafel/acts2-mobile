import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';  
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  

import Closet from './Closet';
import Market from './Market';
import Transactions from './Transactions';

const Tab = createMaterialBottomTabNavigator();

const AuthenticatedRouter: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Closet"
                activeColor="black"
                labelStyle={{ fontSize: 12 }}
                barStyle={{height: "8%", backgroundColor: "#c4c4c4"}}
                labeled={false}
            >
                <Tab.Screen
                    name="Closet"
                    component={Closet}
                    options={{
                        tabBarIcon: ({ focused, color}) => (
                            <View style={{height: 40, width: 40}}>
                                <MaterialCommunityIcon 
                                name={focused ? "tshirt-crew" : "tshirt-crew-outline"}
                                color={color} 
                                size={40} 
                            />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Market"
                    component={Market}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <View style={{height: 40, width: 40}}>
                                <MaterialCommunityIcon 
                                    name={focused ? "cart" : "cart-outline"}
                                    color={color} 
                                    size={40} 
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Transactions"
                    component={Transactions}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <View style={{height: 40, width: 53}}>
                                <FontAwesome5Icon 
                                    name="handshake" 
                                    color={color} 
                                    size={40} 
                                    solid={focused} />
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AuthenticatedRouter;