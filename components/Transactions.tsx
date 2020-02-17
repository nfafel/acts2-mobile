import React from 'react';
import {Component} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

type TransactionsProps = {
    
}

type TransactionsState = {
    
}

class Transactions extends Component<TransactionsProps, TransactionsState> {
    constructor(props: TransactionsProps) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <View>
                <Text>Transactions</Text>
            </View>
        )
    }
}

export default Transactions;