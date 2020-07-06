import { Platform } from 'react-native';
import { INewClosetItem } from '../interfaces/INewClosetItem';

const uploadClosetItem = async(closetItemWImages: INewClosetItem) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:5000`;

    var formData: FormData = new FormData();
    
    closetItemWImages.images.forEach(image => {
        formData.append("images", {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'}); //Check image name and type
    });
    formData.append("username", closetItemWImages.username);
    formData.append("universityId", closetItemWImages.universityId);
    formData.append("gender", closetItemWImages.gender);
    formData.append("quality", closetItemWImages.quality);
    formData.append("brand", closetItemWImages.brand);
    formData.append("size", closetItemWImages.size);
    formData.append("value", closetItemWImages.value);
    formData.append("publicity", closetItemWImages.publicity);
    formData.append("clothingType", closetItemWImages.clothingType);
    
    const closetItemResponse = await fetch(`${URL}/closetItem/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: formData
    });
    const body = await closetItemResponse.json();

    if (closetItemResponse.status !== 200) {
        var error: any = new Error(body.message);
        error.statusCode = closetItemResponse.status;
        throw error;
    }

    return body.newItem;
}

export default uploadClosetItem;
