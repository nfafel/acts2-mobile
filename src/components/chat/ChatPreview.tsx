import React, {Component} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';

import Item from '../Item';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import {vw, vh} from '../../css/viewportUnits';
import { getItemsByUser } from '../../api';
import { IItem, IUser, IReduxState, IChat } from '../../interfaces';

interface IChatPreviewProps {
    chat: IChat;
    navigation: any;
}

class ChatPreview extends Component<IChatPreviewProps> {

    render() {        
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', {chat: this.props.chat})}>
                <Text>
                    {this.props.chat.id}
                </Text>
            </TouchableOpacity>
        )
    }
}
  
export default ChatPreview;