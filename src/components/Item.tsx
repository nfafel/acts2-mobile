import React from 'react';
import {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import EditItemModal from './closet/editItem/EditItemModal';
import {vh, vw} from '../css/viewportUnits';
import { IClosetItemWImages } from '../interfaces/IClosetItemWImages';

type ItemProps = {
    closetItemWImages: IClosetItemWImages,
}

type ItemState = {
    modalVisible: boolean
}

class Item extends Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props);
        this.state = {
            modalVisible: false
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
                <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{uri: `data:image/png;base64,${this.props.closetItemWImages.images[0].base64}`}} style={{width: "100%", aspectRatio: 1, resizeMode: "stretch" }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>{this.props.closetItemWImages.closetItem.value}</Text>
                            </Left>
                            <Body style={{alignItems: "center"}}>
                                <Text>{this.props.closetItemWImages.closetItem.publicity}</Text>
                            </Body>
                            <Right/>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
                <EditItemModal modalVisible={this.state.modalVisible} closeModal={() => this.setState({modalVisible: false})} closetItemWImages={this.props.closetItemWImages} />
            </View>
        )
    }
}

export default Item;