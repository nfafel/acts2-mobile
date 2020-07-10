import React, { Component } from 'react';
import { View, Modal, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { IClothingType } from '../../interfaces/IClothingType';
import { Appbar, Title } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import {vh, vw} from '../../css/viewportUnits';
import { ClothingType } from '../../enums';

type ClothingTypeSelectorProps = {
    submitType: Function,
    clothingType: IClothingType
}

type ClothingTypeSelectorState = {
    modalVisible: boolean
}

class ClothingTypeSelector extends Component<ClothingTypeSelectorProps, ClothingTypeSelectorState> {
    constructor(props: ClothingTypeSelectorProps) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    typesSources: IClothingType[][] = [
        [
            {image: require("../../assets/tshirt.png"), name: ClothingType.TSHIRT},
            {image: require("../../assets/buttondown.png"), name: ClothingType.BUTTON_DOWN}, 
            {image: require("../../assets/croptop.png"), name: ClothingType.CROP_TOP},
            {image: require("../../assets/sweatpants.png"), name: ClothingType.SWEAT_PANTS},
            {image: require("../../assets/dress.png"), name: ClothingType.DRESS}, 
            {image: require("../../assets/party.png"), name: ClothingType.PARTY_CLOTHES},  //Maybe don't support
        ],  
        [
            {image: require("../../assets/longsleeve.png"), name: ClothingType.LONG_SLEEVE},
            {image: require("../../assets/sweater.png"), name: ClothingType.SWEATER},
            {image: require("../../assets/shorts.png"), name: ClothingType.SHORTS},
            {image: require("../../assets/leggings.png"), name: ClothingType.LEGGINGS},
            {image: require("../../assets/menformal.png"), name: ClothingType.MEN_FORMAL_WEAR},
            {image: require("../../assets/jewelry.png"), name: ClothingType.JEWELRY},
        ],
        [
            {image: require("../../assets/sweatshirt.png"), name: ClothingType.SWEATSHIRT},
            {image: require("../../assets/tanktop.png"), name: ClothingType.TANK_TOP},
            {image: require("../../assets/jeans.png"), name: ClothingType.PANTS},
            {image: require("../../assets/skirt.png"), name: ClothingType.SKIRT},
            {image: require("../../assets/shoes.png"), name: ClothingType.SHOES},
        ]
    ]

    handleSubmit = (type: IClothingType) => {
        this.props.submitType(type); //submit name of asset
        this.setState({modalVisible: false})
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({modalVisible: true})} style={{alignSelf: "center", marginTop: 10*vh}}>
                    <Image source={this.props.clothingType.image} style={{height: 70*vh, width: 85*vh, resizeMode: "stretch"}} />
                    {this.props.clothingType.name !== "Select" && <Text style={{alignSelf: "center"}}>{this.props.clothingType.name}</Text>}
                </TouchableOpacity>
                <Modal visible={this.state.modalVisible} animationType="slide">
                    <Appbar.Header >
                        <Appbar.BackAction onPress={() => this.setState({modalVisible: false})} />
                        <Appbar.Content title='Select Clothing Type' />
                    </Appbar.Header >

                    <SafeAreaView style={{flexDirection: "row", flex: 1, marginTop: 10*vh}}>
                        {this.typesSources.map((column, i) => 
                            <View style={{flex: 1}} key={i}>
                                {column.map((type: IClothingType, j: number) => 
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => this.handleSubmit(type)} key={j} >
                                        <Image source={type.image} style={{width: "80%", height: "80%", resizeMode: 'stretch'}} />
                                        <Text>{type.name}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </SafeAreaView>
                </Modal>
            </View>
        )
    }
}

export default ClothingTypeSelector;