import { Platform } from 'react-native';

const uploadImage = async(image: any) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:5000`;

    var formData: FormData = new FormData();
    formData.append("image", {uri: image.uri, name: image.filename, type: 'image/heic'});

    const imageResponse = await fetch(`${URL}/image/uploadOne`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: formData
    });
    const body = await imageResponse.json();

    if (imageResponse.status !== 200) {
        var error: any = new Error(body.message);
        error.statusCode = imageResponse.status;
        throw error;
    }

    return body;
}

export default uploadImage;