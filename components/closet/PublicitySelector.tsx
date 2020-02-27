import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

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
        <View style={{flexDirection: "row", margin: 30}}>
            <TouchableOpacity
                style={{borderColor: "black", borderWidth: 2, borderBottomWidth: 5, flex: 1, flexDirection: "row", justifyContent: "center", backgroundColor: getButtonColor("give"), height: 70}}
                onPress={() => setPublicity('give')}
            >
                <Text style={{fontSize: 24, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Give It</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{borderColor: "black", borderWidth: 2, borderLeftWidth: 0, borderBottomWidth: 5, flex: 1, flexDirection: "row", justifyContent: "center", backgroundColor: getButtonColor("sell"), height: 70}}
                onPress={() => setPublicity('sell')}
            >
                <Text style={{fontSize: 24, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Sell It</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{borderColor: "black", borderWidth: 2, borderLeftWidth: 0, borderBottomWidth: 5, borderRightWidth: 5, flex: 1, flexDirection: "row", justifyContent: "center", backgroundColor: getButtonColor("keep"), height: 70}}
                onPress={() => setPublicity('keep')}
            >
                <Text style={{fontSize: 24, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Keep It</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PublicitySelector;