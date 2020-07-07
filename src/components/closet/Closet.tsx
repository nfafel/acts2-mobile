import React, {Component} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ClosetHeader from './ClosetHeader';
import Item from '../Item';
import { connect } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import {vw, vh} from '../../css/viewportUnits';
import { IClosetItemWImages } from '../../interfaces/IClosetItemWImages';
import getClosetItemsByUser from '../../api/getClosetItemsByUser';
import {setClosetItems} from '../../redux/actions';

const jwtDecode = require('jwt-decode');

type ClosetProps = {
    navigation: any,
    closetItemsWImages: IClosetItemWImages[] | null,
    initClosetItemsWImages: Function,
    token: string
}

class Closet extends Component<ClosetProps> {
    
    async componentDidMount() {
        try {
            const decoded = jwtDecode(this.props.token);
            const closetItems: IClosetItemWImages[] = await getClosetItemsByUser(decoded.payload.username);
            this.props.initClosetItemsWImages(closetItems);
        } catch(err) {
            console.log(err);
            Alert.alert("An error occured. Please log out and log back in")
        }
    }

    getClosetItems() {
        let closetView: JSX.Element[] = [];
        if (this.props.closetItemsWImages !== null) {
            for (var i=0; i<this.props.closetItemsWImages.length; i+=2) {
                closetView.push(
                    <View key={i} style={{flexDirection: "row"}}>
                        <Item closetItemWImages={this.props.closetItemsWImages[i]} /> 
                        {(i+1 < this.props.closetItemsWImages.length) ? 
                            <Item closetItemWImages={this.props.closetItemsWImages[i+1]} /> 
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
        var closetBody: JSX.Element;
        if (this.props.closetItemsWImages === null) {
            closetBody = (
                <View>
                    <ActivityIndicator />
                </View>
            );
        } else if (this.props.closetItemsWImages.length === 0) {
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

const mapStateToProps = function(state: any) {
    return {
        closetItemsWImages: state.closetItemsWImages,
        token: state.token
    }
}

const mapDispatchToProps = function(dispatch: any) {
    return {
        initClosetItemsWImages: (closetItemsWImages: IClosetItemWImages[]) => {
            dispatch(setClosetItems({closetItemsWImages: closetItemsWImages}))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Closet);