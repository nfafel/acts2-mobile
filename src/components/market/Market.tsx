import React from 'react';
import {Component} from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import Item from '../Item';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import {vh, vw} from '../../css/viewportUnits';
import { getItemsByUniversity } from '../../api';
import { IItem, IReduxState, IUser } from '../../interfaces';

interface MarketProps {
    token: string;
    user: IUser | null;
}

interface MarketState {
    items: IItem[] | null;
}

class Market extends Component<MarketProps, MarketState> {
    constructor(props: MarketProps) {
        super(props);
        this.state = {
            items: null
        }
    }

    async componentDidMount() {
        if (!this.props.user) return;
        
        try {
            const marketItems: IItem[] = await getItemsByUniversity(this.props.user.universityId);
            this.setState({items: marketItems})
        } catch(err) {
            console.log(err);
        }
    }

    getMarketItems() {
        if (this.state.items === null) {
            return (
                <SafeAreaView>
                    <ActivityIndicator />
                </SafeAreaView>
            )
        }

        let marketView: JSX.Element[] = [];
        for (var i=0; i<this.state.items.length; i+=2) {
            marketView.push(
                <View key={i} style={{flexDirection: "row"}}>
                    <Item item={this.state.items[i]} /> 
                    {(i+1 < this.state.items.length) ? 
                        <Item item={this.state.items[i+1]} /> 
                    :
                        <View style={{flex:1, margin: 5*vw}}></View>
                    }
                </View>
            )
        }

        return (
            <ScrollView>
                {marketView}
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

const mapStateToProps = function(state: IReduxState) {
    return {
        token: state.token,
        user: state.user,
    }
}

export default connect(mapStateToProps)(Market);