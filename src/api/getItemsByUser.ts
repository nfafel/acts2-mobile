import { Platform } from 'react-native';

export const getItemsByUser = async(userId: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    const userItemsResponse = await fetch(`${URL}/item/${userId}/user`);
    const userItems = await userItemsResponse.json();

    if (userItemsResponse.status !== 200) {
        var error: any = new Error(userItems.message);
        error.statusCode = userItemsResponse.status;
        throw error;
    }

    return userItems;
}
