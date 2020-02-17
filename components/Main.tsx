import React from 'react';
import {
  SafeAreaView
} from 'react-native';

import { connect } from "react-redux";
import LoginPage from './LoginPage';
import AuthenticatedRouter from './AuthenticatedRouter';

type MainProps = {
    token: string
}

const Main: React.FC<MainProps> = (props) => {
    return (
        <SafeAreaView style={{height: "100%"}}>
            {(props.token === '') ? 
                <LoginPage/> 
                :
                <AuthenticatedRouter /> 
            }
        </SafeAreaView>
    );
};

const mapStateToProps = function(state: any) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps)(Main);