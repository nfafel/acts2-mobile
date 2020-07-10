import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import Closet from '../closet/Closet';
import Market from '../market/Market';
import Transactions from '../transactions/TransactionsRouter';

// type DashboardBottomTabNavNavigationProp = StackNavigationProp<

// >

interface IDashboardBottomTabNavProps {
    navigation: any,
}

const DashboardBottomTabNav: React.FC<IDashboardBottomTabNavProps> = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'closet', title: 'Closet', icon: 'tshirt-crew', color: '#e0342b' },
        { key: 'market', title: 'Market', icon: 'shopping', color: '#0311a8' },
        { key: 'transactions', title: 'Transactions', icon: 'swap-horizontal-bold', color: '#07a631' },
    ]);

    const ClosetWithNavigation = () => <Closet navigation={navigation} />;
    // const MarketWithNavigation = () => <Closet navigation={navigation} />;
    // const TransactionsWithNavigation = () => <Closet navigation={navigation} />;

    const renderScene = BottomNavigation.SceneMap({
        closet: ClosetWithNavigation,
        market: Market,
        transactions: Transactions,
    });

    return (
        <BottomNavigation
            shifting={true}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}

export default DashboardBottomTabNav;