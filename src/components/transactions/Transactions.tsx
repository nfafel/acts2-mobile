import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Incoming from '../transactions/Incoming';
import Outgoing from '../transactions/Outgoing';
import { Appbar } from 'react-native-paper';

type TransactionsProps = {
    navigation: any
}

const Tab = createMaterialTopTabNavigator();

const TransactionsRouter: React.FC<TransactionsProps> = (props) =>  {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title="Transactions"/>
                <Appbar.Action
                    icon="message-text-outline"
                    onPress={() => props.navigation.navigate("ChatBoard")}
                />
            </Appbar.Header>
            <Tab.Navigator
                initialRouteName="Incoming"
                tabBarOptions={{
                    labelStyle: {fontSize: 15, fontWeight: "bold"}
                }}
                style={{ backgroundColor: "black"}}
                // labeled={false}
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
        </SafeAreaView>
    )
}

export default TransactionsRouter;