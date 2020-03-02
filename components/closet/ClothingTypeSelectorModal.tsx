import React, { useState } from 'react';
import { View, Modal, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { IClothingType } from '../../interfaces/IClothingType';
import { Header, Left, Right, Title } from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import {vh, vw} from '../../css/viewportUnits';
type ClothingTypeSelectorModalProps = {
    open: boolean,
    close: Function,
    submitType: Function
}

const ClothingTypeSelectorModal: React.FC<ClothingTypeSelectorModalProps> = (props: ClothingTypeSelectorModalProps) => {
    const typesSources: IClothingType[][] = [
        [
            {image: require("../../assets/buttondown.png"), name: "Button Downs"}, 
            {image: require("../../assets/croptop.png"), name: "Crop Tops"}, 
            {image: require("../../assets/dress.png"), name: "Dresses"}, 
            {image: require("../../assets/jeans.png"), name: "Pants"},  
            {image: require("../../assets/jewelry.png"), name: "Jewelry"},  
            {image: require("../../assets/leggings.png"), name: "Leggings"}
        ],  
        [
            {image: require("../../assets/longsleeve.png"), name: "Long Sleeves"},  
            {image: require("../../assets/menformal.png"), name: "Men Formal Wear"},  
            {image: require("../../assets/party.png"), name: "Party Clothes"},  //Maybe don't support
            {image: require("../../assets/shoes.png"), name: "Shoes"},  
            {image: require("../../assets/shorts.png"), name: "Shorts"},  
            {image: require("../../assets/skirt.png"), name: "Skirts"}, 
        ],
        [ 
            {image: require("../../assets/sweater.png"), name: "Sweaters"},  
            {image: require("../../assets/sweatpants.png"), name: "Sweat Pants"},  
            {image: require("../../assets/sweatshirt.png"), name: "Sweatshirts"}, 
            {image: require("../../assets/tanktop.png"), name: "Tank Tops"},  
            {image: require("../../assets/tshirt.png"), name: "TShirts"}
        ]
    ]
    const handleSubmit = (type: IClothingType) => {
        props.submitType(type); //submit name of asset
        props.close(); 
    };

    return (
            <Modal visible={props.open} animationType="slide">
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => props.close()}>
                            <MaterialCommunityIcon name="arrow-left" size={28*vh} color="blue" />
                        </TouchableOpacity>
                    </Left>
                    <Title style={{alignSelf: "center"}}>Select Clothing Type</Title>
                    <Right/>
                </Header>
                <SafeAreaView style={{flexDirection: "row", flex: 1, marginTop: 10*vh}}>
                    {typesSources.map((column, i) => 
                        <View style={{flex: 1}} key={i}>
                            {column.map((type: IClothingType, j: number) => 
                                <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => handleSubmit(type)} key={j} >
                                    <Image source={type.image} style={{width: "80%", height: "80%", resizeMode: 'stretch'}} />
                                    <Text>{type.name}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </SafeAreaView>
            </Modal>
    )
}

export default ClothingTypeSelectorModal;