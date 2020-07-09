import React from 'react';
import {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import EditItemModal from './closet/editItem/EditItemModal';
import {vh, vw} from '../css/viewportUnits';
import { IClosetItem } from '../interfaces';

interface IItemProps {
    closetItem: IClosetItem,
}

interface IItemState {
    modalVisible: boolean
}

class Item extends Component<IItemProps, IItemState> {
    constructor(props: IItemProps) {
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
                        <Card.Cover source={{uri: this.props.closetItem.images[0].url}} />
                        <Card.Content>
                            <Title>
                                <Text>{this.props.closetItem.value}</Text>
                            </Title>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <EditItemModal modalVisible={this.state.modalVisible} closeModal={() => this.setState({modalVisible: false})} closetItem={this.props.closetItem} />
            </View>
        )
    }
}

export default Item;