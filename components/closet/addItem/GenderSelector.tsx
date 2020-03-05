import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {vw, vh} from '../../../css/viewportUnits';

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
            <TouchableOpacity 
                onPress={() => setGender("female")} 
                style={{alignItems: "center", padding: 10, ...getTouchableOpacityStyle("female")}} 
            >
                <Image source={require('../../../assets/female.png')} style={styles.image} />
                <Text>Girls</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setGender("unisex")}
                style={{alignItems: "center", marginHorizontal: 30, padding: 10, ...getTouchableOpacityStyle("unisex")}} 
            >
                <Image source={require('../../../assets/unisex.png')} style={styles.image} />
                <Text>Unisex</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setGender("male")} 
                style={{alignItems: "center", padding: 10, ...getTouchableOpacityStyle("male")}} 
            >
                <Image source={require('../../../assets/male.png')} style={styles.image} />
                <Text>Boys</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GenderSelector;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row", 
        marginVertical: 10*vh, 
        alignSelf: "center", 
        height: 65*vh, 
    },
    image: {
        height: 40*vh, 
        aspectRatio: 0.5, 
        resizeMode: 'stretch'
    }
})