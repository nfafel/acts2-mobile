import React, {Component} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { connect } from 'react-redux';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import {vw, vh} from '../../css/viewportUnits';
import { getMessagesByChat } from '../../api';
import { IUser, IReduxState, IMessage, IChat } from '../../interfaces';

interface IChatProps {
    route: any,
    navigation: any,
    user: IUser | null;
}

interface IChatState {
    messages: IMessage[] | undefined;
}

class Chat extends Component<IChatProps, IChatState> {
    constructor(props: IChatProps) {
        super(props);
        this.state = {
            messages: undefined,
        }
    }

    async componentDidMount() {
        if (!this.props.user) {
            Alert.alert("An error occured. Please log out and log back in");
            return;
        }

        try {
            const { chat }: {chat: IChat} = this.props.route.params;
            const messages: IMessage[] = await getMessagesByChat(chat.id);
            this.setState({messages: messages});
        } catch(err) {
            console.log(err);
            Alert.alert("An error occured. Please log out and log back in");
        }
    }

    getChatMessages() {
        if (this.state.messages) {
            return this.state.messages.map(message => 
                <View key={message.id}>
                    <Text>{message.text}</Text>
                </View>
            )
        }
    }

    render() {     
        const { chat }: {chat: IChat} = this.props.route.params;

        return (
            <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.navigate("ChatBoard")}
                    />
                    <Appbar.Content title={chat.id}/>
                </Appbar.Header>
                <ScrollView>
                    {this.getChatMessages()}
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
  
export default connect(mapStateToProps)(Chat);