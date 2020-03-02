import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {vw, vh} from '../../css/viewportUnits';

type PublicitySelectorProps = {
    publicity: string,
    setPublicity: Function
}

const PublicitySelector: React.FC<PublicitySelectorProps> = ({publicity, setPublicity}) => {
    const getButtonColor = (name: string): string => {
        if (publicity == name) {
            return "#6db1ed";
        }
        return "white";
    }

    return (
        <View style={styles.mainView}>
            <TouchableOpacity
                style={{borderColor: "black", borderWidth: 2, borderBottomWidth: 4, flex: 1, justifyContent: "center", backgroundColor: getButtonColor("give")}}
                onPress={() => setPublicity('give')}
            >
                <Text style={{fontSize: 16*vh, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Market</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{borderColor: "black", borderWidth: 2, borderLeftWidth: 0, borderBottomWidth: 4, flex: 1, justifyContent: "center", backgroundColor: getButtonColor("sell")}}
                onPress={() => setPublicity('sell')}
            >
                <Text style={{fontSize: 16*vh, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Free</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{borderColor: "black", borderWidth: 2, borderLeftWidth: 0, borderBottomWidth: 4, borderRightWidth: 5, flex: 1, justifyContent: "center", backgroundColor: getButtonColor("keep")}}
                onPress={() => setPublicity('keep')}
            >
                <Text style={{fontSize: 16*vh, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Hidden</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PublicitySelector;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row", 
        marginHorizontal: 30*vw, 
        marginTop: 10*vh,
        height: 30*vh
    }
});