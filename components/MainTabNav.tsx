import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  

import Closet from './closet/Closet';
import Market from './market/Market';
import Transactions from './transactions/TransactionsRouter';

const Tab = createMaterialBottomTabNavigator();

const MainTabNav: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="Closet"
            activeColor="black"
            barStyle={{height: "7%", backgroundColor: "#c4c4c4"}}
            labeled={false}
        >
            <Tab.Screen
                name="Closet"
                component={Closet}
                options={{
                    tabBarIcon: ({ focused, color}) => (
                        <View style={{height: "200%", width: "170%", marginTop: "-20%"}}>
                            <MaterialCommunityIcon 
                                name={focused ? "tshirt-crew" : "tshirt-crew-outline"}
                                color={color}
                                size={40}
                                style={{width: 40, height: 40, flex: 1}}
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
                        <View style={{height: "200%", width: "170%", marginTop: "-20%"}}>
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
                        <View style={{height: "200%", width: "220%", marginTop: "-20%"}}>
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
    )
}

export default MainTabNav;