import { Platform } from 'react-native';

const getClosetItemsByUser = async(username: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:5000`;

    const userClosetResponse = await fetch(`${URL}/closetItem/user/${username}`);
    const body = await userClosetResponse.json();

    if (userClosetResponse.status !== 200) {
        var error: any = new Error(body.message);
        error.statusCode = userClosetResponse.status;
        throw error;
    }
    
    return body.closetItems;
}

export default getClosetItemsByUser;
