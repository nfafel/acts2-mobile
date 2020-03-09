import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {vw, vh} from '../../css/viewportUnits';

type GenderSelectorProps = {
    gender: string,
    setGender: Function
}

const GenderSelector: React.FC<GenderSelectorProps> = ({gender, setGender}) => {
    
    const getTouchableOpacityStyle = (givenGender: string): any => {
        if (gender == givenGender) {
            return {borderWidth: 2, borderRadius: 5};
        }
        return {};
    }

    return (
        <View style={styles.mainView}>
            <View style={{height: 70*vh, width: 60*vw, alignItems: "center", ...getTouchableOpacityStyle("female")}}>
                <TouchableOpacity 
                    onPress={() => setGender("female")} 
                    style={{alignItems: "center", justifyContent: "center", flex: 1}} 
                >
                    <Image source={require('../../assets/female.png')} style={styles.image} />
                    <Text>Girls</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 70*vh, width: 60*vw, marginHorizontal: 20*vw, alignItems: "center", ...getTouchableOpacityStyle("unisex")}}>
                <TouchableOpacity 
                    onPress={() => setGender("unisex")} 
                    style={{alignItems: "center", justifyContent: "center", flex: 1}} 
                >
                    <Image source={require('../../assets/unisex.png')} style={styles.image} />
                    <Text>Unisex</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 70*vh, width: 60*vw, alignItems: "center", ...getTouchableOpacityStyle("male")}}>
                <TouchableOpacity 
                    onPress={() => setGender("male")} 
                    style={{alignItems: "center", justifyContent: "center", flex: 1}} 
                >
                    <Image source={require('../../assets/male.png')} style={styles.image} />
                    <Text>Boys</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GenderSelector;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row", 
        marginVertical: 20*vh, 
        alignSelf: "center", 
        height: 65*vh, 
    },
    image: {
        height: 40*vh, 
        aspectRatio: 0.5, 
        resizeMode: 'stretch'
    }
})