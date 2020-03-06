import React from 'react';
import {Component} from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { IClosetItemWImages } from '../../interfaces/IClosetItemWImages';
import Item from '../Item';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import {vh, vw} from '../../css/viewportUnits';
import getUniversityClosetItems from '../../api/getUniversityClosetItems';
const jwtDecode = require('jwt-decode');

type MarketProps = {
    token: string
}

type MarketState = {
    closetItemsWImages: IClosetItemWImages[] | null
}

class Market extends Component<MarketProps, MarketState> {
    constructor(props: MarketProps) {
        super(props);
        this.state = {
            closetItemsWImages: null
        }
    }

    async componentDidMount() {
        try {
            const decoded = jwtDecode(this.props.token);
            const marketClosetItems: IClosetItemWImages[] = await getUniversityClosetItems(decoded.payload.universityId);
            this.setState({closetItemsWImages: marketClosetItems})
        } catch(err) {
            console.log(err);
        }
    }

    getMarketItems() {
        if (this.state.closetItemsWImages === null) {
            return (
                <SafeAreaView>
                    <Spinner />
                </SafeAreaView>
            )
        }

        let closetView: JSX.Element[] = [];
        for (var i=0; i<this.state.closetItemsWImages.length; i+=2) {
            closetView.push(
                <View key={i} style={{flexDirection: "row"}}>
                    <Item closetItemWImages={this.state.closetItemsWImages[i]} /> 
                    {(i+1 < this.state.closetItemsWImages.length) ? 
                        <Item closetItemWImages={this.state.closetItemsWImages[i+1]} /> 
                    :
                        <View style={{flex:1, margin: 5*vw}}></View>
                    }
                </View>
            )
        }

        return (
            <ScrollView>
                {closetView}
            </ScrollView>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
                <View>
                    <MaterialCommunityIcon name="magnify" size={35} />
                </View>
                {this.getMarketItems()}
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

export default connect(mapStateToProps)(Market);