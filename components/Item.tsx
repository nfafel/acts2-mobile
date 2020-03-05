import React from 'react';
import {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';

import {vh, vw} from '../css/viewportUnits';
import { IClosetItemWImages } from '../interfaces/IClosetItemWImages';

type ItemProps = {
    closetItemWImages: IClosetItemWImages,
}

type ItemState = {
    
}

class Item extends Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props);
        this.state = {
            
        }
    }

    getPublicityColor(publicity: string) {
        if (publicity == "market") {
            return "#a9e695";
        } else if (publicity == "free") {
            return "#fc8077";
        } else {
            return "#a7d5fa";
        }
    }

    render() {
        return (
            <View style={{marginHorizontal: 5*vw, flex: 1}}>
                <Card>
                    <CardItem cardBody>
                        <Image source={{uri: `data:image/png;base64,${this.props.closetItemWImages.images[0]}`}} style={{width: "100%", aspectRatio: 3/4, resizeMode: "stretch" }} />
                    </CardItem>
                    <CardItem>
                        <Left/>
                        <Body style={{alignItems: "center"}}>
                            <Text>{this.props.closetItemWImages.closetItem.publicity}</Text>
                        </Body>
                        <Right/>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

export default Item;