import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, Image, Modal, Alert } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import PublicitySelector from './PublicitySelector';
import GenderSelector from './GenderSelector';
import { Formik, FieldArray } from 'formik';
import QualitySelector from './QualitySelector';
import {IImage} from '../../interfaces/IImage';
import {vw, vh} from '../../css/viewportUnits';
import CameraModal from './CameraModal';
import itemValidationSchema from '../../validationSchemas/itemValidationSchema';
import uploadImage from '../../api/uploadImage';
import getImage from '../../api/getImage';

type AddNewItemProps = {
    navigation: any,
    route: any
}

const AddNewItem: React.FC<AddNewItemProps> = ({ navigation, route }) => {
    const [cameraOpen, setCameraOpen] = useState<boolean>(false);

    const handleSubmit = (values: any) => {
        navigation.navigate("MainTabNav");
        console.log(values);
    }

    // upload() {
    //     uploadImage(this.state.closetItems[0].node.image);
    // }

    // async get() {
    //     const result = await getImage("1582490074004");
    //     this.setState({image: result.image});
    // }

    return (
        <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
            <Text style={styles.title}>Add to Closet</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Closet")} style={{position: "absolute", right: 15, top: 15}}>
                <Text style={{color: "#f5737f", fontSize: 24, fontFamily: "marker felt"}}>Cancel</Text>
            </TouchableOpacity>

            <Formik
                initialValues = {{ images: [], publicity: "give", gender: "female", brand: "", size: "", value: "", quality: 0}}
                validationSchema={itemValidationSchema}
                onSubmit = {(values) => handleSubmit(values)}
            >
                {({values, handleSubmit, handleChange, setFieldValue}) => 
                    <ScrollView >
                        <PublicitySelector publicity={values.publicity} setPublicity={handleChange("publicity")} />
                        <GenderSelector gender={values.gender} setGender={handleChange("gender")} />
                        <QualitySelector quality={values.quality} setQuality={(quality: number) => setFieldValue("quality", quality, true)}/>

                        <KeyboardAvoidingView style={styles.inputBox}>
                            <View style={styles.inputLabel}>
                                <Text style={{ fontSize: 16 }}>Size:</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                <MaterialCommunityIcon name="plus-circle-outline" size={20} color="grey"/>
                                <TextInput
                                    style={styles.inputText}
                                    onChangeText={handleChange('size')}
                                    value={values.size}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <KeyboardAvoidingView style={{marginVertical: 20*vh, ...styles.inputBox}}>
                            <View style={styles.inputLabel}>
                                <Text style={{ fontSize: 16 }}>Brand:</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                <MaterialCommunityIcon name="plus-circle-outline" size={20} color="grey"/>
                                <TextInput
                                    style={styles.inputText}
                                    onChangeText={handleChange('brand')}
                                    value={values.brand}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        <KeyboardAvoidingView style={styles.inputBox}>
                            <View style={styles.inputLabel}>
                                <Text style={{ fontSize: 16 }}>Approximate Value:</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", marginLeft: 7}}>
                                <MaterialCommunityIcon name="plus-circle-outline" size={20} color="grey"/>
                                <TextInput
                                    style={styles.inputText}
                                    onChangeText={handleChange('value')}
                                    value={values.value}
                                />
                            </View>
                        </KeyboardAvoidingView> 

                        <View style={{margin: 20}}>
                            <Text style={{fontSize: 18, fontFamily: "marker felt"}}>Photos:</Text>
                            <View style={{flexDirection: "row", marginTop: 8, alignItems: "center"}}>
                                <FieldArray
                                    name="images"
                                    render={arrayHelpers => (
                                        <View style={{width: "70%"}}>
                                            <ScrollView horizontal>
                                                {values.images.map((image: IImage, index) => (
                                                    <TouchableOpacity 
                                                        onPress={() => {
                                                            arrayHelpers.remove(index)
                                                        }}
                                                        key={index} 
                                                        style={{marginRight: 10}}
                                                    >
                                                        <Image source={{uri: image.uri}} style={{width: 100, height: 100}} />
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    )}
                                />
                                <TouchableOpacity
                                    onPress={() => setCameraOpen(true)}
                                    style={{borderWidth: 1, height: 60*vh, width: 90*vw, borderRadius: 15, padding: 5, marginLeft: 10}}
                                >
                                    <MaterialCommunityIcon name="camera" size={80} color="#96beeb" />
                                    <CameraModal 
                                        open={cameraOpen} 
                                        closeCamera={() => setCameraOpen(false)}
                                        submitPicture={(newImage: IImage) => {
                                            setFieldValue("images", [...values.images, newImage], true)
                                        }} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

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
        </SafeAreaView>
    )
}

export default AddNewItem;

const styles = StyleSheet.create({
    title: {
        flexDirection: "row", 
        alignSelf: "center", 
        marginVertical: 10*vh, 
        fontSize: 20*vh, 
        fontFamily: "Trebuchet MS"
    },
    inputBox: {
        borderWidth: 3, 
        borderColor: "#78b8bf", 
        marginHorizontal: 40*vw, 
        borderRadius: 10, 
        height: 30*vh
    },
    inputLabel: {
        alignSelf: "flex-start", 
        marginTop: -12*vh, 
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