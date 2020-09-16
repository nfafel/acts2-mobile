import React from 'react';

import Closet from '../closet/Closet';
import Market from '../market/Market';
import Transactions from '../transactions/Transactions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

interface IDashboardBottomTabNavProps {
    navigation: any,
}

const DashboardBottomTabNav: React.FC<IDashboardBottomTabNavProps> = ({ navigation }) => {
    // const [index, setIndex] = React.useState(0);
    // const [routes] = React.useState([
    //     { key: 'closet', title: 'Closet', icon: 'tshirt-crew', color: '#e0342b' },
    //     { key: 'market', title: 'Market', icon: 'shopping', color: '#0311a8' },
    //     { key: 'transactions', title: 'Transactions', icon: 'swap-horizontal-bold', color: '#07a631' },
    // ]);

    // const ClosetWithNavigation = () => <Closet navigation={navigation} />;
    // // const MarketWithNavigation = () => <Closet navigation={navigation} />;
    // const TransactionsWithNavigation = () => <TransactionsRouter navigation={navigation} />;

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Closet"
                component={Closet}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="tshirt-crew" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shopping" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Transactions"
                component={Transactions}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="swap-horizontal-bold" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default DashboardBottomTabNav;