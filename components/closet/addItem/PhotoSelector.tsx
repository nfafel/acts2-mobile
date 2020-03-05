import React, {Component, useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { IImage } from '../../../interfaces/IImage';
import {vw, vh} from '../../../css/viewportUnits';
import { FieldArray } from 'formik';
import CameraModal from './CameraModal';

type PhotoSelectorProps = {
    values: any,
    setFieldValue: Function
}

const PhotoSelector: React.FC<PhotoSelectorProps> = (props) => {
    const [cameraOpen, setCameraOpen] = useState<boolean>(false);

    return (
        <View style={{margin: 20}}>
            <Text style={{fontSize: 18, fontFamily: "marker felt"}}>Photos:</Text>
            <View style={{flexDirection: "row", marginTop: 8, alignItems: "center"}}>
                <FieldArray
                    name="images"
                    render={arrayHelpers => (
                        <View style={{maxWidth: "70%"}}>
                            <ScrollView horizontal>
                                {props.values.images.map((image: IImage, index: any) => (
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
                            props.setFieldValue("images", [...props.values.images, newImage], true)
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PhotoSelector;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row", 
        marginHorizontal: 30*vw, 
        marginTop: 10*vh,
        height: 30*vh
    }
});