import { Platform } from 'react-native';
import { INewItem } from '../interfaces';

export const uploadItem = async(newItemData: INewItem) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    var formData: FormData = new FormData();
    
    newItemData.images.forEach(image => {
        formData.append("images", {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'}); //Check image name and type
    });
    formData.append("username", newItemData.username);
    formData.append("universityId", newItemData.universityId);
    formData.append("gender", newItemData.gender);
    formData.append("quality", newItemData.quality);
    formData.append("brand", newItemData.brand);
    formData.append("size", newItemData.size);
    formData.append("value", newItemData.value);
    formData.append("clothingType", newItemData.clothingType);
    
    const newItemResponse = await fetch(`${URL}/item`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: formData
    });
    const newItem = await newItemResponse.json();

    if (newItemResponse.status !== 200) {
        var error: any = new Error(newItem.message);
        error.statusCode = newItemResponse.status;
        throw error;
    }

    return newItem;
}
