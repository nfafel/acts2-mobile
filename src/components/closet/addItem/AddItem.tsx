import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, Image, Alert} from 'react-native';
import { Header, Left, Right, Title, Body } from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import PublicitySelector from '../../itemFormComponents/PublicitySelector';
import GenderSelector from '../../itemFormComponents/GenderSelector';
import PhotoSelector from '../../itemFormComponents/PhotoSelector';
import QualitySelector from '../../itemFormComponents/QualitySelector';
import ClothingTypeSelector from '../../itemFormComponents/ClothingTypeSelector';
import { Formik } from 'formik';
import {vw, vh} from '../../../css/viewportUnits';
import itemValidationSchema from '../../../validationSchemas/itemValidationSchema';
import { IClothingType } from '../../../interfaces/IClothingType';
import uploadClosetItem from '../../../api/uploadClosetItem';
import { IClosetItem } from '../../../interfaces/IClosetItem';
import { addClosetItem } from '../../../redux/actions';
import { connect } from 'react-redux';
import { IClosetItemWImages } from '../../../interfaces/IClosetItemWImages';
import { INewClosetItem } from '../../../interfaces/INewClosetItem';
const jwtDecode = require('jwt-decode');

type AddNewItemProps = {
    navigation: any,
    token: string,
    addItem: Function
}

const AddNewItem: React.FC<AddNewItemProps> = ({ navigation, token, addItem }) => {
    const handleSubmit = async(values: any) => {
        try {
            const decoded = jwtDecode(token);
            const newClosetItemData: INewClosetItem = {
                userId: decoded.payload.userId,
                username: decoded.payload.username,
                universityId: decoded.payload.universityId,
                images: values.images,
                publicity: values.publicity,
                gender: values.gender,
                quality: values.quality,
                brand: values.brand,
                size: values.size,
                value: values.value,
                clothingType: values.clothingType.name
            };
            const newClosetItem: IClosetItem = await uploadClosetItem(newClosetItemData);
            const newClosetItemWImages: IClosetItemWImages = {
                closetItem: newClosetItem,
                images: values.images.map((image: any) => image.base64)
            }
            addItem(newClosetItemWImages);
            navigation.navigate("MainTabNav");
        } catch(err) {
            console.log(err);
            Alert.alert("An error occured in adding the item. Please check internet connections and retry")
        }
    }

    const initClothingType: IClothingType = {
        image: require('../../../assets/select.png'),
        name: "Select"
    }
    // upload() {
    //     uploadImage(this.state.closetItems[0].node.image);
    // }

    // async get() {
    //     const result = await getImage("1582490074004");
    //     this.setState({image: result.image});
    // }

    return (
        <View style={{backgroundColor: "white", flex: 1}}>
            <Header style={{backgroundColor: "white"}}>
                <Left style={{flex: 0.5}} />
                <Body>
                    <Title style={styles.title}>Add to Closet</Title>
                </Body>
                <Right style={{flex: 0.5}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Closet")}>
                        <Text style={{color: "#f5737f", fontSize: 16*vh, fontFamily: "marker felt"}}>Cancel</Text>
                    </TouchableOpacity>
                </Right>
            </Header>

            <SafeAreaView/>
                <Formik
                    initialValues = {{ images: [], publicity: "market", gender: "female", brand: "", size: "", value: "", quality: 0, clothingType: initClothingType}}
                    validationSchema={itemValidationSchema}
                    onSubmit = {(values) => handleSubmit(values)}
                >
                    {({values, handleSubmit, handleChange, setFieldValue}) => 
                        <ScrollView>
                            <PublicitySelector publicity={values.publicity} setPublicity={handleChange("publicity")} />
                            <ClothingTypeSelector clothingType={values.clothingType} submitType={(clothingType: IClothingType) => setFieldValue("clothingType", clothingType, true)} />
                            <GenderSelector gender={values.gender} setGender={handleChange("gender")} />
                            <QualitySelector quality={values.quality} setQuality={(quality: number) => setFieldValue("quality", quality, true)}/>

                            <KeyboardAvoidingView style={styles.inputBox}>
                                <View style={styles.inputLabel}>
                                    <Text style={{ fontSize: 16*vh }}>Size:</Text>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                    <MaterialCommunityIcon name="plus-circle-outline" size={20*vh} color="grey"/>
                                    <TextInput
                                        style={styles.inputText}
                                        onChangeText={handleChange('size')}
                                        value={values.size}
                                    />
                                </View>
                            </KeyboardAvoidingView>

                            <KeyboardAvoidingView style={{marginVertical: 20*vh, ...styles.inputBox}}>
                                <View style={styles.inputLabel}>
                                    <Text style={{ fontSize: 16*vh }}>Brand:</Text>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                    <MaterialCommunityIcon name="plus-circle-outline" size={20*vh} color="grey"/>
                                    <TextInput
                                        style={styles.inputText}
                                        onChangeText={handleChange('brand')}
                                        value={values.brand}
                                    />
                                </View>
                            </KeyboardAvoidingView>

                            <KeyboardAvoidingView style={styles.inputBox}>
                                <View style={styles.inputLabel}>
                                    <Text style={{ fontSize: 16*vh }}>Approximate Value:</Text>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                    <MaterialCommunityIcon name="plus-circle-outline" size={20*vh} color="grey"/>
                                    <TextInput
                                        style={styles.inputText}
                                        onChangeText={handleChange('value')}
                                        value={values.value}
                                    />
                                </View>
                            </KeyboardAvoidingView> 

                            <PhotoSelector setFieldValue={setFieldValue} images={values.images} />

                            <TouchableOpacity onPress={handleSubmit} style={{margin: 20}} >
                                <View style={{flexDirection: "row", justifyContent: "center", borderColor: "black", borderBottomWidth: 3, borderRightWidth: 3, borderTopWidth: 1, borderLeftWidth: 1, borderRadius: 2}}>
                                    <Text style={{fontSize: 25, padding: 5}}>
                                        Add to My Closet
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    }
                </Formik>
            <SafeAreaView/>
        </View>
    )
}

const mapDispatchToProps = function(dispatch: any) {
    return {
        addItem: (closetItem: IClosetItemWImages) => {
            dispatch( addClosetItem({
                newItem: closetItem, 
            }))
        },
    }
}

const mapStateToProps = function(state: any) {
    return {
        token: state.token,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddNewItem);

const styles = StyleSheet.create({
    title: {
        color: "black",
        alignSelf: "center",
        fontSize: 18*vh,
        fontFamily: "Trebuchet MS"
    },
    inputBox: {
        borderWidth: 3, 
        borderColor: "#78b8bf", 
        marginHorizontal: 40*vw, 
        borderRadius: 10, 
    },
    inputLabel: {
        alignSelf: "flex-start", 
        marginTop: -17*vh, 
        marginLeft: 20*vw, 
        zIndex: 1, 
        backgroundColor: "white", 
        paddingHorizontal: 10*vw
    },
    inputText: {
        fontFamily: "marker felt", 
        fontSize: 16*vh, 
        flex: 1, 
        marginHorizontal: 6*vw, 
        padding: 0
    }
});