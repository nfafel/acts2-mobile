import React from 'react';
import {Component} from 'react';
import { ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, Image, Modal, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Appbar, Title } from 'react-native-paper';
import {vh, vw} from '../../../css/viewportUnits';
import itemValidationSchema from '../../../validationSchemas/itemValidationSchema';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import PublicitySelector from '../../itemFormComponents/PublicitySelector';
import GenderSelector from '../../itemFormComponents/GenderSelector';
import PhotoSelector from '../../itemFormComponents/PhotoSelector';
import QualitySelector from '../../itemFormComponents/QualitySelector';
import ClothingTypeSelector from '../../itemFormComponents/ClothingTypeSelector';
import { Formik } from 'formik';
import { IItem, IClothingType } from '../../../interfaces';

type ItemProps = {
    item: IItem,
    modalVisible: boolean,
    closeModal: Function
}

class Item extends Component<ItemProps> {

    handleSubmit = async(values: any) => {
        try {
            this.props.closeModal();
            // const decoded = jwtDecode(token);
            // const newItemData: INewItem = {
            //     username: decoded.payload.username,
            //     universityId: decoded.payload.universityId,
            //     images: values.images,
            //     publicity: values.publicity,
            //     gender: values.gender,
            //     quality: values.quality,
            //     brand: values.brand,
            //     size: values.size,
            //     value: values.value,
            //     clothingType: values.clothingType.name
            // };
            // const newItem: IItem = await uploadItem(newItemData);
            
            // navigation.navigate("MainTabNav");
        } catch(err) {
            console.log(err);
            Alert.alert("An error occured in adding the item. Please check internet connections and retry")
        }
    }

    initClothingType = {
        image: require('../../../assets/select.png'),
        name: this.props.item.clothingType
    }

    initialValues = {
        images: this.props.item.images, 
        gender: this.props.item.gender, 
        brand: this.props.item.brand, 
        size: this.props.item.size, 
        value: this.props.item.value, 
        quality: this.props.item.quality, 
        clothingType: this.initClothingType
    }

    render() {
        return (
            <Modal 
                visible={this.props.modalVisible}
                animationType="slide"
            >
                <Appbar.Header >
                    <Title style={styles.title}>Edit Item</Title>

                    <TouchableOpacity onPress={() => this.props.closeModal()}>
                        <Text style={{color: "#f5737f", fontSize: 16*vh, fontFamily: "marker felt"}}>Cancel</Text>
                    </TouchableOpacity>
                </Appbar.Header >

                <SafeAreaView style={{flex: 1}}>
                    <Formik
                        initialValues = {this.initialValues}
                        validationSchema={itemValidationSchema}
                        onSubmit = {(values) => this.handleSubmit(values)}
                    >
                    {({values, handleSubmit, handleChange, setFieldValue}) => 
                        <ScrollView>
                            {/* <PublicitySelector publicity={values.publicity} setPublicity={handleChange("publicity")} /> */}
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

                            <View style={{flexDirection:"row", justifyContent: "center"}}>
                                <TouchableOpacity onPress={() => Alert.alert("delete")} style={{ marginHorizontal: 20}} >
                                    <View style={{flexDirection: "row", justifyContent: "center", borderColor: "black", borderBottomWidth: 3, borderRightWidth: 3, borderTopWidth: 1, borderLeftWidth: 1, borderRadius: 2}}>
                                        <Text style={{fontSize: 25, padding: 5, color: "red"}}>
                                            Delete
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSubmit} style={{}} >
                                    <View style={{flexDirection: "row", justifyContent: "center", borderColor: "black", borderBottomWidth: 3, borderRightWidth: 3, borderTopWidth: 1, borderLeftWidth: 1, borderRadius: 2}}>
                                        <Text style={{fontSize: 25, padding: 5}}>
                                            Update
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    }
                    </Formik>
                </SafeAreaView>
            </Modal>
        )
    }
}

export default Item;

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