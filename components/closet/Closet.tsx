import React, {Component} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import ClosetHeader from './ClosetHeader';
import Item from '../Item';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import {vw, vh} from '../../css/viewportUnits';

type ClosetProps = {
    navigation: any
}

type ClosetState = {
    addNewOpen: boolean,
    closetItems: any[]  //change to item type
}

class Closet extends Component<ClosetProps, ClosetState> {
    constructor(props: ClosetProps) {
        super(props);
        this.state = {
            addNewOpen: false,
            closetItems: [{}],
        }
    }

    getClosetItems() {
        return this.state.closetItems.map((item, i) => <Item key={i} data={item} /> )
    }

    render() {
        if (this.state.closetItems.length === 0) {
            return (
                <SafeAreaView>
                    <ClosetHeader />
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
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView>
                <ClosetHeader />
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
            </SafeAreaView>
        )
    }
}

export default Closet;