import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import {vh, vw} from '../css/viewportUnits';
import Closet from './closet/Closet';
import Market from './market/Market';
import Transactions from './transactions/TransactionsRouter';

const Tab = createMaterialBottomTabNavigator();

const MainTabNav: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="Closet"
            activeColor="black"
            barStyle={{backgroundColor: "#c4c4c4"}}
            labeled={false}
        >
            <Tab.Screen
                name="Closet"
                component={Closet}
                options={{
                    tabBarIcon: ({ focused, color}) => (
                        <View style={{height: 28*vh, width: 28*vh}}>
                            <MaterialCommunityIcon 
                                name={focused ? "tshirt-crew" : "tshirt-crew-outline"}
                                color={color}
                                size={28*vh}
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
                        <View style={{height: 28*vh, width: 28*vh}}>
                            <MaterialCommunityIcon 
                                name={focused ? "cart" : "cart-outline"}
                                color={color} 
                                size={28*vh}
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
                        <View style={{height: 28*vh, width: 36*vh, marginTop: -0*vh}}>
                            <FontAwesome5Icon 
                                name="handshake" 
                                color={color}
                                size={28*vh} 
                                solid={focused} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabNav;