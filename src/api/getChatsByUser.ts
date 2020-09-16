import { Platform } from 'react-native';

export const getChatsByUser= async(userId: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    const chatsResponse = await fetch(`${URL}/chat/user?userId=${userId}`);
    const chats = await chatsResponse.json();

    if (chatsResponse.status !== 200) {
        var error: any = new Error(chats.message);
        error.statusCode = chats.status;
        throw error;
    }

    return chats;
}
