import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  

import ClosetStack from './closet/ClosetStack';
import Market from './market/Market';
import Transactions from './transactions/TransactionsRouter';

const Tab = createMaterialBottomTabNavigator();

const MainTabNav: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="Closet"
            activeColor="black"
            barStyle={{height: 50, backgroundColor: "#c4c4c4"}}
            labeled={false}
            
            // options = {({ navigation }) => {
            //     let tabBarVisible = true;
            //     if (navigation.state.index > 0) {
            //       tabBarVisible = false;
            //     }
            //     return {
            //       tabBarVisible,
            //     };
            // }}
        >
            <Tab.Screen
                name="Closet"
                component={ClosetStack}
                options={{
                    tabBarIcon: ({ focused, color}) => (
                        <View style={{height: 40, width: 40, marginTop: -10}}>
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
                        <View style={{height: 40, width: 40, marginTop: -10}}>
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
                        <View style={{height: 40, width: 53, marginTop: -10}}>
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