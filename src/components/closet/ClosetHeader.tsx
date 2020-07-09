import React from 'react';
import {Component} from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { logoutUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { IUser, IReduxState } from '../../interfaces';
import {vh, vw} from '../../css/viewportUnits';

type ClosetHeaderProps = {
    logoutUser: Function,
    user: IUser | null,
    navigateToLogin: Function,
}

class ClosetHeader extends Component<ClosetHeaderProps> {

    handleLogout() {
        this.props.logoutUser();
        this.props.navigateToLogin();
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text>{this.props.user ? this.props.user.username : "loading..."}</Text>
                <Text>{this.props.user ? this.props.user.universityId : "loading..."}</Text>
                <Menu style={{position: "absolute", right: 0, top: 5}}>
                    <MenuTrigger>
                        <MaterialCommunityIcon name="dots-vertical" size={35} />
                    </MenuTrigger>
                    <MenuOptions >
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

const mapStateToProps = function(state: IReduxState) {
    return {
        user: state.user,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ClosetHeader);

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#f5f5f5", 
        position: "relative", 
        height: 65*vh
    }
});