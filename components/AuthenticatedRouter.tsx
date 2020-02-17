import React from 'react';
import { View } from 'react-native';
import { createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';  
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  

import Closet from './Closet';
import Market from './Market';
import Transactions from './Transactions';

MaterialCommunityIcon.loadFont();
FontAwesomeIcon.loadFont();
const AuthenticatedRouter = createMaterialBottomTabNavigator(
    {
        Closet: { screen: Closet,  
            navigationOptions:{  
                tabBarLabel:'Closet',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <MaterialCommunityIcon style={[{color: tintColor}]} size={25} name={'tshirt-crew'}/>  
                    </View>),  
                    activeColor: 'black',  
                    inactiveColor: 'grey',  
                    barStyle: { backgroundColor: '#ebebeb', height: "7%" },
            }  
        },  
        Market: { screen: Market,  
            navigationOptions:{  
                tabBarLabel:'Market',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <MaterialCommunityIcon style={[{color: tintColor}]} size={25} name={'cart'}/>  
                    </View>),  
                activeColor: 'black',  
                inactiveColor: 'grey', 
                barStyle: { backgroundColor: '#ebebeb', height: "7%" },
            },
        },  
        Transactions: { screen: Transactions,  
            navigationOptions:{  
                tabBarLabel:'Transactions',  
                tabBarIcon: ({ tintColor }) => (  
                    <View style={{width: 32}}>  
                        <FontAwesomeIcon style={[{color: tintColor}]} size={25} name={'handshake-o'}/>  
                    </View>),  
                activeColor: 'black',  
                inactiveColor: 'grey', 
                barStyle: { backgroundColor: '#ebebeb', height: "7%" },
            },
        },  
    }
);

// const AuthenticatedRouter: React.FC = () => {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 screenOptions={({ route }: any) => ({
//                     tabBarIcon: ({ focused }: any) => {
//                         let iconName: string = '';

//                         if (route.name === 'Closet') {
//                             iconName = focused ? 'tshirt-crew' : 'tshirt-crew-outline';
//                         } else if (route.name === 'Market') {
//                             iconName = focused ? 'cart' : 'cart-outline';
//                         } 

//                         // You can return any component that you like here!
//                         return <Icon name={iconName} size={50} color="black" />;
//                     },
//                 })}
//             >
//                 <Tab.Screen name="Closet" component={Closet} />
//                 <Tab.Screen name="Market" component={Market} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     )
// }

export default createAppContainer(AuthenticatedRouter);