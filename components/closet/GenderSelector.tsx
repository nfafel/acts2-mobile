import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

type GenderSelectorProps = {
    gender: string,
    setGender: Function
}

const GenderSelector: React.FC<GenderSelectorProps> = ({gender, setGender}) => {
    
    // const getHighlighted = (givenGender: string): string => {
    //     if (gender == givenGender) {
    //         return "#6db1ed";
    //     }
    //     return "white";
    // }

    return (
        <View style={{flexDirection: "row", marginVertical: 30, alignSelf: "center"}}>
            <TouchableOpacity onPress={() => setGender("female")} >
                <Image source={require('../../assets/female.png')} />
                <Text>Girls</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender("unisex")} style={{marginHorizontal: 30}}>
                <Image source={require('../../assets/unisex.png')} />
                <Text>Unisex</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender("male")} >
                <Image source={require('../../assets/male.png')} />
                <Text>Boys</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GenderSelector;