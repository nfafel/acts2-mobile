import React from 'react';
import {Component} from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { logoutUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { IUser, IReduxState } from '../../interfaces';
import {vh, vw} from '../../css/viewportUnits';
import { Appbar, Menu, Divider } from 'react-native-paper';

interface IClosetHeaderProps {
    logoutUser: Function;
    user: IUser | null;
    navigateToLogin: Function;
}

interface IClosetHeaderState {
    isMenuOpen: boolean;
}

class ClosetHeader extends Component<IClosetHeaderProps, IClosetHeaderState> {
    constructor(props: IClosetHeaderProps) {
        super(props);
        this.state = {
            isMenuOpen: false,
        }
    }

    handleOpenMenu() {
        this.setState({isMenuOpen: true});
    }

    handleCloseMenu() {
        this.setState({isMenuOpen: false});
    }

    handleLogout() {
        this.props.logoutUser();
        this.props.navigateToLogin();
    }

    render() {
        const headingTitle = this.props.user ? this.props.user.username : 'Loading...';
        const headingSubtitle = this.props.user ? this.props.user.universityId : 'Loading...';

        return (
            <Appbar.Header>
                <Appbar.Content title={headingTitle} subtitle={headingSubtitle} />
                <Menu
                    visible={this.state.isMenuOpen}
                    onDismiss={this.handleCloseMenu.bind(this)}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={this.handleOpenMenu.bind(this)} />}
                >
                    <Menu.Item onPress={() => Alert.alert("update")} title='Edit Profile' />
                    <Divider />
                    <Menu.Item onPress={this.handleLogout.bind(this)} title='Logout' />
                </Menu>
            </Appbar.Header>
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