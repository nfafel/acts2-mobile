import React, {Component} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';

import ClosetHeader from './ClosetHeader';
import Item from '../Item';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import {vw, vh} from '../../css/viewportUnits';
import getClosetItemsByUser from '../../api/getClosetItemsByUser';
import { IClosetItem, IUser, IReduxState } from '../../interfaces';

interface IClosetProps {
    navigation: any;
    user: IUser | null;
}

interface IClosetState {
    closetItems: IClosetItem[] | undefined;
}

class Closet extends Component<IClosetProps, IClosetState> {
    constructor(props: IClosetProps) {
        super(props);
        this.state = {
            closetItems: undefined,
        }
    }

    async componentDidMount() {
        if (!this.props.user) {
            Alert.alert("An error occured. Please log out and log back in");
            return;
        }

        try {
            const closetItems: IClosetItem[] = await getClosetItemsByUser(this.props.user.id);
            this.setState({closetItems: closetItems});
        } catch(err) {
            console.log(err);
            Alert.alert("An error occured. Please log out and log back in")
        }
    }

    getClosetItems() {
        const closetView = [];
        if (this.state.closetItems) {
            for (var i=0; i<this.state.closetItems.length; i+=2) {
                closetView.push(
                    <View key={i} style={{flexDirection: "row"}}>
                        <Item closetItem={this.state.closetItems[i]} /> 
                        {(i+1 < this.state.closetItems.length) ? 
                            <Item closetItem={this.state.closetItems[i+1]} /> 
                        :
                            <View style={{flex:1, margin: 5*vw}}></View>
                        }
                    </View>
                )
            }
        }

        return (
            <ScrollView>
                {closetView}
            </ScrollView>
        )
    }

    render() {        
        let closetBody;
        if (!this.state.closetItems) {
            closetBody = (
                <ActivityIndicator />
            );
        } else if (this.state.closetItems.length === 0) {
            closetBody = (
                <View style={{margin: 20}}>
                    <Text style={{fontSize: 30, fontFamily: "marker felt"}}>
                        Your closet is empty!
                    </Text>
                    <View style={{flexDirection: "row", margin: 15}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("AddItem")} >
                            <FontAwesome5Icon 
                                name="plus-square"
                                color="black"
                                size={40*vw}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, fontFamily: "marker felt", alignSelf: "center", marginLeft: 10}}>Add items to your closet</Text>
                    </View>
                </View>
            );
        } else {
            closetBody = (
                <View style={{flex: 1}}>
                    <View>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("AddItem")} 
                            style={{position: "absolute", right: 10*vw, top: 10*vh}}
                        >
                            <FontAwesome5Icon 
                                name="plus-square"
                                color="black"
                                size={40*vw}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize: 25*vh, fontFamily: "marker felt", alignSelf: "center", marginTop: 10}}>My Closet</Text>
                    </View>
                    {this.getClosetItems()}
                </View>
            );
        }

        return (
            <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
                <ClosetHeader navigateToLogin={() => this.props.navigation.navigate("Login")} />
                {closetBody}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = function(state: IReduxState) {
    return {
        user: state.user,
    }
}
  
export default connect(mapStateToProps)(Closet);