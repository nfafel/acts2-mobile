import React, {Component, useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { IImage } from '../../interfaces/IImage';
import {vw, vh} from '../../css/viewportUnits';
import { FieldArray } from 'formik';
import CameraModal from './CameraModal';

type PhotoSelectorProps = {
    images: any,
    setFieldValue: Function
}

const PhotoSelector: React.FC<PhotoSelectorProps> = (props) => {
    const [cameraOpen, setCameraOpen] = useState<boolean>(false);

    return (
        <View style={{margin: 20}}>
            <Text style={{fontSize: 16*vh, fontFamily: "marker felt"}}>Photos:</Text>
            <View style={{flexDirection: "row", marginTop: 8, alignItems: "center"}}>
                <FieldArray
                    name="images"
                    render={arrayHelpers => (
                        <View style={{maxWidth: "70%"}}>
                            <ScrollView horizontal>
                                {props.images.map((image: IImage, index: any) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            arrayHelpers.remove(index)
                                        }}
                                        key={index} 
                                        style={{marginRight: 10}}
                                    >
                                        <Image source={{uri: `data:image/png;base64,${image.base64}`}} style={{width: 75*vh, height: 75*vh}} /> 
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                />
                <TouchableOpacity
                    onPress={() => setCameraOpen(true)}
                    style={{borderWidth: 1, borderRadius: 15, marginLeft: 10 }}
                >
                    <MaterialCommunityIcon name="camera" size={60*vh} color="#96beeb" style={{height: 59*vh}} />
                    <CameraModal
                        open={cameraOpen}
                        closeCamera={() => setCameraOpen(false)}
                        submitPicture={(newImage: IImage) => {
                            props.setFieldValue("images", [...props.images, newImage], true)
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PhotoSelector;
