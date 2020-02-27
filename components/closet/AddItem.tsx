import React, {Component} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, Image, Modal, Alert } from 'react-native';
import uploadImage from '../../api/uploadImage';
import getImage from '../../api/getImage';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import PublicitySelector from './PublicitySelector';
import GenderSelector from './GenderSelector';
import { Formik } from 'formik';
import itemValidationSchema from '../../validationSchemas/itemValidationSchema';

type AddNewItemProps = {
    close: Function,
    navigation: any
}

type AddNewItemState = {
    cameraOpen: boolean,
    publicity: string,
    image: Buffer | null
}

class AddNewItem extends Component<AddNewItemProps, AddNewItemState> {
    constructor(props: AddNewItemProps) {
        super(props);
        this.state = {
            cameraOpen: false,
            publicity: "give", //sell, make, give - these should be enums eventually
            image: null
        }
    }

    handleSubmit(values: any) {
        this.props.navigation.navigate("MainTabNav");
        Alert.alert(values.publicity);
    }

    // upload() {
    //     uploadImage(this.state.closetItems[0].node.image);
    // }

    // async get() {
    //     const result = await getImage("1582490074004");
    //     this.setState({image: result.image});
    // }

    render() {
        return (
                <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
                    <Text style={{flexDirection: "row", alignSelf: "center", marginTop: 20, fontSize: 30, fontFamily: "Trebuchet MS"}}>Add to Closet</Text>
                                
                    <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{position: "absolute", right: 15, top: 15}}>
                        <Text style={{color: "#f5737f", fontSize: 24, fontFamily: "marker felt"}}>Cancel</Text>
                    </TouchableOpacity>

                    <Formik
                        initialValues = {{ images: [], publicity: "give", gender: "female", brand: "", size: "", value: "", qualityRating: null}}
                        // validationSchema={itemValidationSchema}
                        onSubmit = {(values) => this.handleSubmit(values)}
                    >
                        {({values, handleSubmit, handleChange}) => 
                            <View>
                                <PublicitySelector publicity={values.publicity} setPublicity={handleChange("publicity")} />
                                <GenderSelector gender={values.gender} setGender={handleChange("gender")} />

                                <View style={{borderWidth: 3, borderColor: "#78b8bf", marginHorizontal: 40, borderRadius: 10}}>
                                    <View style={{alignSelf: "flex-start", marginTop: -18, marginLeft: 20, zIndex: 1, backgroundColor: "white", paddingHorizontal: 10}}>
                                        <Text style={{ fontSize: 16 }}>Size:</Text>
                                    </View>
                                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                        <MaterialCommunityIcon name="plus-circle-outline" size={20} color="grey"/>
                                        <TextInput
                                            style={{fontFamily: "marker felt", fontSize: 20, flex: 1, margin: 6}}
                                            onChangeText={handleChange('size')}
                                            value={values.size}
                                        />
                                    </View>
                                </View>

                                <View style={{borderWidth: 3, borderColor: "#78b8bf", marginHorizontal: 40, borderRadius: 10, marginVertical: 25}}>
                                    <View style={{alignSelf: "flex-start", marginTop: -18, marginLeft: 20, zIndex: 1, backgroundColor: "white", paddingHorizontal: 10}}>
                                        <Text style={{ fontSize: 16 }}>Brand:</Text>
                                    </View>
                                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                        <MaterialCommunityIcon name="plus-circle-outline" size={20} color="grey"/>
                                        <TextInput
                                            style={{fontFamily: "marker felt", fontSize: 20, flex: 1, margin: 6}}
                                            onChangeText={handleChange('brand')}
                                            value={values.brand}
                                        />
                                    </View>
                                </View>

                                <View style={{borderWidth: 3, borderColor: "#78b8bf", marginHorizontal: 40, borderRadius: 10}}>
                                    <View style={{alignSelf: "flex-start", marginTop: -18, marginLeft: 20, zIndex: 1, backgroundColor: "white", paddingHorizontal: 10}}>
                                        <Text style={{ fontSize: 16 }}>Approximate Value:</Text>
                                    </View>
                                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                        <MaterialCommunityIcon name="plus-circle-outline" size={20} color="grey"/>
                                        <TextInput
                                            style={{fontFamily: "marker felt", fontSize: 20, flex: 1, margin: 6}}
                                            onChangeText={handleChange('value')}
                                            value={values.value}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => this.props.navigation.push('Camera')} >
                                    <MaterialCommunityIcon name="camera" size={40} color="#96beeb"/>
                                </TouchableOpacity>
        
                                <TouchableOpacity onPress={handleSubmit} style={{margin: 20}} >
                                    <View style={{flexDirection: "row", justifyContent: "center", borderColor: "black", borderBottomWidth: 3, borderRightWidth: 3, borderTopWidth: 1, borderLeftWidth: 1, borderRadius: 2}}>
                                        <Text style={{fontSize: 25, padding: 5}}>
                                            Add to My Closet
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </Formik>
                </SafeAreaView>
        )
    }
}

export default AddNewItem;