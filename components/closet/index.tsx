import React from 'react';
import {Component} from 'react';
import { View, Alert, Text, PermissionsAndroid,  TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import ClosetHeader from './ClosetHeader';
import { CameraKitCamera } from 'react-native-camera-kit';

type ClosetProps = {
    
}

type ClosetState = {
    
}

class Closet extends Component<ClosetProps, ClosetState> {
    constructor(props: ClosetProps) {
        super(props);
        this.state = {
            
        }
    }

    onBottomButtonPressed(event: any) {
        const captureImages = JSON.stringify(event.captureImages);
        if (event.type === 'left') {
          this.setState({ isPermitted: false });
        } else {
          Alert.alert(
            event.type,
            captureImages,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
    }


    render() {
        return (
            <View>
                <ClosetHeader />
                {/* <TouchableOpacity onPress={() => this.pickImage()} >
                    <Text>Pick Image</Text>
                </TouchableOpacity> */}
                <CameraKitCamera
                    // Buttons to perform action done and cancel
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={(event: any) => this.onBottomButtonPressed(event)}
                    // flashImages={{
                    //     // Flash button images
                    //     on: <Text>on</Text>,
                    //     off: <Text>off</Text>,
                    //     auto: <Text>auto</Text>,
                    // }}
                    // cameraFlipImage={<Text>Flip</Text>}
                    // captureButtonImage={<Text>Capture</Text>}
                />
            </View>
        )
    }
}

export default Closet;