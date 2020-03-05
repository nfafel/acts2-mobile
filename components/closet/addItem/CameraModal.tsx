import React, { useState } from 'react';
import { View, Modal, Text, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {IImage} from '../../../interfaces/IImage';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  

type CameraModalProps = {
    open: boolean,
    closeCamera: Function,
    submitPicture: Function
}

const CameraModal: React.FC<CameraModalProps> = (props: CameraModalProps) => {
    const [image, setImage] = useState<IImage | null>(null);
    let camera: any;

    const takePicture = async() => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const image = await camera.takePictureAsync(options);
            setImage(image);
        }
    };

    const submitImage = () => {
        props.submitPicture(image);
        props.closeCamera();
        setImage(null);
    }

    var mainContent: JSX.Element;

    if (image === null) {
        mainContent = (
            <View style={{flex: 1}}>
                <RNCamera
                    ref={ref => {camera = ref;}}
                    style={{flex: 1, flexDirection: "column"}} 
                    type={RNCamera.Constants.Type.back} 
                    flashMode={RNCamera.Constants.FlashMode.off}
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
            </View>
        )
    } else {
        mainContent = (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Image 
                        source={image} 
                        style={(Platform.OS === "ios") ? 
                            {height: "50%", aspectRatio: 1, resizeMode: "stretch"}
                        : 
                            {height: "90%", aspectRatio: 0.75, resizeMode: "stretch"}
                        }
                    />
                </View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity onPress={() => setImage(null)}>
                        <Text>Retake Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => submitImage()}>
                        <Text>Add Photo</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <Modal visible={props.open} animationType="slide">
            {mainContent}
        </Modal>
    )
}

export default CameraModal;