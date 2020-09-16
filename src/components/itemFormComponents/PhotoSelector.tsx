import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { vh } from '../../css/viewportUnits';
import { FieldArray } from 'formik';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';

type PhotoSelectorProps = {
    images: ImagePickerResponse[],
    setFieldValue: Function
}

const PhotoSelector: React.FC<PhotoSelectorProps> = (props) => {
    const chooseFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaTypes: 'Images',
        };
        ImagePicker.showImagePicker(options, response => {        
            if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.data) {
                props.images.push(response);
                props.setFieldValue('images', props.images);
            }
        });
    };

    return (
        <View style={{margin: 20}}>
            <Text style={{fontSize: 16*vh, fontFamily: "marker felt"}}>Photos:</Text>
            <View style={{flexDirection: "row", marginTop: 8, alignItems: "center"}}>
                <FieldArray
                    name="images"
                    render={arrayHelpers => (
                        <View style={{maxWidth: "70%"}}>
                            <ScrollView horizontal>
                                {props.images.map((image: ImagePickerResponse, index: any) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            arrayHelpers.remove(index)
                                        }}
                                        key={index} 
                                        style={{marginRight: 10}}
                                    >
                                        <Image source={{uri: `data:image/png;base64,${image.data}`}} style={{width: 75*vh, height: 75*vh}} /> 
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                />
                <TouchableOpacity
                    onPress={chooseFile}
                    style={{borderWidth: 1, borderRadius: 15, marginLeft: 10 }}
                >
                    <MaterialCommunityIcon name="camera" size={60*vh} color="#96beeb" style={{height: 59*vh}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PhotoSelector;
