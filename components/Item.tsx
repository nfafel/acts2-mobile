import React from 'react';
import {Component} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

type ItemProps = {
    data: any
}

type ItemState = {
    
}

class Item extends Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <View>
                <Text>Item</Text>
            </View>
        )
    }
}

export default Item;