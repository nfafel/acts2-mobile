import React, { useState } from 'react';
import { View, Alert, Text, SafeAreaView,  TextInput, Modal, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  

type CameraProps = {
    close: Function,
    navigation: any
}

const Camera: React.FC<CameraProps> = (props: CameraProps) => {

    let camera: any;

    const takePicture = async() => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            Alert.alert(data.uri);
        }
    };

    return (
        <View style={{flex: 1}}>
            <RNCamera
                ref={ref => {camera = ref;}}
                style={{flex: 1, flexDirection: "column"}} 
                type={RNCamera.Constants.Type.back} 
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                captureAudio={false}
            />
            <SafeAreaView style={{position: "absolute", bottom: 0, right: 0, left: 0 }}>
                <TouchableOpacity onPress={() => takePicture()} style={{flexDirection: "row", justifyContent: "center"}}>
                    <MaterialCommunityIcon name="circle-slice-8" size={80} color="#96beeb"/>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={{position: "absolute", bottom: 0, left: 40}}>
                <TouchableOpacity onPress={() => props.navigation.pop()} style={{marginBottom: 20}}>
                    <Text style={{color: "red", fontSize: 30, fontFamily: "marker felt"}}>Cancel</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default Camera;