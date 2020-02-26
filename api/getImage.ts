import { Platform } from 'react-native';

const getImage = async(imageKey: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:5000`;

    const imageResponse = await fetch(`${URL}/image/getOne`);
    const body = await imageResponse.json();

    if (imageResponse.status !== 200) {
        var error: any = new Error(body.message);
        error.statusCode = imageResponse.status;
        throw error;
    }
    
    return body;
}

export default getImage;