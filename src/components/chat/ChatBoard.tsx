import React, {Component} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { connect } from 'react-redux';

import Item from '../Item';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import {vw, vh} from '../../css/viewportUnits';
import { getChatsByUser } from '../../api';
import { IUser, IReduxState, IChat } from '../../interfaces';
import ChatPreview from './ChatPreview';

interface IChatBoardProps {
    navigation: any,
    user: IUser | null;
}

interface IChatBoardState {
    chats: IChat[] | undefined;
}

class ChatBoard extends Component<IChatBoardProps, IChatBoardState> {
    constructor(props: IChatBoardProps) {
        super(props);
        this.state = {
            chats: undefined,
        }
    }

    async componentDidMount() {
        if (!this.props.user) {
            Alert.alert("An error occured. Please log out and log back in");
            return;
        }

        try {
            const chats: IChat[] = await getChatsByUser(this.props.user.id);
            this.setState({chats: chats});
        } catch(err) {
            console.log(err);
            Alert.alert("An error occured. Please log out and log back in")
        }
    }

    getChats() {
        if (this.state.chats) {
            return this.state.chats.map(chat => 
                <ChatPreview key={chat.id} navigation={this.props.navigation} chat={chat} />
            );
        }
    }

    render() {        
        return (
            <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.navigate("DashboardBottomTabNav")}
                    />
                    <Appbar.Content title="Chats"/>
                </Appbar.Header>
                <ScrollView>
                    {this.getChats()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = function(state: IReduxState) {
    return {
        user: state.user,
    }
}
  
export default connect(mapStateToProps)(ChatBoard);