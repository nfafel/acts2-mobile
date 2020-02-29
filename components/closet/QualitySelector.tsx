import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';  
import {vw, vh} from '../../css/viewportUnits';

type QualitySelectorProps = {
    quality: number,
    setQuality: Function
}

const QualitySelector: React.FC<QualitySelectorProps> = ({quality, setQuality}) => {
    
    const getIconColor = (givenQuality: number): string => {
        if (givenQuality <= quality) {
           return "#f2d635"
        }
        return "#d4d4d4";
    }

    const getQualityLabel = (): string | undefined => {
        switch(quality) {
            case 0: 
                return "Select Condition";
            case 1: 
                return "Poor Condition";
            case 2:
                return "Fair Condition";
            case 3:
                return "Good Condition";
            case 4:
                return "Great Condition"
        }
    }

    return (
        <View style={{alignItems: "center", marginBottom: 30}}>
            <View style={{flexDirection: "row", marginBottom: 10}}>
                {[1,2,3,4].map(index => 
                    <TouchableOpacity
                        key={index}
                        onPress={() => setQuality(index)}
                        style={{alignItems: "center", marginHorizontal: 5}} 
                    >
                        <FontAwesome5Icon
                            name="star"
                            color={getIconColor(index)}
                            size={30*vh}
                            solid={true}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={{fontSize: 12*vh}} >{getQualityLabel()}</Text>
        </View>
    )
}

export default QualitySelector;