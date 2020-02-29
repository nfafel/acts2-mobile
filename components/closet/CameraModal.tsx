import React, { useState } from 'react';
import { View, Modal, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  

type CameraProps = {
    open: boolean,
    closeCamera: Function,
    submitPicture: Function
}

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
    let camera: any;

    const takePicture = async() => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const image = await camera.takePictureAsync(options);
            props.submitPicture(image);
            props.closeCamera();
        }
    };

    return (
        <View style={{flex: 1}}>
            <Modal visible={props.open} animationType="slide">
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
                    <TouchableOpacity onPress={() => props.closeCamera()} style={{marginBottom: 20}}>
                        <Text style={{color: "red", fontSize: 30, fontFamily: "marker felt"}}>Cancel</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default Camera;