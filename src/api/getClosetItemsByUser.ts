import { Platform } from 'react-native';

const getClosetItemsByUser = async(userId: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    const userClosetResponse = await fetch(`${URL}/closet-item/${userId}/user`);
    const closetItems = await userClosetResponse.json();

    if (userClosetResponse.status !== 200) {
        var error: any = new Error(closetItems.message);
        error.statusCode = userClosetResponse.status;
        throw error;
    }

    return closetItems;
}

export default getClosetItemsByUser;
