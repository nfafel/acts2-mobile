import React, {Component} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import Camera from './Camera';
import uploadImage from '../../api/uploadImage';
import getImage from '../../api/getImage';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { RadioButton } from 'react-native-paper';

type AddNewItemProps = {
    close: Function,
    navigation: any
}

type AddNewItemState = {
    cameraOpen: boolean,
    publicityStatus: string,
    image: Buffer | null
}

class AddNewItem extends Component<AddNewItemProps, AddNewItemState> {
    constructor(props: AddNewItemProps) {
        super(props);
        this.state = {
            cameraOpen: false,
            publicityStatus: "give", //sell, make, give - these should be enums eventually
            image: null
        }
    }

    handleSubmit() {
        this.props.close();
        Alert.alert("item added");
    }

    // upload() {
    //     uploadImage(this.state.closetItems[0].node.image);
    // }

    // async get() {
    //     const result = await getImage("1582490074004");
    //     this.setState({image: result.image});
    // }

    getButtonColor(name: string): string {
        if (this.state.publicityStatus == name) {
            return "#6db1ed";
        }
        return "white";
    }

    render() {
        return (
                <SafeAreaView>
                    <View>
                        <Text style={{flexDirection: "row", alignSelf: "center", marginTop: 20, fontSize: 30, fontFamily: "Trebuchet MS"}}>Add to Closet</Text>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{position: "absolute", right: 15, top: 15}}>
                            <Text style={{color: "#f5737f", fontSize: 24, fontFamily: "marker felt"}}>Cancel</Text>
                        </TouchableOpacity>

                        <View style={{flexDirection: "row", margin: 30}}>
                            <TouchableOpacity
                                style={{borderColor: "black", borderWidth: 2, borderBottomWidth: 5, flex: 1, flexDirection: "row", justifyContent: "center", backgroundColor: this.getButtonColor("give"), height: 70}}
                                onPress={() => { this.setState({ publicityStatus: 'give' }); }}
                            >
                                <Text style={{fontSize: 24, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Give It</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{borderColor: "black", borderWidth: 2, borderLeftWidth: 0, borderBottomWidth: 5, flex: 1, flexDirection: "row", justifyContent: "center", backgroundColor: this.getButtonColor("sell"), height: 70}}
                                onPress={() => { this.setState({ publicityStatus: 'sell'  }); }}
                            >
                                <Text style={{fontSize: 24, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Sell It</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{borderColor: "black", borderWidth: 2, borderLeftWidth: 0, borderBottomWidth: 5, borderRightWidth: 5, flex: 1, flexDirection: "row", justifyContent: "center", backgroundColor: this.getButtonColor("keep"), height: 70}}
                                onPress={() => { this.setState({ publicityStatus: 'keep'  }); }}
                            >
                                <Text style={{fontSize: 24, alignSelf: "center", fontFamily: "Trebuchet MS"}}>Keep It</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => this.props.navigation.push('Camera')} >
                            <MaterialCommunityIcon name="camera" size={40} color="#96beeb"/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleSubmit()} style={{margin: 20}} >
                            <View style={{flexDirection: "row", justifyContent: "center", borderColor: "black", borderBottomWidth: 3, borderRightWidth: 3, borderTopWidth: 1, borderLeftWidth: 1, borderRadius: 2}}>
                                <Text style={{fontSize: 25, padding: 5}}>
                                    Add to My Closet
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
        )
    }
}

export default AddNewItem;