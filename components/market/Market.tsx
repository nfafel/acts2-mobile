import React from 'react';
import {Component} from 'react';
import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

type MarketProps = {
    
}

type MarketState = {
    
}

class Market extends Component<MarketProps, MarketState> {
    constructor(props: MarketProps) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Text>Market</Text>
            </SafeAreaView>
        )
    }
}

export default Market;