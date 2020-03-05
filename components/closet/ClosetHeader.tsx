import React from 'react';
import {Component} from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { logoutUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { IUser } from '../../interfaces/IUser';
import getUser from '../../api/getUser';
import {vh, vw} from '../../css/viewportUnits';

const jwtDecode = require('jwt-decode');

type ClosetHeaderProps = {
    logoutUser: Function,
    token: string,
    navigateToLogin: Function,
}

type ClosetHeaderState = {
    user: IUser | null
}

class ClosetHeader extends Component<ClosetHeaderProps, ClosetHeaderState> {
    constructor(props: ClosetHeaderProps) {
        super(props);
        this.state = {
            user: null
        }
    }

    async componentDidMount() {
        const decoded = jwtDecode(this.props.token);
        const user: IUser = await getUser(decoded.payload.username);
        this.setState({user: user});
    }

    handleLogout() {
        this.props.logoutUser();
        this.props.navigateToLogin();
    }


    render() {
        return (
            <View style={styles.mainView}>
                <Text>{this.state.user ? this.state.user.username : "loading..."}</Text>
                <Text>{this.state.user ? this.state.user.universityId : "loading..."}</Text>
                <Menu style={{position: "absolute", right: 0, top: 5}}>
                    <MenuTrigger>
                        <MaterialCommunityIcon name="dots-vertical" size={35} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => Alert.alert("update")} text='Edit Profile' />
                        <MenuOption onSelect={() => this.handleLogout()} ><Text style={{color: "red"}}>Sign Out</Text></MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        )
    }
}

const mapDispatchToProps = function(dispatch: any) {
    return {
        logoutUser: () => {
            dispatch(logoutUser())
        },
    }
}

const mapStateToProps = function(state: any) {
    return {
        token: state.token,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ClosetHeader);

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#e8e8e8", 
        position: "relative", 
        height: 65*vh
    }
});